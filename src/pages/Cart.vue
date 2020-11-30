<template>
  <Layout>
    <h2 class="title is-2">{{ $t('cart._') }}</h2>

    <div v-if="$store.getters.isCartEmpty">
      <p>{{ $t('cart.is-empty') }}</p>
    </div>

    <div v-else>
      <p>{{ $t('cart.summary', { nbExhibitors: nbExhibitors, total: $options.filters.formatNumber($store.getters.totalPrice()) }) }}</p>

      <cart-part v-for="(code, i) in Object.keys(structuredCart).sort()" :key="code" :open="opened === i" @open="opened = i" :exhibitor="exhibitors[code]" :exhibitorCart="structuredCart[code]">
        <template v-slot:title>
          <p>{{ i + 1 }}. {{ structuredCart[code].name }}&nbsp;<small>({{ $store.getters.totalPrice(code) | formatNumber }} €)</small></p>
        </template>
      </cart-part>

      <div class="actions">
        <b-button type="is-danger" size="is-small" @click="emptyCart">{{ $t('cart.empty' ) }}</b-button>&nbsp;
        <b-button type="is-info" size="is-small" @click="placeOrder">{{ $tc('cart.place-order', nbExhibitors) }}</b-button>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query {
  data {
    exhibitors {
      code
      delivery
      payment
      pickUpRelay
      store
    }
  }
}
</page-query>

<script>
import axios from 'axios'

import CartPart from '~/components/CartPart.vue'

export default {
  components: { CartPart },
  metaInfo: {
    title: "Cart",
  },
  data() {
    return {
      opened: -1
    };
  },
  computed: {
    nbExhibitors() {
      return Object.keys(this.structuredCart).length;
    },
    structuredCart() {
      const cart = {};
      for (const item of this.$store.state.cart) {
        const exhibitorId = item.product.exhibitor.code;
        if (!(exhibitorId in cart)) {
          cart[exhibitorId] = {
            name: item.product.exhibitor.name,
            items: []
          };
        }
        cart[exhibitorId].items.push(item);
      }
      return cart;
    },
    exhibitors() {
      const exhibitorsMap = {};
      for (const code of Object.keys(this.structuredCart)) {
        exhibitorsMap[code] = this.$page.data.exhibitors.find(e => e.code === code);
      }
      return exhibitorsMap;
    }
  },
  methods: {
    emptyCart() {
      this.$buefy.dialog.confirm({
        message: this.$t('cart.confirm-empty'),
        onConfirm: () => this.$store.commit('emptyCart')
      })
    },
    async placeOrder() {
      await this.$recaptchaLoaded();

      const token = await this.$recaptcha('Order');
      try {
        const response = await axios.post('https://api.christmas-market.be/placeorder', {
          token,
          cart: JSON.stringify(this.structuredCart),
          options: this.$store.state.cartOptions
        })
        this.$buefy.dialog.alert({
          title: 'Commande envoyée',
          message: 'Votre commande a été envoyée à l\'exposant(e) concerné(e), il(elle) vous contactera prochainement pour la finaliser.',
          type: 'is-success',
          hasIcon: true,
          icon: 'information',
          ariaRole: 'alertdialog',
          ariaModal: true
        })
      } catch (error) {
        this.$buefy.dialog.alert({
          title: 'Erreur',
          message: 'Une erreur s\'est produite et votre commande n\'a pas été envoyée, veuillez réessayer plus tard.',
          type: 'is-danger',
          hasIcon: true,
          icon: 'alert-circle',
          ariaRole: 'alertdialog',
          ariaModal: true
        })
      } finally {

      }
    }
  },
};
</script>

<style scoped>
.orders {
  margin: 10px 0;
}

.nbInput {
  max-width: 120px;
}

.actions {
  margin-top: 25px;
  text-align: right;
}
</style>
