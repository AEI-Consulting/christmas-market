<template>
  <Layout>
    <h1>{{$t('markets')}}</h1>

    <div v-for="market in $page.data.markets" :key="market.code">
      <p><g-link class="nav__link" :to="$tp(`/markets/${market.code}`)">{{market.name}}</g-link></p>
    </div>
  </Layout>
</template>

<page-query>
query {
  data {
    markets {
      code
      name
    }
  }
}
</page-query>

<script>
export default {
  metaInfo: {
    title: 'Markets'
  }
}
</script>
