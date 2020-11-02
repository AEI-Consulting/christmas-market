module.exports = {
  siteName: "Christmas Market",
  siteUrl: "https://AEI-Consulting.github.io",
  pathPrefix: "/christmas-market",
  plugins: [{
    use: "@gridsome/source-graphql",
    options: {
      url: "https://api-eu-central-1.graphcms.com/v2/ckfmmu5vh21sb01wmbwn58p0a/master",
      fieldName: "data",
      headers: {
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
      },
    },
  }]
};
