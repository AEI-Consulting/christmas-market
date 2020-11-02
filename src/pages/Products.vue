<template>
  <Layout>
    <h1>Products</h1>

    <div v-for="product in $page.data.products" :key="product.id">
      <p><g-link class="nav__link" :to="`/exhibitors/${product.exhibitor.code}/products/${product.id}`">{{product.name}}</g-link></p>
    </div>
  </Layout>
</template>

<page-query>
query {
  data {
    products {
      id
      name
      exhibitor {
        code
      }
    }
  }
}
</page-query>

<script>
export default {
  metaInfo: {
    title: 'Products'
  }
}
</script>
