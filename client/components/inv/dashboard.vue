<template>
  <v-card></v-card>
</template>
<script>
import { getTypeDocuments } from "@/api/base/typeDocuments";

export default {

  data: () => ({
    docTypes: []
  }),
  beforeMount: async function() {
    let doc = this.$router.currentRoute.query["id"];
    console.log(doc);
    this.docTypes = await getTypeDocuments(doc);
    console.log(this.docTypes);
  }
};
</script>
