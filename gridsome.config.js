// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "Gridsome",
  siteUrl: "https://AEI-Consulting.github.io",
  pathPrefix: "/christmas-market",
  plugins: [
    {
      use: "@gridsome/source-graphql",
      options: {
        url: "https://api-eu-central-1.graphcms.com/v2/ckfmmu5vh21sb01wmbwn58p0a/master",
        fieldName: "data",
        headers: {
          Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
        },
      },
    },
  ],
};
