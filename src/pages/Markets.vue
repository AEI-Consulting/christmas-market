<template>
  <Layout>
    <h2 class="title is-2">{{ $tc('market._', 2) }}</h2>

    <div class="text">
      <p>Blablabla petit texte d'introduction</p>
    </div>

    <div class="search">
      <p>Formulaire de recherche</p>
      <p><input type="text" v-model="searchText" /></p>
    </div>

    <card-list>
      <image-card v-for="market in filteredMarkets" :key="market.code" :text="market.name" :link="`/markets/${market.code}`" />
    </card-list>
  </Layout>
</template>

<page-query>
query {
  data {
    markets {
      code
      name
      zip
      city
    }
  }
}
</page-query>

<script>
import CardList from '~/components/CardList.vue'
import ImageCard from '~/components/ImageCard.vue'

export default {
  components: {
    CardList,
    ImageCard
  },
  metaInfo: {
    title: "Markets"
  },
  data: () => ({
    searchText: ""
  }),
  computed: {
    filteredMarkets() {
      return this.$page.data.markets.filter(m => m.city.startsWith(this.searchText) || m.zip.toString().startsWith(this.searchText));
    }
  }
}
</script>

<style scoped>
.search {
  text-align: center;
}
</style>
