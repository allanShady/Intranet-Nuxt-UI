<template>
  <v-data-table
    :headers="headers"
    :items="formModel.items"
    v-model="formModel.selected"
    item-key="product"
    class="elevation-1"
    :show-select="form.isSelectedProduct"
  >
    <template v-slot:top>
      <v-toolbar flat dense color="transparent">
        <v-toolbar-title>
          <h3>Linhas</h3>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" v-if="$route.query.doc !== 'DRGAS'" v-show="!form.canAddProduct" color="primary">mdi-plus-circle-outline</v-icon>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Pesquisa"
              single-line
              hide-details
              v-show="!form.canAddProduct"
            ></v-text-field>
          </template>

          <v-card>
            <v-card-title>
              <span class="headline">{{ defaultItem.Title }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-autocomplete
                    v-if="($route.query.doc !== 'DRGAS')"
                    class="body-1"
                    :items="form.projects"
                    v-model="editedItem.project"
                    clearable
                    label="Selecione o projecto"
                    item-text="description"
                    item-value="code"
                    required
                    :filter="filterCodeDesc"
                    return-object
                    @change="SeachProduct(value)"
                  ></v-autocomplete>
                </v-row>
                <v-row>
                  <v-autocomplete
                    :disabled="($route.query.doc !== 'DRGAS')"
                    class="body-1"
                    :items="form.products"
                    v-model="editedItem.product"
                    clearable
                    label="Selecione o Artigo"
                    item-text="description"
                    item-value="code"
                    required
                    @input="changeArticle"
                    :search-input.sync="search"
                    :loading="isLoading"
                    hide-no-data
                    hide-selected
                    return-object
                  ></v-autocomplete>
                </v-row>
                <!-- this row is not applied for Gas area-->
                <v-row v-if="!($route.query.tipo === 'gases')">
                  <v-autocomplete
                    class="body-1"
                    :items="form.unitys"
                    v-model="editedItem.unity"
                    clearable
                    label="Selecione o UN"
                    item-text="description"
                    item-value="code"
                    required
                    :filter="filterCodeDesc"
                    return-object
                  ></v-autocomplete>
                  <v-spacer></v-spacer>
                  <v-text-field
                    type="number"
                    min="0"
                    :rules="[
                        form.rulesQuantity.loanMin,
                        form.rulesQuantity.loanMaxMax
                      ]"
                    v-model="editedItem.quantity"
                    label="Qnt."
                  ></v-text-field>
                </v-row>
                <v-row v-else-if="($route.query.tipo === 'gases')">
                  <v-autocomplete
                    :disabled="!editedItem.product"
                    class="body-1"
                    :items="form.productStatuses"
                    v-model="editedItem.status"
                    clearable
                    label="Seleccione estado da botija"
                    item-text="description"
                    item-value="code"
                    required
                    :filter="filterCodeDesc"
                    return-object
                  ></v-autocomplete>
                </v-row>
                <v-row>
                  <v-textarea clearable v-model="editedItem.notes" label="Notas"></v-textarea>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn
                small
                :disabled="!editedItem.product"
                color="blue darken-1"
                text
                @click="save"
              >Adicionar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:item.action>
      <v-icon
        v-show="!form.canAddProduct"
        @click="removeLine"
        small
        color="error"
      >mdi-minus-circle-outline</v-icon>
    </template>

    <template v-slot:no-data>0 - Linhas Adicionadas</template>
  </v-data-table>
</template>

<script>
import { mapGetters } from 'vuex';
import gasServices from '@/services/gasServices.js';

