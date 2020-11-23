<template>
  <MainPageLayout :title="$tc('product._', 2)" cardType="product-card" :data="data" :searchFields="['name']">
    <template v-slot:presentation>
      <p>Retrouvez ici tous les produits dont vous rêvez pour un cadeau de Noël ou un usage personnel, ou découvrez-en des nouveaux ! Cette page vous donne accès à tous les produits mis en vente par les exposant(e)s qui ont rejoint cette plateforme. Vous pouvez directement les retrouver à partir cette page, en cliquant sur la vignette du produit ou en effectuant une recherche.</p>
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
