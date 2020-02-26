<template>
  <v-layout>
    <v-row>
      <v-btn-toggle>
        <v-bottom-navigation
    color="primary"
    horizontal>
          <v-btn v-for="document in documentTypes" :key="document.code" @click="openFrm(document)">
              <span>{{document.code}}</span>
              <v-icon>{{document.icon}}</v-icon>
          </v-btn>
        </v-bottom-navigation>
      </v-btn-toggle>
    </v-row>
  </v-layout>
</template>
<script>
export default {
  data: () => ({
    documentTypes: [],
    classifier:null,
  }),
  beforeMount: async function() {
    let doc = this.$router.currentRoute.query["id"];

    this.documentTypes = await this.$store.dispatch(
      "getDataAsync",
      "documenttypes/" + doc
    );

    this.classifier = doc;
  },
  methods: {
    openFrm(item) {

      var url = `/inventory/EFGC/Form?doc=${item.code}&tipo =${this.classifier}`;

      this.$router.push(url);

    }
  }
};
</script>
