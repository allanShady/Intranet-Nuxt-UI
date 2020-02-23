<template>
  <div id="page-forms">
    <Document-Form v-bind:form = form></Document-Form>
  </div>
</template>

<script>
import DocumentForm from "@/components/inv/Document";

export default {
  layout: "dashboard",
  components: {
    DocumentForm
  },


  data() {
    return {
      form: {
        title: "Entrega de Ferramentas",
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

    },
      menu: false
    };
  },
  created(){

  }
};
</script>
