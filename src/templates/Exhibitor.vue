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
      <div class="tile is-parent is-vertical">
        <div class="tile is-child">
          <g-image v-if="$page.data.exhibitor.image" :src="$page.data.exhibitor.image.url" />
        </div>
        <div class="tile is-child">
          <button @click="isVideoModalActive = true">Open video</button>
        </div>
      </div>
    </div>

    <b-modal v-model="isVideoModalActive">
      <div class="video">
        <div v-if="$page.data.exhibitor.assetVideo.__typename === 'data_Asset'">
          <video controls autoplay>
            <source :src="$page.data.exhibitor.assetVideo.url">
          </video>
        </div>
        <div v-else-if="$page.data.exhibitor.assetVideo.__typename === 'data_Video'" v-html="$page.data.exhibitor.assetVideo.html"></div>
      </div>
    </b-modal>

    <h3 class="title is-3">{{$t('products')}}</h3>

    <div v-if="!$page.data.exhibitor.products.length">
      <p>{{$t('no_products_yet')}}</p>
    </div>

    <card-list v-if="$page.data.exhibitor.products.length">
      <product-card v-for="product in $page.data.exhibitor.products" :key="product.id" :product="product" />
    </card-list>
  </Layout>
</template>

<page-query>
query ($code: String!) {
  data {
    exhibitor(where: {code: $code}) {
      assetVideo {
        __typename
        ...on data_Asset {
          url
        }
        ...on data_Video {
          html
        }
      }
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
  },
  data() {
    return {
        isVideoModalActive: false
    }
  }
}
</script>

<style>
.presentation {
  margin-bottom: 20px;
  text-align: justify;
}

.video {
  margin: auto;
  text-align: center;
}
</style>
