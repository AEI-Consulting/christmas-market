<template>
  <g-link class="card" :to="$tp(link)">
    <div class="card-top">
      <slot name="top"></slot>
    </div>
    <div class="card-image">
      <figure class="image is-4by3">
      <g-image :src="imagePath" />
      </figure>
    </div>
    <div class="card-content">
      <div class="content">
        <slot>
          {{text}}
        </slot>
        <slot name="end" />
      </div>
    </div>
  </g-link>
</template>

<script>
export default {
  name: 'ImageCard',
  props: {
    link: String,
    img: Object,
    text: String
  },
  computed: {
    imagePath() {
      return this.img ? this.img.url : require('~/assets/no-image.png');
    }
  }
}
</script>

<style scoped>
.card {
  width: 100%;
  border: 1px solid #ccc;
}

.card:hover {
  box-shadow: none;
  border: 1px solid #999;
}

.card-top {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 10;
}

.card-image img {
  object-fit: cover;
}
.card-content {
  display: flex;
  align-items: center;
  padding: 5px;
  height: 80px;
}
.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  width: 100%;
}
</style>
