import Buefy from 'buefy'
import Vuex from 'vuex'

import DefaultLayout from '~/layouts/Default.vue'

import 'buefy/dist/buefy.css'

export default function (Vue, { appOptions, head }) {
  Vue.component('Layout', DefaultLayout);

  // Configure the Buefy UI components framework
  Vue.use(Buefy);
  head.link.push({
    rel: 'stylesheet',
    href: 'https://cdn.materialdesignicons.com/5.3.45/css/materialdesignicons.min.css'
  });

  // Configure the Vuex store
  Vue.use(Vuex);
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
          state.cart.push({ product, quantity });
        }
      },
      emptyCart (state) {
        state.cart = [];
      }
    },
    getters: {
      isCartEmpty(state) {
        return state.cart.length === 0;
      },
      cartSize(state) {
        return state.cart.length;
      }
    }
  });
}
