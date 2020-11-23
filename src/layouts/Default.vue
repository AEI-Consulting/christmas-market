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
    <section class="body">
      <slot/>
    </section>
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
  margin: 0;
  padding: 0;
  line-height: 1.5;
}

.layout {
  margin: 0px;
  background-color: white;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: 50px;
  padding: 0 25px;
  background-color: #272727;
}

.header a {
  color: #82a6e6;
}

.body {
  min-height: 65vh;
  margin: 0 150px;
}

.footer {
  text-align: right;
  margin-top: 40px;
  background-color: #272727;
  color: white;
}

.nav__link {
  margin-left: 20px;
}

img {
  width: 100%;
}
</style>
