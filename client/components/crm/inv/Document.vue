<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex>
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>{{form.title}}</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-btn icon @click="requestCloseForm">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar>

          <v-card-text>
            <v-flex lg12>
              <v-row>
                <v-col>
                  <v-autocomplete
                    prepend-icon="mdi-text-box"
                    v-model="formModel.documenttype"
                    :items="documentTypes"
                    clearable
                    label="Tipo de documento"
                    :filter="filterCodeName"
                    return-object
                    v-validate="'required'"
                    data-vv-name="documenttype"
                    :error-messages="errors.collect('documenttype')"
                    required
                    item-text="description"
                    item-value="description"
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
                    :items="employees"
                    clearable
                    label="Selecione o funcionário"
                    prepend-icon="mdi-account-box"
                    :filter="filterCodeName"
                    return-object
                    @input="changeEntity"
                    v-validate="'required'"
                    data-vv-name="typeDocument"
                    :error-messages="errors.collect('typeDocument')"
                    required
                    item-text="name"
                    item-value="code"
                  ></v-autocomplete>
                </v-col>
                <v-col>
                  <v-autocomplete
                    class="body-1"
                    v-model="formModel.businessArea"
                    :items="businessArea"
                    clearable
                    label="Selecione o Área de Negocio"
                    prepend-icon="mdi-cash-usd-outline"
                    :filter="filterCodeDesc"
                    return-object
                    v-validate="'required'"
                    data-vv-name="typeDocument"
                    :error-messages="errors.collect('typeDocument')"
                    required
                    item-value="code"
                    item-text="description"
                  ></v-autocomplete>
                </v-col>
                <v-col>
                  <v-file-input show-size counter multiple label="Anexo"></v-file-input>
                </v-col>
              </v-row>
            </v-flex>
            <v-flex lg12>
              <template>
                <v-data-table :headers="headers" :items="formModel.details" class="elevation-1">
                  <template v-slot:top>
                    <v-toolbar flat dense color="transparent">
                      <v-toolbar-title>
                        <h3>Linhas</h3>
                      </v-toolbar-title>
                      <v-spacer></v-spacer>

                      <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on }">
                          <v-btn v-on="on">
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
                                    :items="products"
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
                                  :items="units"
                                  v-model="editedItem.unit"
                                  clearable
                                  label="Selecione o UN"
                                  item-text="description"
                                  item-value="code"
                                  required
                                  :filter="filterCodeDesc"
                                  return-object
                                ></v-autocomplete>
                                <v-col>
                                  <v-text-field
                                    type="number"
                                    v-model="editedItem.quantity"
                                    required
                                    label="Qnt."
                                  ></v-text-field>
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-col>
                                  <v-autocomplete
                                    class="body-1"
                                    :items="projects"
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
                  <!----------------------------- Edit Artigo ------------------------------------->
                  <template v-slot:item.item="props">
                    <v-edit-dialog
                      :return-value.sync="props.item.artigo"
                      @save="save"
                      @cancel="cancel"
                      @open="open"
                      @close="close"
                    >
                      {{ props.item.artigo }}
                      <template v-slot:input>
                        <v-select
                          class="body-1"
                          :items="products"
                          @input="getSelectedArtigo"
                          label="Selecione o artigo"
                          item-text="artigo"
                          return-object
                        ></v-select>
                      </template>
                    </v-edit-dialog>
                  </template>
                  <!------------------------------------------------------------------------------->
                  <template v-slot:item.action="{ item }">
                    <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
                    <v-icon small @click="deleteItem(item)">delete</v-icon>
                  </template>
                  <template v-slot:no-data>0 - Linhas Adicionadas</template>
                </v-data-table>
              </template>
            </v-flex>

          </v-card-text>

          <v-card-actions class="pb-3">
            <div class="d-flex">
              <v-switch
                label="Ao Gravar Abre Novo Documento"
                v-model="formModel.isSavingDataAndClose"
              ></v-switch>
            </div>
            <v-spacer></v-spacer>
            <v-btn color="primary" :loading="formModel.isSavingData" @click="submit(1)">Gravar</v-btn>

            <v-btn @click="clearDoc">Clear</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {

  props: {
    formModel: {
      type: Object,
      default: () => ({
        title: "Documentos Internos",
        documenttype: null,
        date: new Date().toISOString().substr(0, 10),
        referenceDoc: "",
        entityType: "U",
        entityId: null,
        businessArea: null,
        attachement: [],
        isSavingDataAndClose: false,
        isSavingData: false,
        details: []
      })
    },
    form:{
      type: Object,
      default:() => ({
        title:"Documentos Internos",
        documenttype:null,
        requiredBussinessArea: true,
        requiredExternalDocNumber:true,
        requiredAttachs:false,
        requiredProject:true,
        requiredNotes:true
      })
    }
  },
  data: () => ({
    editedItem: {},
    editedIndex: 0,
    defaultItem: {
      title: "Adiciona o Artigo",
      productId: null,
      description: null,
      unitId: null,
      quantity: 0,
      project: null,
      factor: 1,
      notes: null
    },

    dialog: false,
    dateMenu: false,

    employees: [],
    projects: [],
    businessArea: [],
    products: [],
    units: [],
    documentTypes: [],

    headers: [
      { text: "Artigo", value: "productId" },
      { text: "Descrição", value: "description" },
      { text: "UN", value: "unityId" },
      { text: "Qnt.", value: "quantity" },
      { text: "Projeto", value: "project" },
      { text: "Notas", value: "notes" }
    ]
  }),

methods: {
    changeEntity(item) {
      if (!item) {
      } else {
        var buss = item.BusinessArea.filter(d => d.isPrincipal === true);

        if (buss.length > 0) {
          this.formModel.businessArea = buss[0].businessArea;
        }
      }

      this.formModel.items = [];
    },

    clearDoc() {
      this.formModel = {
        documenttype: null,
        date: new Date().toISOString().substr(0, 10),
        referenceDoc: "",
        entityType: "Fúncionario",
        entityId: null,
        attachement: [],
        details: []
      };
    },

    requestCloseForm() {
      alert("are you sure want close this form?");
    },
    //============================================================================================================================================

    changeArticle(item) {
      if (!item) {
        this.editedItem.unity = null;
        //this.units = [];
      } else {
        //this.units = item.units;

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
      this.formModel.details.push({
        productId: this.editedItem.product.code,
        description: this.editedItem.product.description,
        quantity: this.editedItem.quantity,
        unityId: this.editedItem.unity,
        businessArea: this.formModel.businessArea,
        project: this.editedItem.project.code,
        notes: this.editedItem.notes
      });

      this.close();
    },

    //============================================================================================================================================
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
    },

    submit() {
      console.log(this.formModel)
      
      const dataToSave = {
        documenttype: this.formModel.documenttype.code,
        entityId: this.formModel.entityId.code,
        businessarea:  this.formModel.businessArea.code,
        date: this.formModel.date,
        referencedoc: this.formModel.referencedoc,
        entitytype: this.formModel.entityType.code,  
        businessArea: this.formModel.businessArea.code,
        detail: this.formModel.details,

      }
      console.log(dataToSave);
      this.formModel.isSavingData = true;
    },
    //==============================================================================================================================================
    cancel() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Canceled";
    },
    open() {
      this.snack = true;
      this.snackColor = "info";
      this.snackText = "Dialog opened";
    },

    async intData() {
      this.units = await this.$store.dispatch("getDataAsync", 'units');
      this.employees = await this.$store.dispatch("getDataAsync", 'employees')    
      this.projects = await this.$store.dispatch("getDataAsync", 'projects')  
      this.businessArea = await this.$store.dispatch("getDataAsync", 'businessArea')   
      this.products = await this.$store.dispatch("getDataAsync", 'products') 
      this.documentTypes = await this.$store.dispatch("getDataAsync", 'documenttypes')   
    }    
  },

  computed: {
    location: () => window.location
  },
  
  created() {
    this.intData()
  }
};
</script>
