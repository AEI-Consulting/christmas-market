<template>
  <Layout>
    <h2 class="title is-2">{{ $t('cart') }}</h2>

    <div v-if="$store.getters.isCartEmpty">
      <p>Your cart is currently empty.</p>
    </div>

    <div v-else>
      <table class="table">
        <tr>
          <th>Exhibitor</th>
          <th>Product</th>
          <th>Unit price</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
        <tr v-for="item in $store.state.cart" :key="item.product.id">
          <td>{{item.product.exhibitor.name}}</td>
          <td>{{item.product.name}}</td>
          <td>{{item.product.price | formatNumber}} €</td>
          <td>{{item.quantity}}</td>
          <td>{{item.quantity * item.product.price | formatNumber}} €</td>
        </tr>
        <tr>
          <th colspan="4">Total</th>
          <td>{{this.$store.getters.totalPrice | formatNumber}} €</td>
        </tr>
      </table>

      <button @click="emptyCart">Empty cart</button>
      <button @click="placeOrder">Order</button>
    </div>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: "Cart",
  },
  methods: {
    emptyCart() {
      this.$store.commit('emptyCart');
    },
    async placeOrder() {
      await this.$recaptchaLoaded();

      const token = await this.$recaptcha('Order');
      console.log(token)
    }
  },
};
</script>
