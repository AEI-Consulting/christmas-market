<template>
  <Layout>
    <h2 class="title is-2">{{ $t("cart") }}</h2>

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
          <td>{{ item.product.exhibitor.name }}</td>
          <td>{{ item.product.name }}</td>
          <td>{{ item.product.price }} €</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.quantity * item.product.price }} €</td>
        </tr>
      </table>

      <button @click="emptyCart()">Empty cart</button>
      <button @click="recaptcha">Order</button>
    </div>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: "Cart",
  },
  methods: {
    async recaptcha() {
      // (optional) Wait until recaptcha has been loaded.
      await this.$recaptchaLoaded();

      // Execute reCAPTCHA with action "login".
      const token = await this.$recaptcha("Order");

      console.log(token)
      // Do stuff with the received token.
    },
    emptyCart() {
      this.$store.commit("emptyCart");
    },
  },
};
</script>
