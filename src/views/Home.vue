<template>
  <div class="row">
    <div class="col-12 col-md-6">#BANNERS</div>
    <div class="col-12 col-md-6">
      <LatestNews />
    </div>
  </div>

  <div>#BANNER</div>

  <div class="bg-primary p-5">
    <div class="text-uppercase text-center text-white fs-1 fw-500">
      Seja um Associado
    </div>
    <div class="text-center text-white fs-16px">
      Ao se tornar um associado da ABCCH, você faz parte da história e do futuro
      do cavalo Brasileiro de Hipismo, contribuindo diretamente para o
      fortalecimento e desenvolvimento da nossa raça. Além disso, você terá
      acesso a benefícios exclusivos, como participação em eventos oficiais,
      suporte técnico especializado, divulgação de seus animais e acesso às
      melhores oportunidades do mercado. Junte-se a nós e faça parte de uma
      comunidade apaixonada por excelência e tradição!
    </div>
    <div class="text-center pt-4">
      <BButton
        pill
        variant="white"
        class="text-primary text-uppercase fw-600 px-4"
        :to="{ name: 'associate' }"
      >
        Clique Aqui
      </BButton>
    </div>
  </div>
  <Separator secondary-color="#F0E9DF" />

  <div style="background-color: #f0e9df">#CONSULTA</div>
</template>

<script>
import Separator from "@/components/Separator.vue";

import LatestNews from "@/components/LatestNews.vue";

export default {
  components: {
    Separator,
    LatestNews,
  },
};
</script>
