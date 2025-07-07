<template>
  <div class="root-element">
    <div />
    <div />
  </div>
</template>

<style scoped lang="scss">
.root-element {
  height: 50px;
  background: var(--bs-primary);

  display: flex;
  align-items: stretch;
  flex-wrap: nowrap;
  flex-direction: row;

  > div {
    width: 50%;
    background: var(--bs-secondary);

    &:first-child {
      border-radius: 0 50px 0 0;
    }
    &:last-child {
      border-radius: 50px 0 0 0;
    }
  }
}
</style>
