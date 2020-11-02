<template>
  <Layout>
    <p><g-link class="nav__link" :to="$tp('/markets/')">Markets</g-link></p>
    <p><g-link class="nav__link" :to="$tp('/exhibitors/')">Exhibitors</g-link></p>
    <p><g-link class="nav__link" :to="$tp('/products/')">Products</g-link></p>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'Homepage'
  }
}
</script>
