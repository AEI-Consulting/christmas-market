<template>
  <Layout>
    <h2 class="title is-2">{{$page.data.exhibitor.name}}</h2>

    <div class="presentation">
      <g-image v-if="$page.data.exhibitor.image" :src="$page.data.exhibitor.image.url" />
      <p>{{$page.data.exhibitor.presentation}}</p>
    </div>

    <h3 class="title is-3 products">Products</h3>

    <card-list>
      <product-card v-for="product in $page.data.exhibitor.products" :key="product.id" :product="product" />
    </card-list>
  </Layout>
</template>

<page-query>
query ($code: String!) {
  data {
    exhibitor(where: {code: $code}) {
      code
      image {
        url
      }
      name
      presentation
      products {
        exhibitor {
          code
        }
        id
        image {
          url
        }
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
  }
}
</script>

<style scoped>
.presentation img {
  float: right;
  width: 200px;
}

.products {
  clear: both;
}
</style>
