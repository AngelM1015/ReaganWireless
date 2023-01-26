<script lang="ts">
import { defineComponent } from "vue";
import { SidebarMenu } from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
import googleSheetApiService from "@/services/googleSheetApiService";
import { useProductPageStore } from "@/stores/ProductPageStore";

export default defineComponent({
  setup() {
    const store = useProductPageStore();
    return {
      store,
    };
  },
  props: {
    bestSellerLists: Array,
  },
  data() {
    return {
      menu: [],
      loading: true,
      isOpenSidebar: false,
    };
  },
  components: {
    SidebarMenu,
  },
  methods: {
    capitalizeFirstLetter(string) {
      if (string == "case" || string == "headphone" || string == "speaker" || string == "Phone"  || string == "tablet") {
        return string.charAt(0).toUpperCase() + string.slice(1).concat( "s");
      } else if (string == "Phone" || string == "watch" || string == "tablet") {
        return string.charAt(0).toUpperCase() + string.slice(1).concat("es");
      }
    },
    onToggleCollapse(collapsed) {},
    onItemClick(event, item) {
      this.store.setType(item.value);
      this.store.setSelectedBrand("");
      this.store.setSortByProperty("Name");
    },
  },
  mounted() {
    googleSheetApiService
      .getProducts()
      .then((response: any) => {
        let allTypeList = response.data.map((product) => {
          return product.Type;
        });
        let uniqueList = allTypeList.filter((value, index, self) => {
          return self.indexOf(value) === index;
        });
        this.store.setType(uniqueList);
        let mainMenu = [];
        let subMenu = [];

        uniqueList.forEach((type) => {
          if (type == "case" || type == "headphone" || type == "speaker") {
            subMenu.push({
              title: this.capitalizeFirstLetter(type),
              href: "/products",
              value: type,
            });
          } else {
            mainMenu.push({
              title: this.capitalizeFirstLetter(type),
              href: "/products",
              value: type,
              // icon: "i-mdi-menu-right",
            });
          }
        });
        mainMenu.unshift({
          title: "Accessories",
          href: "/products",
          value: ["case", "headphone", "speaker"],
          child: subMenu,
        });
        mainMenu.unshift({
          title: "View All Products",
          href: "/products",
          value: uniqueList,
        });
        this.menu = mainMenu;
        this.loading = false;
      })
      .catch((e: Error) => {
        console.log(e);
      });
  },
});
</script>
<template>
  <Spinner v-if="loading" class="mt-96" />
  <sidebar-menu
    v-else
    :menu="menu"
    :theme="'white-theme'"
    :width="'100%'"
    @item-click="onItemClick"
    class="drawer md:-translate-x-0"
    :class="{
      '-translate-x-full': !isOpenSidebar,
      '-translate-x-0': isOpenSidebar,
    }"
  />
  <button
    class="fixed top-36 left-0 bg-gray-400 md:hidden p-1 border rounded-r-full"
    @click="isOpenSidebar = !isOpenSidebar"
  >
    <div class="i-mdi-menu-right text-lg"></div>
  </button>
</template>

<style>
.drawer {
  /* transform: translateX(100%); */
  transition: transform ease-out 0.3s;
}
.vsm--scroll-overflow {
  @apply border border-gray-300 rounded-md;
}
/* .v-sidebar-menu .vsm--scroll > .vsm--menu {
  @apply w-60 !important;
} */
.v-sidebar-menu {
  @apply static bg-white;
}
@media screen and (max-width: 768px) {
  .v-sidebar-menu {
    @apply fixed bg-white top-44 bottom-auto;
  }
  .vsm--toggle-btn {
    @apply block !important;
  }
}
.v-sidebar-menu .vsm--link:hover {
  @apply bg-gray-200;
}
.v-sidebar-menu .vsm--link {
  @apply text-black;
}
.v-sidebar-menu .vsm--header {
  @apply text-black;
}
.vsm--toggle-btn {
  @apply hidden !important;
}
.v-sidebar-menu .vsm--dropdown {
  @apply bg-white;
}
.v-sidebar-menu .vsm--link_level-1.vsm--link_active {
  @apply shadow-none;
}
.v-sidebar-menu.vsm_expanded .vsm--link_level-1.vsm--link_open {
  @apply bg-white text-black;
}
.v-sidebar-menu.vsm_white-theme .vsm--link_level-1.vsm--link_active {
  box-shadow: 0 0 #0000;
}
</style>
