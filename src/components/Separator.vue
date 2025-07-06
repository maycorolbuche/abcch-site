<template>
  <div id="__separator">
    <div />
    <div />
  </div>
</template>

<style scoped>
#__separator {
  height: 50px;
  background: var(--bs-primary);

  display: flex;
  align-items: stretch;
  flex-wrap: nowrap;
  flex-direction: row;
}
#__separator > div {
  width: 50%;
  background: var(--bs-secondary);
}
#__separator > div:first-child {
  border-radius: 0 50px 0 0;
}
#__separator > div:last-child {
  border-radius: 50px 0 0 0;
}
</style>
