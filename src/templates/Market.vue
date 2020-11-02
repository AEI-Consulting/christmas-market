<template>
  <Layout>
    <h1>{{$page.data.market.name}}</h1>

    <div v-for="exhibitor in $page.data.market.exhibitors" :key="exhibitor.id">
      <p><g-link class="nav__link" :to="`/exhibitors/${exhibitor.id}`">{{exhibitor.name}}</g-link></p>
    </div>
  </Layout>
</template>

<page-query>
query ($code: String!) {
  data {
    market(where: {code: $code}) {
      name
      exhibitors {
        id
        name
      }
    }
  }
}
</page-query>
