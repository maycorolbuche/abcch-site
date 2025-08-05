<template>
  <div>
    <TitleBar title="Pesquisar no Site" />

    <div class="px-5">
      <BFormGroup label="Digite algo para pesquisar...">
        <FormSearch v-model="search" />
      </BFormGroup>

      <div v-if="search && loading" class="py-3">
        <BSpinner small class="me-2" />
        Pesquisando <b>"{{ search }}"</b>...
      </div>

      <div v-else-if="search" class="py-3">
        <div class="py-2">
          <h2 class="text-primary border-bottom">Notícias</h2>
          <ul v-if="data?.noticias && data.noticias.length > 0">
            <li v-for="noticia in data.noticias" :key="noticia.id">
              <router-link
                :to="{ name: 'read_news', params: { id: noticia.id } }"
              >
                {{ noticia.data_publicacao_br }} | {{ noticia.titulo }}
              </router-link>
            </li>
          </ul>
          <span v-else>Nenhuma notícia encontrada...</span>
        </div>

        <div class="py-2">
          <h2 class="text-primary border-bottom">Genealogia</h2>
          <ul v-if="data?.animais && data.animais.length > 0">
            <li v-for="animal in data.animais" :key="animal.CdToken">
              <router-link
                :to="{ name: 'animal', params: { id: animal.CdToken } }"
              >
                {{ animal.NmAnimalComplete }}
              </router-link>
            </li>
          </ul>
          <span v-else>Nenhum animal encontrado...</span>
        </div>

        <div class="py-2">
          <h2 class="text-primary border-bottom">Páginas do Site</h2>
          <ul v-if="data?.paginas && data.paginas.length > 0">
            <li v-for="pagina in data.paginas" :key="pagina.id">
              <router-link
                :to="{
                  name: 'page',
                  params: { menu: pagina.menu, submenu: pagina.submenu },
                }"
              >
                {{ pagina.site_titulo }}
              </router-link>
            </li>
          </ul>
          <span v-else>Nenhuma página encontrada...</span>
        </div>

        <div class="py-2">
          <h2 class="text-primary border-bottom">Eventos</h2>
          <ul v-if="data?.comunicados && data.comunicados.length > 0">
            <li v-for="comunicado in data.comunicados" :key="comunicado.id">
              <BLink :href="comunicado.url" target="_blank">
                {{ comunicado.descricao }}
              </BLink>
            </li>
          </ul>
          <span v-else>Nenhum evento encontrado...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "@/services/Api.js";
import Storage from "@/helpers/Storage.js";

import TitleBar from "@/components/TitleBar.vue";
import FormSearch from "@/components/FormSearch.vue";

export default {
  components: {
    TitleBar,
    FormSearch,
  },
  data: () => ({
    data: null,
    abort_controller: null,
    loading_count: 0,

    search: null,
  }),
  computed: {
    loading() {
      return this.loading_count > 0;
    },
  },
  watch: {
    search() {
      Storage.set("search", this.search);
      if (this.search) {
        this.loadData();
      } else {
        console.log("NULL SEARCH");
        this.data = null;
        this.abort();
      }
    },
  },
  methods: {
    async loadData() {
      this.abort();

      this.abort_controller = new AbortController();
      const signal = this.abort_controller.signal;

      this.loading_count++;
      let self = this;
      await Api.get(
        "/pesquisa/" + this.search,
        {
          __signal: signal,
        },
        function (status, data) {
          self.loading_count--;

          if (status) {
            self.data = data;
          }
        }
      );
    },
    abort() {
      if (this.abort_controller) {
        this.abort_controller.abort();
      }
    },
  },
  mounted() {
    this.search = Storage.get("search", "");
  },
  beforeUnmount() {
    this.abort();
  },
};
</script>
