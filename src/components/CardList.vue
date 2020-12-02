<template functional>
  <div class="cards">
    <slot />
  </div>
</template>

<style scoped>
.cards {
  display: grid;
  margin: 20px 0;
}

@media (min-width:800px) {
  .cards {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;
  }
}

@media (min-width:400px) and (max-width: 800px) {
  .cards {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
  }
}
</style>
