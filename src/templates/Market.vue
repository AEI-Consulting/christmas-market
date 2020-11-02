<template>
  <Layout>
    <h1>{{$page.data.market.name}}</h1>

    <div v-for="exhibitor in $page.data.market.exhibitors" :key="exhibitor.code">
      <p><g-link class="nav__link" :to="$tp(`/exhibitors/${exhibitor.code}`)">{{exhibitor.name}}</g-link></p>
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
