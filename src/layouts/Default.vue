<template>
  <div class="layout">
    <header class="header">
      <strong>
        <g-link to="/">{{ $static.metadata.siteName }}</g-link>
      </strong>
      <nav class="nav">
        <g-link class="nav__link" :to="$tp('/about/')">
          <b-icon icon="information" size="is-small"></b-icon>&nbsp;{{ $t('about') }}
        </g-link>
        <g-link class="nav__link" :to="$tp('/cart/')">
          <b-icon icon="cart" size="is-small"></b-icon>&nbsp;{{ $t('cart._' )}}&nbsp;<b-tag v-if="!$store.getters.isCartEmpty" type="is-danger">{{ $store.getters.cartSize }}</b-tag>
        </g-link>
      </nav>
    </header>
    <slot/>
    <footer class="footer">
      <locale-switcher/>
    </footer>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
import LocaleSwitcher from '../components/LocaleSwitcher.vue'

export default {
  components: {
    LocaleSwitcher
  }
}
</script>

<style>
body {
  font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  margin:0;
  padding:0;
  line-height: 1.5;
}

.layout {
  margin: 20px auto;
  padding-left: 20px;
  padding-right: 20px;
  background-color: white;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: 80px;
}

.footer {
  text-align: right;
  margin-top: 20px;
}

.nav__link {
  margin-left: 20px;
}

img {
  width: 100%;
}
</style>
