<template>
  <v-card>
    <v-card-title>
      {{list.title}} <v-spacer></v-spacer> armazén: <label color="info"> {{list.warehouse}}</label>
    </v-card-title>

    <v-card-text class="pa-0">
      <v-data-table
        :headers="list.headers"
        :items="list.records"
        single-select
        :items-per-page="20"
        :item-key="list.ItemKey"
        class="elevation-0"
        disable-pagination
      >
      </v-data-table>
    </v-card-text>
  </v-card>
</template>
<script>

export default {
  props: {
    list: {
      type: Object,
      required: true
    }
  },
};
</script>
