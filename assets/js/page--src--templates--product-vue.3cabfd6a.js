(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{"6QYj":function(t,i,s){"use strict";s("fqI4")},PE4R:function(t,i,s){"use strict";s.r(i);var a={metaInfo:function(t){return{title:t.$context.title}},computed:{product:function(){return this.$page.data.product}},methods:{addToCart:function(){this.$store.commit("addToCart",{product:this.$page.data.product,quantity:1})}},data:function(){return{isPicturesModalActive:!1}}},c=(s("6QYj"),s("KHd+")),e=null,r=Object(c.a)(a,(function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("Layout",[s("nav",{staticClass:"breadcrumb",attrs:{"aria-label":"breadcrumbs"}},[s("ul",[s("li",[s("g-link",{attrs:{to:"/"}},[t._v("Accueil")])],1),s("li",[s("g-link",{attrs:{to:t.$tp("/exhibitors/"+t.product.exhibitor.code)}},[t._v(t._s(t.product.exhibitor.name))])],1),s("li",{staticClass:"is-active"},[s("a",{attrs:{href:"#"}},[t._v(t._s(t.product.name))])])])]),s("h2",{staticClass:"title is-2"},[t._v(t._s(t.product.name))]),s("div",{staticClass:"tile is-ancestor"},[s("div",{staticClass:"tile is-parent is-8"},[s("div",{staticClass:"tile is-child"},[s("div",{directives:[{name:"g-image",rawName:"v-g-image"}],staticClass:"content presentation",domProps:{innerHTML:t._s(t.product.description)}}),s("div",{staticClass:"infobox"},[s("div",[s("b-icon",{attrs:{icon:"shopping",size:"is-small"}}),t._v(" \n            "),s("g-link",{attrs:{to:t.$tp("/exhibitors/"+t.product.exhibitor.code)}},[t._v(t._s(t.product.exhibitor.name))])],1),t.product.packaging?s("div",[s("b-icon",{attrs:{icon:"package-variant-closed",size:"is-small"}}),t._v(" \n            "+t._s(t.product.packaging)+"\n          ")],1):t._e(),s("div",[s("b-icon",{attrs:{icon:"cash",size:"is-small"}}),t._v(" \n            "+t._s(t._f("formatNumber")(t.product.price))+" €\n          ")],1)])])]),s("div",{staticClass:"tile is-parent is-vertical"},[s("div",{staticClass:"tile is-child productImg"},[t.product.image?s("g-image",{attrs:{src:t.product.image.url}}):t._e()],1),s("div",{staticClass:"tile is-child videoBtn"},[t.product.pictures&&t.product.pictures.length?s("b-tooltip",{attrs:{label:t.$t("product.discover.pictures"),position:"is-bottom"}},[s("b-button",{attrs:{type:"is-info",size:"is-small","icon-left":"image-multiple"},on:{click:function(i){t.isPicturesModalActive=!0}}},[t._v(t._s(t.$t("product.pictures")))])],1):t._e()],1)])]),t.product.pictures&&t.product.pictures.length?s("b-modal",{model:{value:t.isPicturesModalActive,callback:function(i){t.isPicturesModalActive=i},expression:"isPicturesModalActive"}},[s("b-carousel",{staticClass:"picturesCarousel",attrs:{"indicator-inside":!1},scopedSlots:t._u([{key:"indicators",fn:function(i){return[s("span",{staticClass:"al image"},[s("img",{staticClass:"thumbPicture",attrs:{src:t.product.pictures[i.i].url,title:i.i}})])]}}],null,!1,3409857927)},t._l(t.product.pictures.length,(function(i,a){return s("b-carousel-item",{key:a,staticClass:"bigPicture"},[s("span",{staticClass:"image"},[s("img",{attrs:{src:t.product.pictures[a].url}})])])})),1)],1):t._e(),s("div",{staticClass:"actions"},[s("b-button",{attrs:{type:"is-info",size:"is-small","icon-left":"cart-plus"},on:{click:t.addToCart}},[t._v(t._s(t.$t("cart.add")))])],1)],1)}),[],!1,null,"33caaadf",null);"function"==typeof e&&e(r);i.default=r.exports},fqI4:function(t,i,s){}}]);