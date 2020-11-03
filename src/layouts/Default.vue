<template>
  <div class="layout">
    <header class="header">
      <strong>
        <g-link to="/">{{ $static.metadata.siteName }}</g-link>
      </strong>
      <nav class="nav">
        <g-link class="nav__link" :to="$tp('/about/')">{{$t("about")}}</g-link>
        <g-link class="nav__link" :to="$tp('/cart/')">{{$t("cart")}}</g-link>
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
import LocaleSwitcher from "../components/LocaleSwitcher.vue"

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
  max-width: 760px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: 80px;
}

.footer {
  float: right;
}

.nav__link {
  margin-left: 20px;
}

img {
  width: 100%;
}
</style>
