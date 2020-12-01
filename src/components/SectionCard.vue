<template>
  <div class="homecard">
    <g-image :src="require(`@/assets/${img}`)" />
    <b-button tag="router-link" type="is-link is-light" :to="link">{{name}}</b-button>
  </div>
</template>

<script>
export default {
  name: 'SectionCard',
  props: {
    img: String,
    name: String,
    link: String
  }
}
</script>

<style scoped>
.homecard {
  margin: auto;
  text-align: center;
  font-size: 1.5rem;
}

.homecard img {
  height: 120px;
  margin: 15px 0;
}
</style>
