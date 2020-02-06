<template>
  <div id="page-forms">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg6>
          <v-card class="mb-4">
            <v-toolbar color="teal" dark  dense cad>
              <v-toolbar-title class="subheading">Formulario Recolha Dados</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="">
               <obra-form></obra-form>
            </v-card-text>
          </v-card>

        </v-flex>

      </v-layout>
    </v-container>
  </div>
</template>

 <script>

   import ObraForm from '@/components/crm/project/obras/ObraForm';

   export default {
     layout: "dashboard",
    components: {
      ObraForm
    },
    data() {
      return {};
    },
    computed: {},
    methods: {}
  };
</script>
