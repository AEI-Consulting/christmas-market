<template>
  <MainPageLayout :title="$tc('exhibitor._', 2)" :data="data" :searchFields="['name']">
    <template v-slot:presentation>
      <p>Retrouvez ici tou(te)s les exposant(e)s qui animent habituellement les marchés de Noël durant cette période de fin d'année ! Cette page vous donne accès à tou(te)s les exposant(e)s que vous retrouviez sur les marchés de Noël et qui ont rejoint cette plateforme. Vous pouvez directement les retrouver à partir cette page, en cliquant sur la vignette de l'exposant(e) ou en effectuant une recherche.</p>
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
