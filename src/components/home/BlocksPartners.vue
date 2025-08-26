<template>
  <div class="block-container">
    <div>Anuncie<br />Aqui</div>
    <div>Anuncie<br />Aqui</div>
  </div>
</template>

<style lang="scss" scoped>
.block-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 460px) {
    grid-template-columns: 1fr;
  }

  > div {
    position: relative;
    background: var(--bs-primary);
    height: 175px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;

    color: #fff;
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    line-height: 1;

    &:first-child {
      @media (max-width: 460px) {
        margin-top: 20px;
      }
    }
  }
}
</style>
>
