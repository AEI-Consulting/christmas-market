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
        <b-button type="is-info" size="is-small" @click="confirmOrder">{{ $tc('cart.place-order', nbExhibitors) }}</b-button>
      </div>

      <b-modal v-model="isConfirmDialogOpen" has-modal-card trap-focus :destroy-on-hide="false" aria-role="dialog" aria-modal>
        <template #default="{close}">
          <form action="">
            <div class="modal-card" style="width: auto">
              <header class="modal-card-head">
                <p class="modal-card-title">Confirmation commande</p>
                <button type="button" class="delete" @click="close"/>
              </header>
              <section class="modal-card-body">
                <p>Les montants indiqués dans votre panier sont indicatifs et ne comprennent pas les éventuelles réductions proposées par les exposant(e)s, ni les éventuels frais d'envoi, en cas de livraison postale. Le prix définitif vous sera communiqué par l'exposant(e).</p>
                <b-field label="Nom">
                  <b-input type="text" v-model="customer.name" placeholder="Votre nom" required></b-input>
                </b-field>
                <b-field label="Email">
                  <b-input type="email" v-model="customer.email" placeholder="Votre adresse e-mail" required></b-input>
                </b-field>
                <b-field label="Téléphone/GSM (optionnel)">
                  <b-input type="email" v-model="customer.phone" placeholder="Votre numéro de téléphone"></b-input>
                </b-field>
              </section>
              <footer class="modal-card-foot">
                <div v-if="!placingOrder" class="actions">
                  <b-button type="is-danger" size="is-small" @click="close">Annuler</b-button>
                  <b-button type="is-info" size="is-small" @click="placeOrder">Envoyer la commande</b-button>
                </div>
                <div v-else>Envoi de la commande en cours...</div>
              </footer>
            </div>
          </form>
        </template>
        </b-modal>
    </div>
  </Layout>
</template>

<page-query>
query {
  data {
    exhibitors {
      code
      delivery
      deliveryCondition
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
    title: 'Cart',
  },
  data() {
    return {
      opened: -1,
      isConfirmDialogOpen: false,
      placingOrder: false,
      customer: {
        name: '',
        email: '',
        phone: ''
      }
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
    confirmOrder() {
      let valid = true;

      // Check whether the payment and delivery option are selected
      for (const exhibitor of Object.keys(this.structuredCart)) {
        const cartOptions = this.$store.state.cartOptions[exhibitor];
        if (!cartOptions || !cartOptions.payment || !cartOptions.payment.mean || !cartOptions.delivery || !cartOptions.delivery.mean) {
          valid = false;
          break;
        }

        // Check whether details are completed
        switch (cartOptions.delivery.mean) {
          case 'delivery':
          case 'postmail':
            if (!cartOptions.delivery.address) {
              valid = false;
            }
            break;

          case 'pickup':
            if (!cartOptions.delivery.pickupLocation) {
              valid = false;
            }
            break;

          case 'store':
            if (!cartOptions.delivery.selectedStore) {
              valid = false;
            }
            break;
        }
      }

      if (valid) {
        this.isConfirmDialogOpen = true;
      } else {
        this.$buefy.toast.open({
          duration: 5000,
          message: 'Les moyens de paiement et de livraison ne sont pas définis pour tous les exposant(e)s.',
          position: 'is-top',
          type: 'is-danger'
        });
      }
    },
    async placeOrder() {
      if (!this.customer || !this.customer.name || !this.customer.email) {
        this.$buefy.toast.open({
          duration: 5000,
          message: 'Vous devez au moins renseigner votre nom et votre adresse e-mail.',
          position: 'is-top',
          type: 'is-danger'
        });
        return;
      }

      this.placingOrder = true;
      await this.$recaptchaLoaded();
      const token = await this.$recaptcha('Order');
      try {
        const response = await axios.post('https://api.christmas-market.be/placeorder', {
          token,
          cart: JSON.stringify(this.structuredCart),
          options: this.$store.state.cartOptions,
          customer: this.customer
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
      } catch (err) {
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
        this.placingOrder = false;
        this.isConfirmDialogOpen = false;
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
