<template>
  <v-row>
    <v-flex>
      <v-select
        class="body-1"
        :items="Status"
        v-model="LineRepair.status"
        clearable
        label="Selecione o Estado"
        item-text="description"
        item-value="code"
        required
        return-object
      ></v-select>
    </v-flex>
    <v-flex>
      <v-text-field type="number" v-model="LineRepair.quantity" label="Qnt."></v-text-field>
    </v-flex>
    <v-flex>
      <v-text-field v-model="LineRepair.notes" label="Notas"></v-text-field>
    </v-flex>
  </v-row>
</template>
<script>
export default {
  props: {
    LineRepair: {
      type: Object,
      default: () => ({
        title: "Documentos internos",
        type: null,
        quantity: 0,
        status: null,
        notes: null
      })
    }
  },
  data: () => ({
    Status: ["Cozer", "Remendar", "Outro"]
  })
};
</script>