export default {
  props: {
    formModel: {
      type: Object,
      default: () => ({
        title: "Documentos Internos",
        typeDocument: null,
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
        items: [],
        productStatuses: [],
        selected: []
      })
    },
    form: {
      type: Object,
      default: () => ({
        title: "Documentos Internos",
        menuArea: "",
        typeDocument: null,
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
    },
    items: {
      type: Array,
      default: () => []
    }
  },

  data: () => ({
    isSelected: false,

    isLoading: false,
    model: null,
    search: null,

    editedItem: { quantity: 0 },
    editedIndex: 0,
    defaultItem: {
      title: "Adiciona o Artigo",
      product: null,
      description: null,
      unity: null,
      quantity: 0,
      project: null,
      factor: 1,
      notes: null
    },

    dialog: false,
    dateMenu: false,

    headers: [
      {
        text: "#",
        align: "left",
        sortable: false,
        value: "sel"
      },
      { text: "Artigo", value: "product" },
      { text: "Descrição", value: "description" },
      { text: "UN", value: "unity" },
      { text: "Qnt.", value: "quantity" },
      { text: "Projeto", value: "project" },
      { text: "Notas", value: "notes" },
      { text: "", value: "action", sortable: false }
    ]
  }),

  computed: {
    location: () => window.location
  },
  methods: {
    changeArticle(item) {
      if (!item) {
        this.editedItem.unity = null;
      } else {
        this.editedItem.unity = item.Unity ? item.Unity.base : "UN";
      }
    },

    editItem(item) {
      console.log("Editied item:", item);
    },

    deleteItem(item) {
      const index = this.items.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.items.splice(index, 1);
    },

    SeachProduct(value) {
      if (!value) {
        this.form.products = [];
        this.isLoading = false;
      }
    },

    close() {
      this.dialog = false;

      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      let unity = "";

      if (!this.editedItem.unity.code) {
        unity = this.editedItem.unity;
      } else {
        unity = this.editedItem.unity.code;
      }

      if (this.editedItem.product) {
        let proj = !this.editedItem.project
          ? null
          : this.editedItem.project.code;

        this.formModel.items.push({
          product: this.editedItem.product.code,
          description: this.editedItem.product.description,
          unity: unity || 'UN',
          project: proj,
          quantity: this.editedItem.quantity || this.editedItem.status.code,
          status: this.editedItem.status,
          notes: this.editedItem.notes,
          in_out: this.formModel.documenttype.type,
          factor: 1,
          branch: localStorage.branch,
          warehouse: localStorage.warehouse || "Sede",
          location: localStorage.localization || "Sede",
          businessArea: !this.formModel.businessArea
            ? null
            : this.formModel.businessArea.code
        });

        this.close();
      } else {
        alert("É obrigatorio selecionar o artigo");
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

    async intProductStatus(productType) {
      this.form.productStatuses = await this.$store.dispatch(
        "getDataAsync",
        `products/statuses/filters?${productType}`
      );
    },

    filterCodeDesc(item, queryText, itemText) {
      if (!queryText) return "";

      const textOne = item.code.toString().toLowerCase();
      const textTwo = item.description.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },

    getProducts(item) {},

    removeLine(item) {
      this.formModel.items.splice(item);
    },

    isGasesMenu() {
      return this.form.menuArea.toLowerCase() === "gases";
    }
  },

  async created() {
    this.form.menuArea = this.$router.currentRoute.query["tipo"];

    console.log('Form model document type: ', this.$store.getters.electedDocument);

    //TODO: Please refactory this code i'm bagging cause this is hard to maintan
    if (this.form.menuArea === "gases") {
      //get and init product status wich are just valid 4 gas
      await this.intProductStatus("producttype=55");

      if(this.$route.query.doc === 'DRGAS')
        this.headers =  gasServices.getTableHeadersView('wharehouse');
      else
      this.headers = [
        {
          text: "#",
          align: "left",
          sortable: false,
          value: "sel"
        },
        { text: "Artigo", value: "product" },
        { text: "Descrição", value: "description" },
        { text: "UN", value: "unity" },
        { text: "Estado", value: "status.description" },
        { text: "Projeto", value: "project" },
        { text: "Notas", value: "notes" },
        { text: "", value: "action", sortable: false }
      ];
    }
  },

  computed: { 
    ...mapGetters(['selectedDocument'])
  },

  watch: {
    search: async function(value) {
      this.isLoading = true;

      let url = await `products/filters?type=${this.formModel.documenttype.typeArticle}&code=${value}`;

      if (this.form.menuArea === "gases")
        // project filter
        url = `${url}&project=${this.editedItem.project.code}`;

      if (value)
        this.form.products = await this.$store.dispatch("getDataAsync", url);

      this.isLoading = false;
    }
  }
};
</script>
