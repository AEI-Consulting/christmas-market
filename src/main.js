import Vuex from "vuex"
import DefaultLayout from "~/layouts/Default.vue"

export default function (Vue, { router, head, isClient, appOptions }) {
  Vue.component("Layout", DefaultLayout)

  Vue.use(Vuex)

  appOptions.store = new Vuex.Store({
    state: {
      cart: []
    },
    mutations: {
      addToCart (state, { product, quantity }) {
        const item = state.cart.find(p => p.product.id === product.id);
        if (item) {
          item.quantity += quantity;
        } else {
          state.cart.push({ product, quantity })
        }
      }
    }
  })
}
