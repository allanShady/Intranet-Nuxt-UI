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
              <HeaderDocument-Form v-bind:form="form" v-bind:formModel="formModel"></HeaderDocument-Form>
            </v-flex>
            <v-flex lg12>
              <LinesDocument-Form v-bind:form="form" v-bind:formModel="formModel"></LinesDocument-Form>
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
import LinesDocumentForm from "@/components/inv/LinesDocument";
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
        documenttype: null,
        date: new Date().toISOString().substr(0, 10),
        referenceDoc: "",
        typeEntity: "U",
        entity: null,
        businessArea: null,
        attachement: [],
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
        unitys: [],
        rulesQuantity: {
          required: value => !!value || "Required.",
          loanMin: value => value >= 0 || "Quantidade não pode ser menor de 0",
          loanMax: value => value <= 50000 || "Quantidade não pode ser menor de 50000"
        }
      })
    }
  },
  data: () => ({

  }),
  beforeMount: async function() {
    let doc = this.$router.currentRoute.query["doc"];
    let classifier = this.$router.currentRoute.query["tipo"];

    this.form.employees = await this.$store.dispatch(
      "getDataAsync",
      "employees"
    );
    this.form.businessArea = await this.$store.dispatch(
      "getDataAsync",
      "businessArea"
    );
    this.form.projects = await this.$store.dispatch("getDataAsync", "projects");

    this.form.docTypes = await this.$store.dispatch(
      "getDataAsync",
      "documenttypes"
    );
    this.form.docTypes = this.form.docTypes.filter(p => p.code == doc);

    this.formModel.documenttype = this.form.docTypes[0];
    this.form.isSelectedProduct = this.form.docTypes[0].isSelectedProduct;
    this.form.canAddProduct = this.form.docTypes[0].isSelectedProduct;

    this.form.unitys = await this.$store.dispatch("getDataAsync", "units");
  },
  methods: {
    async redirectDashboard() {
      let doc = this.$router.currentRoute.query["doc"];
      let classifier = this.$router.currentRoute.query["tipo"];

      var url = `/inventory/EFGC/Dashboard?id=${classifier}`;

      this.$router.push(url);
    },

    async clearDoc() {
      this.formModel = {
        documenttype: this.formModel.documenttype ,
        date: new Date().toISOString().substr(0, 10),
        referenceDoc: "",
        typeEntity: "U",
        entity: null,
        businessArea: null,
        attachement: [],
        createdBy: "Guimarães Mahota",
        createdAt: new Date().toISOString(),
        isSavingDataAndClose: false,
        isSavingData: false,
        items: []
      };
    },

    requestCloseForm() {
      alert("are you sure want close this form?");

      this.redirectDashboard();
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
    },

    async submit() {
      let details = [];

      let typeArticle = this.formModel.documenttype.typeArticle;

      if (this.formModel.documenttype.type == "E") {
        details = this.formModel.selected;
      } else {
        details = this.formModel.items;
      }

      const post_data = {
        from_warehouse_id: null,
        document_type_id: this.formModel.documenttype.code,
        entity_id: !this.formModel.entity?null: this.formModel.entity.code,
        entity_name: !this.formModel.entity? null:this.formModel.entity.name ,
        business_area_id: !this.formModel.businessArea? null:this.formModel.businessArea.code,
        date: this.formModel.date,
        reference_doc: this.formModel.referenceDoc,
        entity_type: this.formModel.typeEntity || null,
        attachement: this.formModel.attachement.length || "note attached any doc",
        details: this.formModel.items
      };

      this.formModel.isSavingData = true;

      console.log(post_data);

      await this.$store
        .dispatch("postDataAsync", { api_resourse: "stocks", post_data })
        .then(response => {
          this.formModel.isSavingData = !this.formModel.isSavingData;
          alert("Documento Gravado - com Sucesso");

          if (this.isSavingDataAndClose == true) {
            this.redirectDashboard();
          } else {
            this.clearDoc();
          }
        })
        .catch(error => {
          console.log("Error on the component");
          console.log(error);
          alert("Ocorreu um erro durante a gração do documento");
        });
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
