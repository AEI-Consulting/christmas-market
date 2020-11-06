<template>
  <Layout>
    <h2 class="title is-2">{{ $tc('market._', 2) }}</h2>

    <section class="intro">
      <p>Cette section du site reprend tous les marchés de Noël du pays où les exposants qui ont rejoint cette plateforme venaient habituellement à votre rencontre. Vous pouvez directement les visiter à partir cette page en cliquant sur la vignette du marché.</p>
    </section>

    <div class="search">
      <div>
        <b-input :placeholder="$t('search.ph')" type="search.ph" icon="magnify" v-model="searchText"></b-input>
      </div>
    </div>

    <card-list>
      <image-card v-for="market in filteredMarkets" :key="market.code" :link="`/markets/${market.code}`">
        <div>
          {{market.name}}<br>
          <small>{{market.zip}} {{market.city}}</small>
        </div>
      </image-card>
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
    title: 'Markets'
  },
  data: () => ({
    searchText: ''
  }),
  computed: {
    filteredMarkets() {
      return this.$page.data.markets.filter(m => m.name.startsWith(this.searchText) || m.city.startsWith(this.searchText) || m.zip.toString().startsWith(this.searchText));
    }
  }
}
</script>

<style scoped>
.intro p {
  text-align: justify;
  margin-bottom: 20px;
}

.search {
  text-align: right;
}
.search div {
  display: inline-block;
  width: 250px;
}
</style>
