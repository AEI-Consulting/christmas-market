<template>
  <MainPageLayout :title="$tc('market._', 2)" :data="data" :searchFields="['name', 'zip', 'city']">
    <template v-slot:presentation>
      <p>Retrouvez ici tous vos marchés de Noël préférés ou découvez-en simplement de nouveaux ! À partir d'ici vous aurez accès aux exposants qui ont rejoint cette plateforme et venaient habituellement à votre rencontre dans les marchés de Noël. Vous pouvez directement les visiter à partir cette page, en cliquant sur la vignette du marché ou en effectuant une recherche.</p>
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
