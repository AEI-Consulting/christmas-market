<template>
  <Layout>
    <h1>{{$page.data.product.name}}</h1>
  </Layout>
</template>

<page-query>
query ($id: ID!) {
  data {
    product(where: {id: $id}) {
      name
    }
  }
}
</page-query>
