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
              <HeaderDocument-Form v-bind:form = form v-bind:formModel =formModel ></HeaderDocument-Form>
            </v-flex>
            <v-flex lg12>
              <LinesDocument-Form v-bind:form = form v-bind:formModel =formModel></LinesDocument-Form>
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
import { getEmployees } from "@/api/base/employe";
import { getProjects } from "@/api/base/project";
import { getBusinessArea } from "@/api/base/businessArea";
import { getProducts } from "@/api/base/productServices";
import { getUnities } from "@/api/base/unities";
import DocTypes from "@/api/base/documents";
import LinesDocumentForm from "@/components/inv/LinesDevolution";
import HeaderDocumentForm from "@/components/inv/HeaderDocument";

export default {
  components: {
    LinesDocumentForm,
    HeaderDocumentForm
  },
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
        requiredNotes: true
      })
    }
  },
  data: () => ({
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

    employees: [],
    projects: [],
    businessArea: [],
    articles: [],
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
  beforeMount: async function() {
    this.articles = await getProducts(this.$axios);
    this.unitys = await getUnities();
    this.employees = await getEmployees();
    this.businessArea = await getBusinessArea();
    this.projects = await getProjects();
  },
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
        title: "Documentos Internos",
        typeDocument: null,
        date: new Date().toISOString().substr(0, 10),
        docNumber: "",
        typeEntity: "Fúncionario",
        entity: null,
        Attachs: [],
        items: []
      };
    },

    requestCloseForm() {
      alert("are you sure want close this form?");
    },
    //============================================================================================================================================

    changeArticle(item) {
      if (!item) {
        this.editedItem.unity = null;
        //this.unitys = [];
      } else {
        //this.unitys = item.units;

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
