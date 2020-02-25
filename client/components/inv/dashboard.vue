<template>
  <v-card></v-card>
</template>
<script>

export default {

  data: () => ({
    documentTypes: []
  }),
  beforeMount: async function() {
    let doc = this.$router.currentRoute.query["id"];
    console.log(doc);
    this.documentTypes = await this.$store.dispatch("getDataAsync", 'documenttypes')


    console.log(this.docTypes);
  }
};
</script>
