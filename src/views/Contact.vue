<template>
  <div>
    <TitleBar title="Contato" />

    <div class="d-flex justify-content-center mx-5">
      <div class="form-container d-flex flex-column justify-content-center">
        <span class="text-uppercase fw-bold text-center py-3">
          Envie sua mensagem
        </span>

        <BForm @submit="onSubmit" @reset="onReset">
          <BFormGroup label="Nome" class="mt-2">
            <BFormInput
              v-model="form.nome"
              :disabled="sending"
              placeholder="Nome"
            />
          </BFormGroup>

          <BFormGroup label="E-mail" class="mt-2">
            <BFormInput
              v-model="form.email"
              :disabled="sending"
              type="email"
              placeholder="E-mail"
            />
          </BFormGroup>

          <BFormGroup label="Assunto" class="mt-2">
            <BFormInput
              v-model="form.assunto"
              :disabled="sending"
              placeholder="Assunto"
            />
          </BFormGroup>

          <BFormGroup label="Objetivo do Contato" class="mt-2">
            <BFormSelect
              v-model="form.objetivo"
              :disabled="sending"
              value-field="id"
              text-field="nome"
              :options="data?.contato_objetivo"
            />
          </BFormGroup>

          <BFormGroup
            v-if="this.form.objetivo != 1"
            label="Direcionamento do Assunto"
            class="mt-2"
          >
            <BFormSelect
              v-model="form.direcionamento"
              :disabled="sending"
              value-field="id"
              text-field="nome"
              :options="contato_direcionamento"
            />
          </BFormGroup>

          <!--
          <BFormGroup label="Destinatário" class="mt-2">
            <BFormSelect
              v-model="form.destinatario"
              :disabled="sending"
              value-field="id"
              text-field="nome"
              :options="data?.contato_email"
            />
          </BFormGroup>
          -->

          <BFormGroup label="Mensagem" class="mt-2">
            <BFormTextarea
              v-model="form.mensagem"
              :disabled="sending"
              placeholder="Mensagem"
              rows="6"
            />
          </BFormGroup>

          <BAlert
            :model-value="true"
            v-if="!success && form_data"
            variant="danger"
            class="m-0 mt-3"
          >
            {{ form_data }}
          </BAlert>
          <BAlert
            :model-value="true"
            v-else-if="success"
            variant="info"
            class="m-0 mt-3"
          >
            E-mail enviado com sucesso!
          </BAlert>

          <BButton
            :disabled="sending"
            type="submit"
            variant="primary"
            class="mt-3 w-100 text-uppercase fw-500"
          >
            <BSpinner v-if="sending" small class="me-2" />
            <span v-else> Enviar Mensagem </span>
          </BButton>
        </BForm>

        ..{{ sending }}.. ,,{{ form_data }},,
        <pre class="m-0">{{ form }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "@/services/Api.js";
import Storage from "@/helpers/Storage.js";

import Page from "@/components/Page.vue";

export default {
  components: {
    Page,
  },
  data: () => ({
    data: null,
    form: {
      nome: null,
      email: null,
      assunto: null,
      destinatario: null,
      mensagem: null,
      direcionamento: null,
      objetivo: null,
    },
    form_data: null,
    success: false,
    sending: false,

    abort_controller: null,
  }),
  computed: {
    contato_direcionamento() {
      if (!this.data || !this.data.contato_direcionamento) return [];

      return this.data.contato_direcionamento.filter((item) => item.id !== 1);
    },
  },
  watch: {
    form: {
      handler() {
        if (this.form.objetivo == 1) {
          this.form.direcionamento = 1;
          this.form.destinatario = 1;
        } else {
          if (this.form.direcionamento == 1) {
            this.form.direcionamento = null;
          }
          this.form.destinatario = 2;
        }
      },
      deep: true,
    },
  },
  methods: {
    async sendMessage() {
      let self = this;
      await Api.post(
        "/email",
        {
          //params
        },
        function (status, data) {
          /*if (status) {
            self.data = data;
          }*/
        }
      );
    },

    async loadData() {
      this.abort();

      this.abort_controller = new AbortController();
      const signal = this.abort_controller.signal;

      this.data = Storage.get("email_dados", []);

      let self = this;
      //Carregar as combos//////////////////////////////////////
      await Api.get(
        "/email/dados",
        {
          __signal: signal,
        },
        function (status, data) {
          if (status) {
            self.data = data;

            Storage.set("email_dados", data);
          }
        }
      );
    },
    abort() {
      if (this.abort_controller) {
        this.abort_controller.abort();
      }
    },

    onReset() {
      this.form.nome = null;
      this.form.email = null;
      this.form.assunto = null;
      this.form.destinatario = null;
      this.form.mensagem = null;
      this.form.direcionamento = null;
      this.form.objetivo = null;

      this.form_data = null;
    },

    async onSubmit(event) {
      event.preventDefault();

      this.sending = true;
      this.success = false;
      this.form_data = null;

      let self = this;
      await Api.post("/email", { ...this.form }, function (status, data) {
        self.sending = false;
        self.form_data = data;

        if (status) {
          self.onReset();
          self.success = true;
        }
      });
    },
  },
  mounted() {
    this.onReset();
    this.loadData();
  },
  beforeUnmount() {
    this.abort();
  },
};
</script>

<style lang="scss" scoped>
.form-container {
  width: 500px;
}
</style>
>
