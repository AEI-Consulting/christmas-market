<template>
  <Layout>
    <h2 class="title is-2">{{title}}</h2>

    <section class="presentation">
      <slot name="presentation" />
    </section>

    <div class="searchBox">
      <div><b-input :placeholder="$t('search.ph')" type="search" icon="magnify" v-model="searchText"></b-input></div>
    </div>

    <card-list>
      <component :is="cardType" v-for="data in filteredData" :key="data.key" :link="data.link" :img="data.img" :product="data.object">
        <div>
          <slot name="items" :object="data.object" />
        </div>
      </component>
    </card-list>
  </Layout>
</template>

<script>
import CardList from '~/components/CardList.vue'
import ImageCard from '~/components/ImageCard.vue'
import ProductCard from '~/components/ProductCard.vue'

export default {
  components: {
    CardList,
    ImageCard,
    ProductCard
  },
  props: {
    title: {
      type: String,
      default: 'Default title'
    },
    cardType: {
      type: String,
      default: 'image-card'
    },
    data: {
      type: Array,
      default: () => []
    },
    searchFields: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    searchText: ''
  }),
  computed: {
    filteredData() {
      return this.data.filter(e => {
        if (!this.searchFields.length) {
          return true;
        }

        for (const field of this.searchFields) {
          if (e.object[field] && e.object[field].toString().toLowerCase().includes(this.searchText.toLowerCase())) {
            return true;
          }
        }
        return false;
      });
    }
  }
}
</script>

<style>
.presentation > p {
  text-align: justify;
  margin-bottom: 20px;
}

.searchBox {
  text-align: right;
}
.searchBox div {
  display: inline-block;
  width: 350px;
}
</style>
