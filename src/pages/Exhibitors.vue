<template>
  <MainPageLayout :title="$tc('exhibitor._', 2)" :data="data" :searchFields="['name']">
    <template v-slot:presentation>
      <p>Cette section du site ...</p>
    </template>

    <template v-slot:items="{object}">
      {{object.name}}
    </template>
  </MainPageLayout>
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
export default {
  metaInfo: {
    title: 'Exhibitors'
  },
  computed: {
    data() {
      return this.$page.data.exhibitors.map(e => ({
        key: e.code,
        link: `/exhibitors/${e.code}`,
        img: e.image,
        object: e
      }));
    }
  }
}
</script>
