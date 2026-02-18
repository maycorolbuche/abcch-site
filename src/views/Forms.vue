<template>
  <div class="pb-5">
    <TitleBar title="Formulários SRG" />

    <div class="d-flex flex-column align-items-center pt-5" style="gap: 20px">
      <BButton
        class="btn-form"
        variant="primary"
        v-for="form in forms"
        :key="form.name"
        @click="openForm(form)"
      >
        <div class="ps-4">
          <TextBoxEditOutlineIcon color="#FFF" width="45px" />
        </div>
        <div class="px-2 fw-600 fs-5 text-uppercase">
          {{ form.name }}
        </div>
      </BButton>
    </div>
  </div>
</template>

<script>
import TitleBar from "@/components/TitleBar.vue";

import TextBoxEditOutlineIcon from "@/components/icons/TextBoxEditOutline.vue";

export default {
  components: {
    TitleBar,

    TextBoxEditOutlineIcon,
  },
  computed: {
    messages() {
      return [
        "POR FAVOR VERIFICAR SE ÉGUA DOADORA (MÃE) POSSUI COLETA DE CRINA NA ABCCH.",
        "POR FAVOR NÃO ESQUECER DE ENVIAR O CERTIFICADO DE REGISTRO ORIGINAL DO ANIMAL TRANSFERIDO.",
        "POR FAVOR NÃO ESQUECER DE ENVIAR O CERTIFICADO DE REGISTRO ORIGINAL DO ANIMAL MORTO.",
      ];
    },
    forms() {
      return [
        {
          name: "Comunicação de Transferência de Embrião",
          url: "TransferenciaEmbriao.htm",
          message: this.messages[0],
        },
        {
          name: "Comunicação de Cobrição",
          url: "ComunicacaoCobricoes.htm",
          message: this.messages[0],
        },
        {
          name: "Comunicação de Transferência de Propriedade",
          url: "ComunicacaoTransfProp.htm",
          message: this.messages[1],
        },
        {
          name: "Comunicação de Morte",
          url: "ComunicadoMorte.htm",
          message: this.messages[2],
        },
        {
          name: "Comunicação de Nascimento",
          url: "Comunicacaonascimento.html",
        },
        {
          name: "Transferência de Propriedade de Embrião Inovulado",
          url: "TransferenciaPropriedadeEmbriaoInovulado.htm",
        },
        {
          name: "Ficha de Inspeção Zootécnica",
          url: "ComunicadoInspecaoZootecnica.htm",
        },
        {
          name: "Solicitação de conversão de palheta para ICSI",
          url: "TransferenciaPalhetaParaICSI.htm",
        },
        {
          name: "Cessão de Direito de Registro de Produto",
          url: "CessaoDireitoRegistroProduto.htm",
        },
        {
          name: "Certificado de Coleta de Sêmen para Congelamento",
          url: "CertificadoColetaSemenParaCongelamento_001.pdf",
        },
      ];
    },
  },
  methods: {
    openForm(data) {
      if (data?.message) {
        this.$swal({
          title: "ATENÇÃO!",
          text: data.message,
          icon: "warning",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "btn btn-primary",
          },
          buttonsStyling: false,
        }).then((result) => {
          if (result.isConfirmed) {
            this.openLink(data);
          }
        });
      } else {
        this.openLink(data);
      }
    },
    openLink(data) {
      const url = `${import.meta.env.VITE_ADM_URL}/arq/formularios/${data.url}`;
      window.open(url, "_blank");
    },
  },
};
</script>

<style lang="scss">
.btn-form {
  width: 350px;
  height: 100px;
  font-size: 16px;
  margin-bottom: 10px;
  border-radius: 10px;
  border: 5px solid #dab658;
  box-shadow: 0 8px 10px 0px rgba(0, 0, 0, 0.3);
  background: radial-gradient(var(--bs-primary), #a28758);
  text-shadow: 1px 1px 7px black;

  display: flex;
  flex-direction: row;
  align-items: center;

  svg path {
    filter: drop-shadow(1px 1px 2px rgb(0 0 0 / 0.4));
  }

  &:hover {
    background: radial-gradient(#a28758, #a28758);
  }
}
</style>
