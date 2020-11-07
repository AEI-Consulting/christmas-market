<template>
  <MainPageLayout :title="$tc('exhibitor._', 2)" cardType="product-card" :data="data" :searchFields="['name']">
    <template v-slot:presentation>
      <p>Cette section du site reprend tous les produits disponibles dans tous les marchés de Noël du pays repris sur cette plateforme. Vous pouvez directement les ajouter à votre panier ou en lire le descriptif en cliquant sur la vignette du produit.</p>
    </template>
  </MainPageLayout>
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
export default {
  metaInfo: {
    title: 'Products'
  },
  computed: {
    data() {
      return this.$page.data.products.map(p => ({
        object: p
      }));
    }
  }
}
</script>
