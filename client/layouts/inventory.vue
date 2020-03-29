<template>
  <div id="appRoot">
    <template>
      <v-app id="inspire" class="app">
        <app-drawer class="app--drawer"></app-drawer>
        <app-toolbar class="app--toolbar"></app-toolbar>
        <v-content>
          <v-container class="mb-12">
            <!-- Page Header -->
            <page-header></page-header>
            <nuxt :key="$route.fullPath" />
          </v-container>
          <!-- App Footer -->
          <v-footer height="auto" class="white pa-3 app--footer">
            <span class="caption">&copy; {{ new Date().getFullYear() }}</span>
            <v-spacer></v-spacer>
            <span class="caption mr-1">
              Developed & supported by
              <a
                href="https://www.incentea.com/pt/home?country=mocambique"
              >ínCentea MZ</a>
            </span>
            <!--v-icon color="pink" small>favorite</v-icon-->
          </v-footer>
        </v-content>
        <!-- Go to top -->
        <app-fab></app-fab>
        <!-- theme setting -->
        <v-btn
          small
          fab
          dark
          falt
          fixed
          top="top"
          right="right"
          class="setting-fab"
          color="red"
          @click="openThemeSettings"
        >
          <v-icon>settings</v-icon>
        </v-btn>
        <v-navigation-drawer
          class="setting-drawer"
          temporary
          right
          v-model="rightDrawer"
          hide-overlay
          fixed
        >
          <theme-settings></theme-settings>
        </v-navigation-drawer>

        <v-snackbar
          :value="snackBar.show"
          :bottom="snackBar.bottom"
          :color="snackBar.color"
          :left="snackBar.left"
          :right="snackBar.right"
          :timeout="snackBar.timeout"
          :top="snackBar.top"
        >
          {{ snackBar.display_message }}
          <v-btn text @click="closeSnackBar(true)">Close</v-btn>
        </v-snackbar>
      </v-app>
    </template>
  </div>
</template>

<script>
import AppDrawer from "@/components/AppDrawer";
import AppToolbar from "@/components/AppToolbar";
import AppFab from "@/components/AppFab";
import PageHeader from "@/components/PageHeader";
import ThemeSettings from "@/components/ThemeSettings";
import { mapState, mapActions } from "vuex";

export default {
  middleware: "custom-auth",
  components: {
    AppDrawer,
    AppToolbar,
    AppFab,
    PageHeader,
    ThemeSettings
  },
  data: () => ({
    expanded: true,
    rightDrawer: false
  }),

  methods: {
    openThemeSettings() {
      this.$vuetify.goTo(0);
      this.rightDrawer = !this.rightDrawer;
    },
    ...mapActions(["closeSnackBar"])
  },

  computed: {
    ...mapState(["snackBar"])
  }
};
</script>

<style lang="stylus" scoped>
.setting-fab {
  top: 50% !important;
  right: 0;
  border-radius: 0;
}

.app--footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
