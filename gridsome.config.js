module.exports = {
  siteName: 'Christmas Market',
  siteUrl: 'https://www.christmas-market.be',
  pathPrefix: '/',
  plugins: [{
    use: '@gridsome/source-graphql',
    options: {
      url: 'https://api-eu-central-1.graphcms.com/v2/ckfmmu5vh21sb01wmbwn58p0a/master',
      fieldName: 'data',
      headers: {
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
      },
    },
  }, {
    use: 'gridsome-plugin-i18n',
    options: {
      locales: [
        'fr-be',
        'nl-be'
      ],
      pathAliases: {
        'fr-be': 'fr',
        'nl-be': 'nl'
      },
      fallbackLocale: 'fr-be',
      defaultLocale: 'fr-be',
      enablePathRewrite: true,
      rewriteDefaultLanguage: true,
      messages: {
        'fr-be': require('./src/locales/fr-be.json'),
        'nl-be': require('./src/locales/nl-be.json')
      }
    }
  }, {
    use: 'gridsome-plugin-gtag',
    options: {
      config: {
        id: 'G-YMGVGNWKGK'
      }
    }
  }]
};
