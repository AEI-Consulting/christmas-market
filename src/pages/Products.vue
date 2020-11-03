<template>
  <Layout>
    <h2 class="title is-2">{{$t('products')}}</h2>

    <card-list>
      <product-card v-for="product in $page.data.products" :key="product.id" :product="product" />
    </card-list>
  </Layout>
</template>

<page-query>
query {
  data {
    products {
      id
      image {
        url
      }
      name
      price
      exhibitor {
        code
        name
      }
    }
  }
}
</page-query>

<script>
import CardList from '~/components/CardList.vue'
import ProductCard from '~/components/ProductCard.vue'

export default {
  components: {
    CardList,
    ProductCard
  },
  metaInfo: {
    title: 'Products'
  }
}
</script>
