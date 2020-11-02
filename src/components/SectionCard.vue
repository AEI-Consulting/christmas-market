<template>
  <g-link class="card nav__link" :to="$tp(link)">
    <div>{{name}}</div>
    <g-image :src="require(`@/assets/${img}`)" />
  </g-link>
</template>

<script>
export default {
  name: "SectionCard",
  props: {
    img: String,
    name: String,
    link: String
  }
}
</script>

<style scoped>
.card {
  border: 1px solid #aaa;
  width: 248px;
  height: 160px;
  margin: 0;
  text-decoration: none;
  text-align: center;
  font-size: 1.5rem;
  color: black;
}

.card:hover {
  box-shadow: 1px 1px 2px 1px #ccc;
}

.card img {
  height: 80px;
  margin: 15px 0;
}
</style>
