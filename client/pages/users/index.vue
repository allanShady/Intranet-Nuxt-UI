<template>
  <div id="page-forms">
    <v-container grid-list-xl fluid>
      <v-flex lg12 sm12 xs12>
          <users-list></users-list>
        </v-flex>
    </v-container>
  </div>
</template>

<script>
import usersList from "@/components/users/List";

export default {
  layout: "dashboard",
  middleware: ["custom-auth"],
  components: {
    usersList
  },
  data() {
    return {
      menu: false,
      bread_items:[
        {
          text: 'Dashboard',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: 'Link 1',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
        {
          text: 'Link 2',
          disabled: true,
          href: 'breadcrumbs_link_2',
        },
      ]
    };
  }
};
</script>
