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
          <p class="card-header-title">{{structuredCart[code].name}}</p>
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
                <td><b-numberinput type="is-info" size="is-small" controls-position="compact" controls-rounded editable="false" min="1" :value="item.quantity" @input="changeQuantity($event, item.product)" class="nbInput"></b-numberinput></td>
                <td>{{ item.quantity * item.product.price | formatNumber }} €</td>
                <td><b-button class="deleteBtn" type="is-info" size="is-small" icon-left="delete" outlined rounded @click.prevent="remove(item.product)"></b-button></td>
              </tr>
              <tr>
                <th colspan="3">{{ $t('cart.total') }}</th>
                <td>{{ $store.getters.totalPrice(code) | formatNumber }} €</td>
                <td></td>
              </tr>
            </table>
          </div>
        </div>
      </b-collapse>

      <b-button type="is-danger" @click="emptyCart">{{ $t('cart.empty' ) }}</b-button>&nbsp;
      <b-button type="is-info" @click="placeOrder">{{ $tc('cart.place-order', nbExhibitors) }}</b-button>
    </div>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: "Cart",
  },
  data() {
    return {
      isOpen: 0
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
</style>
