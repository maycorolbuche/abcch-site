<template>
  <div class="p-5 position-relative" style="background: var(--bs-tertiary)">
    <div class="aux-bg" />
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
        class="text-tertiary text-uppercase fw-600 px-4"
        :to="{ name: 'page', params: { menu: 'associe' } }"
      >
        Clique Aqui
      </BButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.aux-bg {
  position: absolute;
  background: var(--bs-tertiary);
  left: -100vw;
  top: 0;
  width: calc(100vw * 2);
  height: 100%;
  z-index: -1;
}
</style>
