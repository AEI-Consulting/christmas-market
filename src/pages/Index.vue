<template>
  <Layout>
    <h2 class="title is-2">Christmas Market</h2>

    <div class="welcome">
      <p>Bienvenue sur le plus grand répertoire de marchés de Noël de Belgique !</p>
      <p>Sur cette plateforme, vous retrouverez virtuellement vos marchés de Noël, vos exposants et vos produits préférés ! Vous pourrez facilement entrer en contact avec les exposant(e)s pour commander et obtenir vos produits favoris et ainsi soutenir les artisans et associations qui peuplent habituellement nos marchés en cette période.</p>
    </div>

    <div class="dates">
      Du 1er décembre 2020 au 31 janvier 2021, découvrez les
    </div>

    <div class="homecards">
      <section-card :name="$tc('market._', 2)" link="/markets/" img="christmas-tree.svg" />
      <section-card :name="$tc('exhibitor._', 2)" link="/exhibitors/" img="market.svg" />
      <section-card :name="$tc('product._', 2)" link="/products/" img="spices.svg" />
    </div>

    <div class="columns">
      <div class="column welcome content">
        <p>Visiteur, comment ça marche ?</p>
        <ol>
          <li>Parcourez les marchés et les exposant(e)s et ajoutez des produits dans votre panier.</li>
          <li>Sélectionnez le mode de paiement et de livraison pour votre ou vos commande(s).</li>
          <li>Passez la ou les commande(s) et attendez d'être contacté(e) par le ou les exposant(e)(s).</li>
        </ol>
      </div>
      <div class="column welcome content">
        <p>Commerçant(e) ou association, comment ça marche ?</p>
        <ol>
          <li>Remplissez le formulaire de contact pour nous envoyer votre intérêt et informations de base.</li>
          <li>Envoyez-nous les produits à mettre en avant et vos modalités de paiement et de livraison.</li>
          <li>Répondez aux demandes des client(e)s et organisez le paiement et la récupération des produits.</li>
        </ol>
      </div>
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

.dates {
  text-align: center;
  font-size: 1.5rem;
  margin-top: 50px;
}

.homecards {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 70px 0;
}
</style>
