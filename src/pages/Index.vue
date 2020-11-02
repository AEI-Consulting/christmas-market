<template>
  <Layout>
    <div class="welcome">
      <p>Bienvenue sur le plus grand répertoire de marchés de Noël de Belgique !</p>
      <p>Sur ce site, vous pouvez retrouver vos marchés de Noël, vos exposants et vos produits préférés pour les commander et les obtenir à temps pour le Noël de cette année 2020 un peu particulière.</p>
    </div>
    <div class="homecards">
      <section-card :name="$t('markets')" link="/markets/" img="/img/christmas-tree.svg" />
      <section-card :name="$t('exhibitors')" link="/exhibitors/" img="/img/market.svg" />
      <section-card :name="$t('products')" link="/products/" img="/img/spices.svg" />
    </div>
  </Layout>
</template>

<script>
import SectionCard from '../components/SectionCard.vue'

export default {
  metaInfo: {
    title: 'Homepage'
  },
  components: {
    SectionCard
  }
}
</script>

<style>
.welcome p:first-child {
  font-size: 1.4rem;
}

.homecards {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 5px;
  margin: 20px 0;
}
</style>
