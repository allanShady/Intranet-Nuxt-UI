<template>
  <v-flex>
    <v-row>
    <v-combobox
      v-model="selected_statuses"
      :items="statuses"
      label="Selecione os estados de validação"
      item-text="description"
      multiple
      clearable
      hide-selected
      :loading="onFecthingItems"
      small-chips
      deletable-chips
      auto-select-first
      outlined
      return-object
      dense
    ></v-combobox>
    <v-spacer></v-spacer>
    <v-btn v-show="pending_selected_items.length > 0" small color="success"
     @click="submitValidationOfSelectedItems()" 
    >Validar</v-btn>
    </v-row>
    <v-data-table
      :headers="headers"
      v-model="pending_selected_items"
      :items="pending_items"
      show-select
      :search="search"
      class="caption"
    >
      <template v-slot:item.status.description="{ item }">
        <v-chip
          small
          :color="getColor(item.status)"
          dark
        >{{ statusProperlyDescription(item.status)}}</v-chip>
      </template>
      
      <!-- edit quantity -->
    <template v-slot:item.quantity="props">
      <v-edit-dialog :return-value.sync="props.item.quantity">
        {{ props.item.quantity }}
        <template v-slot:input>
          <v-text-field
            dense
            v-model="props.item.quantity"
            label="Qtd validada"
            single-line
            type="number"
            min="1"
          ></v-text-field>
        </template>
      </v-edit-dialog>
    </template>

      <!-- Notas validacao -->
      <template v-slot:item.validation_notes="props">
      <v-edit-dialog :return-value.sync="props.item.validation_notes">
        {{ props.item.validation_notes }}
        <template v-slot:input>
          <v-text-field dense class="caption" v-model="props.item.validation_notes" label="Notas validação" single-line></v-text-field>
        </template>
      </v-edit-dialog>
    </template>
    </v-data-table>
  </v-flex>
</template>

<script>
import ppcServices from "@/services/ppcServices.js";

export default {
  data: () => ({
    search: '',
    onFecthingItems: false,
    pending_selected_items: [],
    pending_items: [],
    selected_statuses: [],
    statuses: ["Programming", "Design", "Vue", "Vuetify"],
    headers: []
  }),

  async created() {
    this.headers = ppcServices.getTableHeadersView4Validation("DPPC");
    this.pending_items = await this.fecthPendingItems4Validation()

    //init statuses
    this.statuses = await this.fecthStatus("Validação");
  },

  methods: {
    async fecthPendingItems4Validation (statuses = '') {
        return await this.$store.dispatch(
        "getDataAsync",
        `stocks/pending?doctype=${"DPPC"}${statuses}`
      );
    },

    async fecthStatus(filter) {
      let statuses_from_API = await this.$store.dispatch(
        "getDataAsync",
        "products/statuses"
      );
      let validation_statuses = statuses_from_API.filter(s =>
        s.description.includes(filter)
      );
      let result = [];

      validation_statuses.forEach(element => {
        result.push({
          id: element.code,
          description: element.description.split(" ")[1]
        });
      });

      return result;
    },

    notifyError() {
      this.$store.dispatch("activeSnackBar", {
            show: true,
            color: "error",
            display_message: `Erro ao gravar a devolucao dos items selecionados`,
            timeout: 7000,
            Bottom: true,
            left: true,
            right: false,
            top: false
          });
    },

    statusProperlyDescription: (status) => status.description.split(" ")[1],

    async submitValidationOfSelectedItems() {
      this.onSavingData = true;
      let post_data = ppcServices.prepareDeliveryPostData(this.pending_selected_items, 'VDPPC')

      console.log('The post data is: ', post_data);

      await this.$store
        .dispatch("postDataAsync", { api_resourse: "stocks", post_data})
        .then(async response => {
          
          if(!response) {
            this.notifyError();
            return
          }

          //Pass value for the globally snack bar
          this.$store.dispatch("activeSnackBar", {
            show: true,
            color: "success",
            display_message: `A devolução de ${post_data.details.length} items foi gravada com sucesso`,
            timeout: 12000,
            Bottom: true,
            left: true,
            right: false,
            top: false
          })
          .catch(error => console.log('UMM: ', error));
          

          //Update the pending items
          this.pending_items = await this.$store.dispatch(
            "getDataAsync",
            `stocks/pending?doctype=${"VDPPC"}`
          );
        });
    },

    getColor(value) {    
      if (value)
        switch (value.description.split(" ")[1]) {
          case "Danificado":
            return "error";
            break;
          case "Lavandaria":
            return "info";
            break;
          case "Armazem":
            return "success";
            break;
          case "Fúncionario":
            return "warning";
            break;
          default:
            return  "primary"
            break;
        }
    }
  },

  watch: {
    pending_selected_items: pending_selected_items => {
      console.log("pendingSelectedItem changed: ", pending_selected_items);
    },

    async selected_statuses(selected_statuses) { 
      let status_to_search = '';
      
      for (let index = 0; index < selected_statuses.length; index++) {
        if(index == 0) {
          status_to_search = `productstatuses=${selected_statuses[index].id}`
          continue
        }

        status_to_search = `${status_to_search}&productstatuses=${selected_statuses[index].id}`
      }

      if(status_to_search) 
        status_to_search = `&${status_to_search}`
        
        this.onFecthingItems = true;

        this.fecthPendingItems4Validation(status_to_search)
        .then(resp => {
          this.pending_items = resp,
          this.onFecthingItems = false;
        });
   }
  }
};
</script>
