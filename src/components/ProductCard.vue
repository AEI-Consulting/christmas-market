<template>
  <image-card :text="product.name" :link="`/exhibitors/${product.exhibitor.code}/products/${product.id}`" :img="product.image">
    <template v-slot:end>
      <button @click.prevent="addToCart(product)"><b-icon icon="cart-plus" size="is-small"></b-icon></button>
    </template>
  </image-card>
</template>

<script>
import ImageCard from '~/components/ImageCard.vue'

export default {
  name: 'ProductCard',
  components: {
    ImageCard
  },
  props: {
    product: Object
  },
  methods: {
    addToCart(product) {
      this.$store.commit("addToCart", {
        product,
        quantity: 1
      });
    }
  }
}
</script>

<style scoped>
.card >>> .card-image img {
  object-fit: contain;
}
</style>
