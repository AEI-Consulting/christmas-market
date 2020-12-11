<template>
  <Layout>
    <h2 class="title is-2">{{market.name}}</h2>

    <card-list>
      <image-card v-for="exhibitor in orderedExhibitors" :key="exhibitor.code" :text="exhibitor.name" :link="`/exhibitors/${exhibitor.code}`" :img="exhibitor.image" />
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
        image {
          url
        }
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
  metaInfo(vm) {
    return {
      title: vm.$context.title
    }
  },
  components: {
    CardList,
    ImageCard
  },
  computed: {
    market() {
      return this.$page.data.market;
    },
    orderedExhibitors() {
      return this.market.exhibitors.sort((a, b) => (a.name < b.name ? -1 : 1));
    }
  }
}
</script>
