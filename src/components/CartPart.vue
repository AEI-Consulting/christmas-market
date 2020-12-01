<template>
  <keep-alive>
    <b-collapse :open="open" @open="$emit('open', $event)" class="card orders" animation="slide">
      <div slot="trigger" slot-scope="props" class="card-header" role="button">
        <span class="card-header-title"><slot name="title"/></span>
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
            <tr v-for="item in exhibitorCart.items" :key="item.product.id">
              <td>{{ item.product.name }}</td>
              <td>{{ item.product.price | formatNumber }} €</td>
              <td><b-numberinput type="is-info" size="is-small" controls-position="compact" controls-rounded :editable="false" min="1" :value="item.quantity" @input="changeQuantity($event, item.product)" class="nbInput"></b-numberinput></td>
              <td>{{ item.quantity * item.product.price | formatNumber }} €</td>
              <td><b-button class="deleteBtn" type="is-info" size="is-small" icon-left="delete" outlined rounded @click.prevent="remove(item.product)"></b-button></td>
            </tr>
            <tr>
              <th colspan="3">{{ $t('cart.total') }}</th>
              <td>{{ $store.getters.totalPrice(exhibitor.code) | formatNumber }} €</td>
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
                <b-select expanded v-model="options.payment.mean">
                  <option v-for="paymentMean of exhibitor.payment" :key="paymentMean" :value="paymentMean">{{ $t('payment.' + paymentMean ) }}</option>
                </b-select>
              </div>
              <div class="column is-two-fifth"></div>
            </div>
            <div class="columns">
              <div class="column is-one-fifth">
                <b-icon icon="truck-delivery" size="is-small" />&nbsp;{{ $t('delivery._') }}
              </div>
              <div class="column is-two-fifth">
                <b-select expanded v-model="options.delivery.mean">
                  <option v-for="deliveryMean of exhibitor.delivery" :key="deliveryMean" :value="deliveryMean">{{ $t('delivery.' + deliveryMean ) }}</option>
                </b-select>
                <p v-if="options.delivery.mean === 'delivery' && exhibitor.deliveryCondition"><i>{{exhibitor.deliveryCondition}}</i></p>
              </div>
              <div class="column is-two-fifth">
                <b-select v-if="options.delivery.mean === 'pickup'" expanded v-model="options.delivery.pickupLocation">
                  <option v-for="(address, j) of exhibitor.pickUpRelay" :key="j">{{ address }}</option>
                </b-select>
                <b-input v-if="options.delivery.mean === 'postmail' || options.delivery.mean === 'delivery'" icon="map-marker" v-model="options.delivery.address"></b-input>
                <b-select v-if="options.delivery.mean === 'store'" expanded v-model="options.delivery.selectedStore">
                  <option v-for="(address, j) of exhibitor.store" :key="j">{{ address }}</option>
                </b-select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-collapse>
  </keep-alive>
</template>

<script>
export default {
  name: 'CartPart',
  props: {
    exhibitor: Object,
    exhibitorCart: Object,
    open: Boolean
  },
  computed: {
    cartOptions() {
      return this.$store.state.cartOptions[this.exhibitor.code] || this.options;
    }
  },
  data() {
    return {
      options: {
        payment: {},
        delivery: {}
      }
    };
  },
  watch: {
    cartOptions: {
      handler(newVal) {
        this.options = newVal;
      },
      deep: true,
      immediate: true
    },
    options: {
      handler(newVal) {
        this.$store.commit('updateCartOptions', { code: this.exhibitor.code, options: newVal });
      },
      deep: true
    }
  },
  methods: {
    remove(product) {
      this.$store.commit('removeFromCart', { product });
    },
    changeQuantity(value, product) {
      this.$store.commit('updateCart', { product, quantity: value });
    }
  }
}
</script>
