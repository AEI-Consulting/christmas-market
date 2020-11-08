import '~/assets/styles.scss'

import Buefy from 'buefy'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import { VueReCaptcha } from 'vue-recaptcha-v3'

import DefaultLayout from '~/layouts/Default.vue'
import MainPageLayout from '~/layouts/MainPage.vue'

const numeral = require('numeral');

export default function (Vue, { appOptions, head }) {
  Vue.component('Layout', DefaultLayout);
  Vue.component('MainPageLayout', MainPageLayout);

  // Configure the Buefy UI components framework
  Vue.use(Buefy);
  head.link.push({
    rel: 'stylesheet',
    href: 'https://cdn.materialdesignicons.com/5.3.45/css/materialdesignicons.min.css'
  });

  // Configure and define a filter to format numbers
  numeral.register('locale', 'fr', {
    delimiters: {
      thousands: ' ',
      decimal: ','
    }
  });
  numeral.locale('fr');

  Vue.filter('formatNumber', function (value) {
    return numeral(value).format('0.00');
  })

  // Configure the Vuex store
  Vue.use(Vuex);
  appOptions.store = new Vuex.Store({
    state: {
      cart: []
    },
    mutations: {
      addToCart(state, { product, quantity }) {
        const item = state.cart.find(p => p.product.id === product.id);
        if (item) {
          item.quantity += quantity;
        } else {
          state.cart.push({ product, quantity });
        }
      },
      updateCart(state, { product, quantity }) {
        const item = state.cart.find(p => p.product.id === product.id);
        if (item) {
          item.quantity = quantity;
        }
      },
      removeFromCart(state, { product }) {
        const i = state.cart.findIndex(p => p.product.id === product.id);
        if (i >= 0) {
          state.cart.splice(i, 1);
        }
      },
      emptyCart(state) {
        state.cart = [];
      }
    },
    getters: {
      isCartEmpty(state) {
        return state.cart.length === 0;
      },
      cartSize(state) {
        return state.cart.reduce((nb, p) => nb + p.quantity, 0);
      },
      totalPrice: (state) => (code) => {
        return state.cart.reduce((price, p) => price + (!code || (p.product.exhibitor.code === code) ? p.quantity * p.product.price : 0), 0);
      }
    },
    plugins: [new VuexPersistence().plugin]
  });

  // Configure reCaptcha
  Vue.use(VueReCaptcha, { siteKey: '6LfrR98ZAAAAANtPm1ARhN5aql1uXVFcQOd6bjWg' })
}
