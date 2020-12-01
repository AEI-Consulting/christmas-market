<template>
  <Layout>
    <h2 class="title is-2">Christmas Market</h2>

    <div class="welcome">
      <p>Bienvenue sur le plus grand répertoire de marchés de Noël de Belgique !</p>
      <p>Sur cette plateforme, vous retrouverez virtuellement vos marchés de Noël, vos exposants et vos produits préférés ! Vous pourrez facilement entrer en contact avec les exposant(e)s pour commander et obtenir vos produits favoris et ainsi soutenir les artisans et associations qui peuplent habituellement nos marchés en cette période.</p>
    </div>

    <div class="homecards">
      <section-card :name="$tc('market._', 2)" link="/markets/" img="christmas-tree.svg" />
      <section-card :name="$tc('exhibitor._', 2)" link="/exhibitors/" img="market.svg" />
      <section-card :name="$tc('product._', 2)" link="/products/" img="spices.svg" />
    </div>

    <div class="welcome content">
      <p>Comment ça marche ?</p>
      <ol>
        <li>Parcourez les marchés et les exposant(e)s et ajoutez des produits dans votre panier.</li>
        <li>Sélectionnez le mode de paiement et de livraison pour votre ou vos commande(s).</li>
        <li>Passez la ou les commande(s) et attendez d'être contacté par le ou les exposant(e)(s).</li>
      </ol>
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
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 40px 0;
}
</style>
