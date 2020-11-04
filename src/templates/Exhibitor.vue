<template>
  <Layout>
    <h2 class="title is-2">{{$page.data.exhibitor.name}}</h2>

    <div class="tile is-ancestor">
      <div class="tile is-parent is-8">
        <div class="tile is-child">
          <div class="presentation">
            {{$page.data.exhibitor.presentation}}
          </div>
          <div v-if="$page.data.exhibitor.website">
            <b-icon icon="web" size="is-small" />&nbsp;
            <g-link :to="$page.data.exhibitor.website">{{$page.data.exhibitor.website}}</g-link>
          </div>
          <div v-if="$page.data.exhibitor.facebook">
            <b-icon icon="facebook" size="is-small" />&nbsp;
            <g-link :to="`https://www.facebook.com/${$page.data.exhibitor.facebook}`">{{$page.data.exhibitor.facebook}}</g-link>
          </div>
        </div>
      </div>
      <div class="tile is-parent">
        <div class="tile is-child">
          <g-image v-if="$page.data.exhibitor.image" :src="$page.data.exhibitor.image.url" />
        </div>
      </div>
    </div>

    <h3 class="title is-3">{{$t('products')}}</h3>

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
      facebook
      image {
        url
      }
      name
      presentation
      products {
        exhibitor {
          code
          name
        }
        id
        image {
          url
        }
        name
        price
      }
      website
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

<style>
.presentation {
  margin-bottom: 20px;
}
</style>
