<template>
  <v-data-table
    :headers="headers"
    :items="documents"
    v-model="selected"
    item-key="product_id"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat dense color="transparent">
        <v-toolbar-title>
          <h3>Documentos</h3>
        </v-toolbar-title>

        <v-spacer></v-spacer>
      </v-toolbar>
    </template>

    <template v-slot:no-data>0 - Linhas Em Inventario</template>
  </v-data-table>
</template>
<script>
export default {
  data: () => ({
    selected: [],
    isSelected: true,
    documents: [],
    headers: [
      {
        text: "#",
        align: "left",
        sortable: false,
        value: "doc_number"
      },
      { text: "Documento", value: "document_type.description" },
      { text: "Funcionario", value: "entity.name" },
      { text: "A. Negocio", value: "business_area.description" },
      { text: "Nr. Guia", value: "reference_doc" },
      { text: "Data", value: "date" },
      { text: "Anexo", value: "attachement" },
      { text: "Estado", value: "status" }
    ]
  }),

  methods: {
    async initComponent() {
        //Init list of documents
        this.documents = await this.$store.dispatch(
        "getDataAsync",
        "stocks"
        );

        console.log(this.documents);      
    },

    async redirectToViewSingleDocument(documentId) {

    }
  },

  created() {
    this.initComponent()
  }
};
</script>
