<template>
  <Layout>
    <h2 class="title is-2">{{ $t('cart._') }}</h2>

    <div v-if="$store.getters.isCartEmpty">
      <p>{{ $t('cart.is-empty') }}</p>
    </div>

    <div v-else>
      <p>{{ $t('cart.summary', { nbExhibitors: nbExhibitors, total: $options.filters.formatNumber($store.getters.totalPrice()) }) }}</p>

      <b-collapse v-for="(code, i) in Object.keys(structuredCart).sort()" :key="i" :open="isOpen === i" @open="isOpen = i" class="card orders" animation="slide">
        <div slot="trigger" slot-scope="props" class="card-header" role="button">
          <p class="card-header-title">{{ i + 1 }}. {{ structuredCart[code].name }}&nbsp;<small>({{ $store.getters.totalPrice(code) | formatNumber }} €)</small></p>
          <a class="card-header-icon"><b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon></a>
        </div>
        <div class="card-content">
          <div class="content">
            <table class="table">
              <tr>
                <th>{{ $tc('product._', 1) }}</th>
                <th>{{ $t('cart.unit-price') }}</th>
                <th>{{ $t('cart.quantity') }}</th>
                <th>{{ $t('cart.price') }}</th>
                <th></th>
              </tr>
              <tr v-for="item in structuredCart[code].items" :key="item.product.id">
                <td>{{ item.product.name }}</td>
                <td>{{ item.product.price | formatNumber }} €</td>
                <td><b-numberinput type="is-info" size="is-small" controls-position="compact" controls-rounded :editable="false" min="1" :value="item.quantity" @input="changeQuantity($event, item.product)" class="nbInput"></b-numberinput></td>
                <td>{{ item.quantity * item.product.price | formatNumber }} €</td>
                <td><b-button class="deleteBtn" type="is-info" size="is-small" icon-left="delete" outlined rounded @click.prevent="remove(item.product)"></b-button></td>
              </tr>
              <tr>
                <th colspan="3">{{ $t('cart.total') }}</th>
                <td>{{ $store.getters.totalPrice(code) | formatNumber }} €</td>
                <td></td>
              </tr>
            </table>
            <div>
              <h4 class="title is-4">{{ $t('cart.options') }}</h4>

              <div class="columns">
                <div class="column is-one-fifth">
                  <b-icon icon="credit-card-outline" size="is-small" />&nbsp;{{ $t('payment._') }}
                </div>
                <div class="column is-two-fifth">
                  <b-select expanded v-model="paymentMeans[i]">
                    <option v-for="paymentMean of exhibitors[code].payment" :key="paymentMean" :value="paymentMean">{{ $t('payment.' + paymentMean ) }}</option>
                  </b-select>
                </div>
                <div class="column is-two-fifth">
                </div>
              </div>

              <div class="columns">
                <div class="column is-one-fifth">
                  <b-icon icon="truck-delivery" size="is-small" />&nbsp;{{ $t('delivery._') }}
                </div>
                <div class="column is-two-fifth">
                  <b-select expanded v-model="deliveryMeans[i]">
                    <option v-for="deliveryMean of exhibitors[code].delivery" :key="deliveryMean" :value="deliveryMean">{{ $t('delivery.' + deliveryMean ) }}</option>
                  </b-select>
                </div>
                <div class="column is-two-fifth">
                  <b-select v-if="deliveryMeans[i] === 'pickup'" expanded>
                    <option v-for="(address, j) of exhibitors[code].pickUpRelay" :key="j">{{ address }}</option>
                  </b-select>
                  <b-input v-if="deliveryMeans[i] === 'postmail'" icon="map-marker"></b-input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-collapse>

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
export default {
  metaInfo: {
    title: "Cart",
  },
  data() {
    return {
      isOpen: -1,
      paymentMeans: [],
      deliveryMeans: []
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
    remove(product) {
      this.$store.commit('removeFromCart', { product });
    },
    changeQuantity(value, product) {
      this.$store.commit('updateCart', { product, quantity: value });
    },
    emptyCart() {
      this.$buefy.dialog.confirm({
        message: this.$t('cart.confirm-empty'),
        onConfirm: () => this.$store.commit('emptyCart')
      })
    },
    async placeOrder() {
      await this.$recaptchaLoaded();

      const token = await this.$recaptcha('Order');
      console.log(token)
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
