<template>
  <Layout>
    <h1>{{$t("markets")}}</h1>

    <div class="text">
      <p>Blablabla petit texte d'introduction</p>
    </div>

    <div class="search">
      <p>Formulaire de recherche</p>
      <p><input type="text" v-model="searchText" /></p>
    </div>

    <div v-for="market in filteredMarkets" :key="market.code">
      <p><g-link class="nav__link" :to="$tp(`/markets/${market.code}`)">
      {{market.name}}
      {{market.zip}}
      {{market.city}}
      </g-link></p>
    </div>
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
export default {
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
