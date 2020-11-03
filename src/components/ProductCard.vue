<template>
  <image-card :text="product.name" :link="`/exhibitors/${product.exhibitor.code}/products/${product.id}`" :img="product.image">
    {{product.name}}<br>{{product.price}} €
    <template v-if="bought > 0" v-slot:top>
      <b-tag type="is-danger">{{bought}}&nbsp;<b-icon icon="cart" size="is-small"></b-icon></b-tag>
    </template>
    <template v-slot:end>
      <b-button type="is-info" size="is-small" icon-left="cart-plus" @click.prevent="addToCart(product)"></b-button>
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
  computed: {
    bought() {
      const item = this.$store.state.cart.find(p => p.product.id === this.product.id);
      return item ? item.quantity : 0;
    }
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
