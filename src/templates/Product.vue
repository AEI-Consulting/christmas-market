<template>
  <Layout>
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
      <div class="tile is-parent">
        <div class="tile is-child productImg">
          <g-image v-if="product.image" :src="product.image.url" />
        </div>
      </div>
    </div>

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
      price
    }
  }
}
</page-query>

<script>
export default {
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
  max-width: 100px;
  object-fit: contain;
}
</style>
