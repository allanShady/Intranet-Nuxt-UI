<template>
  <v-card>
    <v-card-title>
      {{list.title}} de armazém<v-spacer></v-spacer>  <v-chip text outlined small  color="warning" >{{list.warehouse}}</v-chip>
    </v-card-title>

    <v-card-text class="pa-0">
      <v-data-table
        :headers="list.headers"
        :items="list.records"      
        :item-key="list.ItemKey"
        class="elevation-0"
        :no-data-text="`Sem ${list.title.toLowerCase()} associadas ao armazém - ${list.warehouse}`"
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
