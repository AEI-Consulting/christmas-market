<template>
  <div>
    {{ $t('language._') }} <select v-model="currentLocale" @change="localeChanged">
      <option v-for="locale in availableLocales" :key="locale" :value="locale">{{ $t('language.' + locale) }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'LocaleSwitcher',
  data: function () {
    return {
      currentLocale: this.$i18n.locale.toString(),
      availableLocales: this.$i18n.availableLocales
    }
  },
  methods: {
    localeChanged () {
      this.$router.push({
        path: this.$tp(this.$route.path, this.currentLocale, true)
      })
    }
  }
}
</script>
