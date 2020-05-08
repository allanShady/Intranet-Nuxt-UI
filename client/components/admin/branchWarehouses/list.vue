<template>
  <v-card>
    <v-card-title>
      {{list.title}} da filial <v-spacer></v-spacer>  <v-chip text outlined small  color="warning" >{{list.branch}}</v-chip>
    </v-card-title>

    <v-card-text class="pa-0">
      <v-data-table
        :headers="list.headers"
        :items="list.records"      
        :item-key="list.ItemKey"
        class="elevation-0"
        :no-data-text="`Nenhum armazém associado a filial - ${list.branch}`"
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
