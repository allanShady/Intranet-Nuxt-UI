<template>
  <v-data-table
    :headers="headers"
    :items="formModel.items"
    item-key="article"
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
            <v-btn v-on="on" v-show="!form.canAddProduct">
              <v-icon>mdi-plus-circle-outline</v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-card-title>
              <span class="headline">{{ defaultItem.Title }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col>
                    <v-autocomplete
                      class="body-1"
                      :items="form.products"
                      v-model="editedItem.product"
                      clearable
                      label="Selecione o Artigo"
                      item-text="description"
                      item-value="code"
                      required
                      @input="changeArticle"
                      :filter="filterCodeDesc"
                      return-object
                    ></v-autocomplete>
                  </v-col>
                </v-row>
                <v-row>
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
                  <v-col>
                    <v-text-field type="number" v-model="editedItem.quantity" required label="Qnt."></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-autocomplete
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
                    ></v-autocomplete>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field v-model="editedItem.notes" label="Notas"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Adicionar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:no-data>0 - Linhas Adicionadas</template>
  </v-data-table>
</template>

<script>
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
        items: []
      })
    },
    form: {
      type: Object,
      default: () => ({
        title: "Documentos Internos",
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
        unitys: []
      })
    },
    items: {
      type: Array,
      default: () => []
    }
  },

  data: () => ({
    isSelected: false,

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
      { text: "Artigo", value: "product_id" },
      { text: "Descrição", value: "description" },
      { text: "UN", value: "unity" },
      { text: "Qnt.", value: "quantity" },
      { text: "Projeto", value: "project_id" },
      { text: "Notas", value: "notes" }
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
        this.editedItem.unity = item.Unity.base;
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

    close() {
      console.log("closing the dialog");
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      console.log(this.editedItem);

      this.formModel.items.push({
        product_id: this.editedItem.product.code,
        unit_id: this.editedItem.unity.code,
        project_id: this.editedItem.project.code,

        //product: this.editedItem.product,
        description: this.editedItem.product.description,
        quantity: this.editedItem.quantity,
        unity: this.editedItem.unity,
        businessArea_id:this.formModel.businessArea,
        //businessArea: this.formModel.businessArea,
        //project: this.editedItem.project,
        notes: this.editedItem.notes
      });

      this.close();
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
  }
};
</script>
