<template>
  <div class="block-container">
    <div>....</div>
    <div>....</div>
    <div>....</div>
    <div>....</div>
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
    background: #ccc;
    height: 175px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
>
