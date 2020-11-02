<template>
  <Layout>
    <h1>{{$page.data.exhibitor.name}}</h1>

    <div v-for="product in $page.data.exhibitor.products" :key="product.id">
      <p><g-link class="nav__link" :to="$tp(`/exhibitors/${$page.data.exhibitor.code}/products/${product.id}`)">{{product.name}}</g-link></p>
    </div>
  </Layout>
</template>

<page-query>
query ($code: String!) {
  data {
    exhibitor(where: {code: $code}) {
      code
      name
      products {
        id
        name
      }
    }
  }
}
</page-query>
