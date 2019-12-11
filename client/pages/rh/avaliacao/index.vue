<template>
  <div id="page-forms">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg6>
          <v-card class="mb-4">
            <v-toolbar color="teal" dark flat dense cad>
              <v-toolbar-title class="subheading">Avaliação de Habilidades</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="">
              <ability-form></ability-form> 
            </v-card-text>
          </v-card>
         
        </v-flex>
        
      </v-layout>
    </v-container>
  </div>
</template>

<script>

   import AbilityForm from '@/components/widgets/form/rh/evaluation/AbilityForm';

  export default {
    layout: "rh",
    components: {
      AbilityForm
    },
    data() {
      return {};
    },
    computed: {},
    methods: {}
  }; 
</script>
