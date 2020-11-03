<template>
  <Layout>
    <h1 class="title">{{$t('cart')}}</h1>

    <div v-if="$store.getters.isCartEmpty">
      <p>Your cart is currently empty.</p>
    </div>

    <div v-else>
      <table class="table">
        <tr>
          <th>Product</th>
          <th>Quantity</th>
        </tr>
        <tr v-for="item in $store.state.cart" :key="item.product.id">
          <td>{{item.product.name}}</td>
          <td>{{item.quantity}}</td>
        </tr>
      </table>
    </div>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'Cart'
  }
}
</script>
