<template>
  <Layout>
    <h2 class="title is-2">{{ $tc('product._', 2 )}}</h2>

    <section class="intro">
      <p>Cette section du site reprend tous les produits disponibles dans tous les marchés de Noël du pays repris sur cette plateforme. Vous pouvez directement les ajouter à votre panier ou en lire le descriptif en cliquant sur la vignette du produit.</p>
    </section>

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
