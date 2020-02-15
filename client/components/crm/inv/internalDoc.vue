<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex>
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>{{formModel.title}}</v-toolbar-title>
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
                    v-model="formModel.typeDocument"
                    :items="docTypes"
                    clearable
                    label="Tipo de documento"
                    :filter="filterCodeName"
                    return-object
                    v-validate="'required'"
                    data-vv-name="typeDocument"
                    :error-messages="errors.collect('typeDocument')"
                    required
                    item-text="name"
                    item-value="code"
                  ></v-autocomplete>
                </v-col>

                <v-col>
                  <v-text-field
                    prepend-icon="mdi-file-document-outline"
                    v-model="formModel.docNumber"
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
                    :filter="filterCodeName"
                    return-object
                    v-validate="'required'"
                    data-vv-name="typeDocument"
                    :error-messages="errors.collect('typeDocument')"
                    required
                    item-value="code"
                    item-text="name"
                  ></v-autocomplete>
                </v-col>
                <v-col>
                  <v-file-input show-size counter multiple label="Anexo"></v-file-input>
                </v-col>
              </v-row>
            </v-flex>
            <v-flex lg12>
              <template>
                <v-data-table :headers="headers" :items="formModel.items" class="elevation-1">
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
                                    :items="artigos"
                                    v-model="editedItem.article"
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
                                  :items="unitys"
                                  v-model="editedItem.unity"
                                  clearable
                                  label="Selecione o UN"
                                  item-text="name"
                                  item-value="code"
                                  required
                                  :filter="filterCodeName"
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
                          :items="artigos"
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
import { Employees } from "@/api/rh/employments";
import { Projects } from "@/api/crm/project";
import { BusinessArea } from "@/api/base/businessArea";
import { Articles } from "@/api/base/articles";
import DocTypes from "@/api/base/documents";

export default {
  data: () => ({
    formModel: {
      title: "Documentos Internos",
      typeDocument: null,
      date: new Date().toISOString().substr(0, 10),
      docNumber: "",
      typeEntity: "U",
      entity: null,
      Attachs: [],
      createdBy:'Guimarães Mahota',
      createdAt: new Date().toISOString(),
      isSavingDataAndClose: false,
      isSavingData: false,
      items: []
    },



    editedItem: {},
    editedIndex: 0,
    defaultItem: {
      title: "Adiciona o Artigo",
      article: null,
      description: null,
      unity: null,
      quantity: 0,
      project: null,
      notes: null
    },

    dialog: false,
    dateMenu: false,

    employees: Employees,
    projects: Projects,
    businessArea: BusinessArea,
    artigos: Articles,
    unitys: [],
    docTypes: DocTypes,

    headers: [
      { text: "Artigo", value: "article" },
      { text: "Descrição", value: "description" },
      { text: "UN", value: "unity" },
      { text: "Qnt.", value: "quantity" },
      { text: "Projeto", value: "project" },
      { text: "Notas", value: "notes" }
    ]
  }),
  methods: {
    changeEntity() {
      //this.formModel.items = [];
    },

    clearDoc() {
      this.formModel = {
        title: "Documentos Internos",
        typeDocument: null,
        date: new Date().toISOString().substr(0, 10),
        docNumber: "",
        typeEntity: "Fúncionario",
        entity: null,
        Attachs: [],
        items: []
      };
      //this.$validator.reset();
    },

    requestCloseForm() {
      alert("are you sure want close this form?");
    },
    //============================================================================================================================================

    changeArticle(item) {
      if (!item) {
        this.unitys = [];
      } else {
        this.unitys = item.units;
        this.editedItem.unity = item.baseUnit;
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
      this.formModel.items.push({
        article: this.editedItem.article.code,
        description: this.editedItem.article.description,
        quantity: this.editedItem.quantity,
        unity: this.editedItem.unity,
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
      console.log(this.formModel);
      this.formModel.isSavingData = true;

      // if (formModel.callerbtn == false)
      //   this.isSavingData = !this.isSavingData;
      // else if (callerbtn == 2)
      //   this.isSavingDataAndClose = !this.isSavingDataAndClose;
      // setTimeout(() => {
      //   this.isSavingData = false;
      //   this.isSavingDataAndClose = false;
      // }, 3000);
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
    }
  },

  computed: {
    location: () => window.location
  }
};
</script>
