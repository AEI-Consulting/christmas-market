<template>
  <MainPageLayout :title="$tc('market._', 2)" :data="data" :searchFields="['name', 'zip', 'city']">
    <template v-slot:presentation>
      <p>Cette section du site reprend tous les marchés de Noël du pays où les exposants qui ont rejoint cette plateforme venaient habituellement à votre rencontre. Vous pouvez directement les visiter à partir cette page en cliquant sur la vignette du marché.</p>
    </template>

    <template v-slot:items="{object}">
      {{object.name}}<br>
      <small>{{object.zip}} {{object.city}}</small>
    </template>
  </MainPageLayout>
</template>

<page-query>
query {
  data {
    markets {
      city
      code
      image {
        url
      }
      name
      zip
    }
  }
}
</page-query>

<script>
export default {
  metaInfo: {
    title: 'Markets'
  },
  computed: {
    data() {
      return this.$page.data.markets.map(m => ({
        key: m.code,
        link: `/markets/${m.code}`,
        img: m.image,
        object: m
      }));
    }
  }
}
</script>
