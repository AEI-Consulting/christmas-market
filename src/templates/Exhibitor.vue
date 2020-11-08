<template>
  <Layout>
    <h2 class="title is-2">{{ exhibitor.name }}</h2>

    <div class="tile is-ancestor">
      <div class="tile is-parent is-8">
        <div class="tile is-child">
          <div class="presentation" v-html="exhibitor.presentation"></div>

          <div class="infobox">
            <div v-if="exhibitor.payment && exhibitor.payment.length">
              <b-tooltip :label="$t('payment.means')" position="is-left"><b-icon icon="credit-card-outline" size="is-small" /></b-tooltip>&nbsp;
              <span v-for="(mean, i) in exhibitor.payment" :key="mean">{{ $t('payment.' + mean) }}<span v-if="i < exhibitor.payment.length - 1">, </span></span>
            </div>
            <div v-if="exhibitor.delivery && exhibitor.delivery.length">
              <b-tooltip :label="$t('delivery.means')" position="is-left"><b-icon icon="truck-delivery" size="is-small" /></b-tooltip>&nbsp;
              <span v-for="(mean, i) in exhibitor.delivery" :key="mean">{{ $t('delivery.' + mean) }}<span v-if="i < exhibitor.delivery.length - 1">, </span></span>
            </div>
            <div v-if="exhibitor.website">
              <b-tooltip :label="$t('exhibitor.website')" position="is-left"><b-icon icon="web" size="is-small" /></b-tooltip>&nbsp;
              <g-link :to="exhibitor.website">{{exhibitor.website}}</g-link>
            </div>
            <div v-if="exhibitor.facebook">
              <b-tooltip :label="$t('exhibitor.facebook')" position="is-left"><b-icon icon="facebook" size="is-small" /></b-tooltip>&nbsp;
              <g-link :to="`https://www.facebook.com/${exhibitor.facebook}`">{{exhibitor.facebook}}</g-link>
            </div>
          </div>
        </div>
      </div>
      <div class="tile is-parent is-vertical">
        <div class="tile is-child">
          <g-image v-if="exhibitor.image" :src="exhibitor.image.url" />
        </div>
        <div class="tile is-child videoBtn" v-if="exhibitor.assetVideo">
          <b-tooltip :label="$t('exhibitor.discover')" position="is-bottom" multilined>
            <b-button type="is-info" size="is-small" icon-left="movie" @click="isVideoModalActive = true">{{ $t('exhibitor.video') }}</b-button>
          </b-tooltip>
        </div>
      </div>
    </div>

    <b-modal v-if="exhibitor.assetVideo" v-model="isVideoModalActive">
      <div class="video">
        <div v-if="exhibitor.assetVideo.__typename === 'data_Asset'">
          <video controls autoplay>
            <source :src="exhibitor.assetVideo.url">
          </video>
        </div>
        <div v-else-if="exhibitor.assetVideo.__typename === 'data_Video'" v-html="exhibitor.assetVideo.html"></div>
      </div>
    </b-modal>

    <h3 class="title is-3">{{ $tc('product._', nbProducts) }}</h3>

    <card-list v-if="exhibitor.products.length">
      <product-card v-for="product in exhibitor.products" :key="product.id" :product="product" />
    </card-list>
    <div v-else>
      <p>{{ $t('product.no') }}</p>
    </div>
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
      delivery
      facebook
      image {
        url
      }
      name
      payment
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
  computed: {
    exhibitor() {
      return this.$page.data.exhibitor;
    },
    nbProducts() {
      return this.exhibitor.products ? this.exhibitor.products.length : 0;
    }
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

.infobox {
  border-left: 3px solid #999;
  padding-left: 10px;
}

.videoBtn {
  text-align: right;
}
.video {
  margin: auto;
  text-align: center;
}
</style>
