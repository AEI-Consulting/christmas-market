<template>
  <Layout>
    <h1 class="title">{{$page.data.market.name}}</h1>

    <div class="cards">
      <g-link v-for="exhibitor in orderedExhibitors" :key="exhibitor.code" class="card" :to="$tp(`/exhibitors/${exhibitor.code}`)">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="https://via.placeholder.com/150x50.png" />
          </figure>
        </div>
        <div class="card-content">
          <div class="content">
            {{exhibitor.name}}
          </div>
        </div>
      </g-link>
    </div>
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
export default {
  computed: {
    orderedExhibitors() {
      return this.$page.data.market.exhibitors.sort((a, b) => (a.name < b.name ? -1 : 1));
    }
  }
}
</script>

<style scoped>
.cards {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
  margin: 20px 0;
}

.card {
  width: 100%;
  border: 1px solid #ccc;
}

.card:hover {
  box-shadow: none;
  border: 1px solid #999;
}
</style>
