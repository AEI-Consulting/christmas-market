// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
  api.loadSource(({ addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
  })

  api.createPages(async ({ graphql, createPage }) => {
    const { data } = await graphql(`{
      data {
        markets {
          code
          name
        }
        exhibitors {
          code
          name
          products {
            id
            name
          }
        }
      }
    }`)

    data.data.markets.forEach(({ code, name, locale }) => {
      createPage({
        path: `/markets/${code}`,
        component: './src/templates/Market.vue',
        context: {
          code,
          locale,
          title: name
        },
        route: {
          meta: {
            locale
          }
        }
      })
    })

    data.data.exhibitors.forEach(({ code, name, products, locale }) => {
      createPage({
        path: `/exhibitors/${code}`,
        component: './src/templates/Exhibitor.vue',
        context: {
          code,
          locale,
          title: name
        },
        route: {
          meta: {
            locale
          }
        }
      })

      products.forEach(({ id, locale, name: productName }) => {
        createPage({
          path: `/exhibitors/${code}/products/${id}`,
          component: './src/templates/Product.vue',
          context: {
            id,
            locale,
            title: productName + ' par ' + name
          },
          route: {
            meta: {
              locale
            }
          }
        })
      })
    })
  })
}
