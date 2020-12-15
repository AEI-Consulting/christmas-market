<template>
  <Layout>
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li><g-link to="/">Accueil</g-link></li>
        <li><g-link :to="$tp(`/exhibitors/${product.exhibitor.code}`)">{{ product.exhibitor.name }}</g-link></li>
        <li class="is-active"><a href="#">{{ product.name }}</a></li>
      </ul>
    </nav>

    <h2 class="title is-2">{{ product.name }}</h2>

    <div class="tile is-ancestor">
      <div class="tile is-parent is-8">
        <div class="tile is-child">
          <div class="content presentation" v-html="product.description"></div>

          <div class="infobox">
            <div>
              <b-icon icon="shopping" size="is-small" />&nbsp;
              <g-link :to="$tp(`/exhibitors/${product.exhibitor.code}`)">{{ product.exhibitor.name }}</g-link>
            </div>
            <div v-if="product.packaging">
              <b-icon icon="package-variant-closed" size="is-small" />&nbsp;
              {{ product.packaging }}
            </div>
            <div>
              <b-icon icon="cash" size="is-small" />&nbsp;
              {{ product.price | formatNumber }} €
            </div>
          </div>
        </div>
      </div>
      <div class="tile is-parent is-vertical">
        <div class="tile is-child productImg">
          <g-image v-if="product.image" :src="product.image.url" />
        </div>
        <div class="tile is-child videoBtn">
          <b-tooltip v-if="product.pictures && product.pictures.length" :label="$t('product.discover.pictures')" position="is-bottom">
            <b-button type="is-info" size="is-small" icon-left="image-multiple" @click="isPicturesModalActive = true">{{ $t('product.pictures') }}</b-button>
          </b-tooltip>
        </div>
      </div>
    </div>

    <b-modal v-if="product.pictures && product.pictures.length" v-model="isPicturesModalActive">
      <b-carousel :indicator-inside="false" class="picturesCarousel">
        <b-carousel-item v-for="(item, i) in product.pictures.length" :key="i" class="bigPicture">
          <span class="image">
            <img :src="product.pictures[i].url">
          </span>
        </b-carousel-item>
        <template slot="indicators" slot-scope="props">
          <span class="al image">
            <img class="thumbPicture" :src="product.pictures[props.i].url" :title="props.i">
          </span>
        </template>
      </b-carousel>
    </b-modal>

    <div class="actions">
      <b-button type="is-info" size="is-small" icon-left="cart-plus" @click="addToCart">{{ $t('cart.add') }}</b-button>
    </div>
  </Layout>
</template>

<page-query>
query ($id: ID!) {
  data {
    product(where: {id: $id}) {
      description
      exhibitor {
        code
        name
      }
      id
      image {
        url
      }
      name
      packaging
      pictures {
        url
      }
      price
    }
  }
}
</page-query>

<script>
export default {
  metaInfo(vm) {
    return {
      title: vm.$context.title
    }
  },
  computed: {
    product() {
      return this.$page.data.product;
    }
  },
  methods: {
    addToCart() {
      this.$store.commit("addToCart", {
        product: this.$page.data.product,
        quantity: 1
      });
    }
  },
  data() {
    return {
      isPicturesModalActive: false
    }
  }
}
</script>

<style scoped>
.presentation {
  margin-bottom: 30px;
  text-align: justify;
}

.infobox {
  border-left: 3px solid #999;
  padding-left: 10px;
}

.productImg {
  text-align: center;
}
.productImg img {
  max-height: 250px;
  object-fit: contain;
}

.picturesCarousel {
  background-color: #111;
}
.bigPicture {
  background-color: black;
  padding: 15px;
}
.bigPicture img {
  max-height: 500px;
  object-fit: contain;
}
.thumbPicture {
  max-height: 50px;
  object-fit: contain;
}

.videoBtn {
  text-align: right;
}
</style>
