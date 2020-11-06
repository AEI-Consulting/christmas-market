<template>
  <Layout>
    <h2 class="title is-2">{{ $tc('exhibitor._', 2) }}</h2>

    <card-list>
      <image-card v-for="exhibitor in $page.data.exhibitors" :key="exhibitor.code" :text="exhibitor.name" :link="`/exhibitors/${exhibitor.code}`" :img="exhibitor.image" />
    </card-list>
  </Layout>
</template>

<page-query>
query {
  data {
    exhibitors {
      code
      image {
        url
      }
      name
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
    title: 'Exhibitors'
  }
}
</script>
