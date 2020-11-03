<template>
  <Layout>
    <h1>{{$t('cart')}}</h1>

    <p>This is your cart:</p>
    <table>
      <tr>
        <th>Product</th>
        <th>Quantity</th>
      </tr>
      <tr v-for="item in $store.state.cart" :key="item.product.id">
        <td>{{item.product.name}}</td>
        <td>{{item.quantity}}</td>
      </tr>
    </table>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'Cart'
  }
}
</script>
