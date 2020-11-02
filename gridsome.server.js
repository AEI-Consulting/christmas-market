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
        }
        exhibitors {
          code
          products {
            id
          }
        }
      }
    }`)

    data.data.markets.forEach(({ code, locale }) => {
      createPage({
        path: `/markets/${code}`,
        component: './src/templates/Market.vue',
        context: {
          code,
          locale
        },
        route: {
          meta: {
            locale
          }
        }
      })
    })

    data.data.exhibitors.forEach(({ code, products, locale }) => {
      createPage({
        path: `/exhibitors/${code}`,
        component: './src/templates/Exhibitor.vue',
        context: {
          code,
          locale
        },
        route: {
          meta: {
            locale
          }
        }
      })

      products.forEach(({ id, locale }) => {
        createPage({
          path: `/exhibitors/${code}/products/${id}`,
          component: './src/templates/Product.vue',
          context: {
            id,
            locale
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
