<template>
  <v-layout>
    <v-flex>
      <v-row>
        <v-select
          class="body-1"
          :items="employes"
          v-model="editLineStatus.employ"
          clearable
          label="Selecione o Fúncionario"
          item-text="description"
          item-value="code"
          required
          return-object
        ></v-select>
      </v-row>
      <v-row>
        <v-select
          class="body-1"
          :items="products"
          v-model="editLineStatus.product"
          clearable
          label="Selecione o Artigo"
          item-text="description"
          item-value="code"
          required
          return-object
        ></v-select>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field type="number" v-model="editLineStatus.quantity" label="Qnt."></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field v-model="editLineStatus.notes" label="Notas"></v-text-field>
        </v-col>
      </v-row>
    </v-flex>

    <v-flex>
      <v-row>
        <v-select
          class="body-1"
          :items="Status"
          v-model="lineStatus.status"
          clearable
          label="Selecione o Estado"
          item-text="description"
          item-value="code"
          required
          return-object
        ></v-select>
      </v-row>

      <LinesRepair-Form v-bind:form="editLineStatus.LinesRepair"></LinesRepair-Form>

      <v-row>
        <v-col>
          <v-text-field v-model="notes" label="Notas"></v-text-field>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
import LinesRepairForm from "@/components/inv/LinesRepair";
export default {
  components: {
    LinesRepairForm
  },
  data: () => ({
    lineStatus:{
      id: 0,
      status= null,
      LineRepair:null
    },
    editLineStatus:{
      id: 0,
      employ:null,
      product:null,
      quantity:0,
      notes,

    }
  })
};
</script>
