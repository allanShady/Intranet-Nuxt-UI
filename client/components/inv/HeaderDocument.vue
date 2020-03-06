<template>
  <v-flex>
    <v-row>
      <v-col>
        <v-autocomplete
          prepend-icon="mdi-text-box"
          v-model="formModel.documenttype"
          :items="form.docTypes"
          clearable
          label="Tipo de documento"
          :filter="filterCodeDesc"
          return-object
          v-validate="'required'"
          data-vv-name="formModel.documenttype"
          :error-messages="errors.collect('formModel.documenttype')"
          required
          item-text="description"
          item-value="code"
        ></v-autocomplete>
      </v-col>

      <v-col>
        <v-text-field
          prepend-icon="mdi-file-document-outline"
          v-model="formModel.referenceDoc"
          label="Nr. Guia"
          :error-messages="errors.collect('docNumber')"
          required
        ></v-text-field>
      </v-col>
      <v-col>
        <v-menu
          ref="dateMenu"
          v-model="dateMenu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="formModel.date"
              label="Date"
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="formModel.date" no-title @input="dateMenu = false"></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-autocomplete
          class="body-1"
          v-model="formModel.entity"
          :items="form.employees"
          clearable
          label="Selecione o funcionário"
          prepend-icon="mdi-account-box"
          :filter="filterCodeName"
          return-object
          @input="changeEntity"
          v-validate="'required'"
          data-vv-name="formModel.entity"
          :error-messages="errors.collect('formModel.entity')"
          required
          item-text="name"
          item-value="code"
        ></v-autocomplete>
      </v-col>
      <v-col>
        <v-autocomplete
          class="body-1"
          v-model="formModel.businessArea"
          :items="form.businessArea"
          clearable
          label="Selecione o Área de Negocio"
          prepend-icon="mdi-cash-usd-outline"
          :filter="filterCodeDesc"
          return-object
          v-validate="'required'"
          data-vv-name="formModel.businessArea"
          :error-messages="errors.collect('formModel.businessArea')"
          required
          item-value="code"
          item-text="description"
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-file-input show-size counter multiple label="Anexo"></v-file-input>
      </v-col>
    </v-row>
  </v-flex>
</template>
<script>
export default {
  props: {
    formModel: {
      type: Object,
      default: () => ({
        title: "Devolução Equipamentos",
        documenttype: null,
        date: new Date().toISOString().substr(0, 10),
        docNumber: "",
        typeEntity: "U",
        entity: null,
        businessArea: null,
        Attachs: [],
        createdBy: "Guimarães Mahota",
        createdAt: new Date().toISOString(),
        isSavingDataAndClose: false,
        isSavingData: false,
        items: []
      })
    },
    form: {
      type: Object,
      default: () => ({
        title: "Documentos Internos",
        documenttype: null,
        requiredBussinessArea: true,
        requiredExternalDocNumber: true,
        requiredAttachs: false,
        requiredProject: true,
        requiredNotes: true,
        isSelectedProduct: false,
        canAddProduct: true,
        employees: [],
        projects: [],
        businessArea: [],
        docTypes: [],
        products: [],
        unitys: [],
        rulesQuantity: {
          required: value => !!value || "Required.",
          loanMin: value => value >= 0 || "Quantidade não pode ser menor de 0",
          loanMax: value =>
            value <= 50000 || "Quantidade não pode ser menor de 50000"
        }
      })
    }
  },

  data: () => ({
    dialog: false,
    dateMenu: false
  }),
  beforeMount: async function() {},
  methods: {
    async changeEntity(item) {
      this.formModel.items = [];
      this.formModel.businessArea = null;

      if (!item) {
      } else {
        var buss = item.BusinessArea.filter(d => d.isPrincipal === true);

        if (buss.length > 0) {
          this.formModel.businessArea = buss[0].businessArea;
        }

        let entity = item.code;
        let typeArticle = this.formModel.documenttype.typeArticle;

        if (this.formModel.documenttype.type == "E") {
          var url = `products/entity/${
            item.code
          }/filters?hasstock=${1}&type=${typeArticle}`;

          var items = await this.$store.dispatch("getDataAsync", url);

          items.forEach(line => {
            this.formModel.items.push({
              product_id: line.product_id,
              description: line.description,
              unit_id: line.Product.Unity.base,
              project_id: null,
              quantity: line.quantity,
              businessArea_id: this.formModel.businessArea,
              notes: null,
              in_out: this.formModel.documenttype.type
            });
          });
        }
      }
    },

    filterCodeName(item, queryText, itemText) {
      if (!queryText) return "";

      const textOne = item.code.toLowerCase();
      const textTwo = item.name.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },

    filterCodeDesc(item, queryText, itemText) {
      if (!queryText) return "";

      const textOne = item.code.toLowerCase();
      const textTwo = item.description.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    }
  },
  computed: {
    location: () => window.location
  }
};
</script>
