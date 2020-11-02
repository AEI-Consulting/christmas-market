<template>
  <Layout>
    <h1>Exhibitors</h1>

    <div v-for="exhibitor in $page.data.exhibitors" :key="exhibitor.code">
      <p><g-link class="nav__link" :to="$tp(`/exhibitors/${exhibitor.code}`)">{{exhibitor.name}}</g-link></p>
    </div>
  </Layout>
</template>

<page-query>
query {
  data {
    exhibitors {
      code
      name
    }
  }
}
</page-query>

<script>
export default {
  metaInfo: {
    title: 'Exhibitors'
  }
}
</script>
