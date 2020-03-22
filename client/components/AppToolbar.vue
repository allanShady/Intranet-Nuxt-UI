<template>
  <v-app-bar color="primary" fixed dark app>
    <v-toolbar-title class="ml-0 pl-3">
      <v-app-bar-nav-icon @click.stop="toggleDrawer()"></v-app-bar-nav-icon>
    </v-toolbar-title>
<v-spacer></v-spacer>
    <v-select
      prepend-icon="mdi-store-outline"
      v-model="branch"
      :items="Branch"
      label="Filial"
      item-text="description"
      item-value="code"
      return-object
      single-line
      @input="selectBranch"
    ></v-select>
    <v-select
      prepend-icon="mdi-store"
      v-model="warehouse"
      :items="Warehouse"
      label="Armazem"
      item-text="description"
      item-value="code"
      return-object
      single-line
      @input="selectWarehouse"
    ></v-select>
    <v-select
      prepend-icon="mdi-map-marker-circle"
      v-model="localization"
      :items="Localization"
      label="Localização"
      item-text="description"
      item-value="code"
      return-object
      single-line
      @input="selectLocalization"
    ></v-select>

    <v-menu
      offset-y
      origin="center center"
      :nudge-right="140"
      :nudge-bottom="10"
      transition="scale-transition"
    >
      <template v-slot:activator="{ on }">
        <v-btn icon text v-on="on">
          <v-badge color="red" overlap>
            <span slot="badge">3</span>
            <v-icon small>notifications</v-icon>
          </v-badge>
        </v-btn>
      </template>
      <notification-list></notification-list>
    </v-menu>
    <v-menu
      offset-y
      origin="center center"
      :nudge-right="140"
      :nudge-bottom="10"
      transition="scale-transition"
    >
      <template v-slot:activator="{ on }">
        <v-btn icon large text v-on="on">
          <v-avatar size="30px">
            <v-icon>person</v-icon>
          </v-avatar>
        </v-btn>
      </template>

      <v-list class="pa-0">
        <v-list-item
          v-for="(item,index) in items"
          :to="!item.href ? { name: item.name } : null"
          :href="item.href"
          @click="item.click"
          ripple="ripple"
          :disabled="item.disabled"
          :target="item.target"
          rel="noopener"
          :key="index"
        >
          <v-list-item-action v-if="item.icon">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import Util from "@/util";
import NotificationList from "@/components/widgets/list/NotificationList";

export default {
  name: "app-toolbar",
  components: {
    NotificationList
  },
  data: function() {
    return {
      Branch: [],
      branch: null,
      Warehouse: [],
      warehouse: null,
      Localization:[],
      localization:null,
      items: [
        {
          icon: "account_circle",
          href: "#",
          title: "Profile",
          click: e => {
            console.log(e);
          }
        },
        {
          icon: "settings",
          href: "#",
          title: "Settings",
          click: e => {
            console.log(e);
          }
        },
        {
          icon: "fullscreen_exit",
          href: "#",
          title: "Logout",
          click: this.handleLogout
        }
      ]
    };
  },
  beforeMount: async function() {
    this.branch = localStorage.branch;

    this.Branch = await this.$store.dispatch("getDataAsync", "branch");

    if (this.branch) {

      let bar = this.Branch.filter(p => p.code == this.branch)[0];

      this.Warehouse = bar.Warehouses;
      this.warehouse = localStorage.warehouse;
    }

    if(this.warehouse){
      let loc = this.Warehouse.filter(p=> p.code == this.warehouse)[0];

      this.Localization = loc.localizations;
      this.localization =  localStorage.localization;
    }
  },
  computed: {
    toolbarColor() {
      return this.$vuetify.options.extra.mainNav;
    }
  },
  created() {},
  methods: {
    toggleDrawer() {
      this.$store.commit("toggleDrawer");
    },
    handleFullScreen() {
      Util.toggleFullScreen();
    },
    handleLogout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
    selectBranch(item) {
      if (!item) return;

      localStorage.branch = this.branch.code;

      this.Warehouse = item.Warehouses;
    },
    selectWarehouse(item) {
      if (!item) return;

      localStorage.warehouse = this.warehouse.code;
      this.Localization = this.warehouse.localizations;
    },
    selectLocalization(item){
      if (!item) return;

      localStorage.localization = this.localization.code;
    }
  }
};
</script>
