<template>
  <Layout>
    <h2 class="title is-2">{{$page.data.market.name}}</h2>

    <card-list>
      <image-card v-for="exhibitor in orderedExhibitors" :key="exhibitor.code" :text="exhibitor.name" :link="`/exhibitors/${exhibitor.code}`" />
    </card-list>
  </Layout>
</template>

<page-query>
query ($code: String!) {
  data {
    market(where: {code: $code}) {
      name
      exhibitors {
        code
        name
      }
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
  computed: {
    orderedExhibitors() {
      return this.$page.data.market.exhibitors.sort((a, b) => (a.name < b.name ? -1 : 1));
    }
  }
}
</script>
