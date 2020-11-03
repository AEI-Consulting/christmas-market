<template>
  <Layout>
    <h2 class="title is-2">{{$page.data.product.name}}</h2>

    <button @click="addToCart">Add to cart</button>
  </Layout>
</template>

<page-query>
query ($id: ID!) {
  data {
    product(where: {id: $id}) {
      id
      name
    }
  }
}
</page-query>

<script>
export default {
  methods: {
    addToCart() {
      this.$store.commit("addToCart", {
        product: this.$page.data.product,
        quantity: 1
      });
    }
  }
}
</script>
