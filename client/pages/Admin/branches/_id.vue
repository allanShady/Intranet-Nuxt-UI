<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ $route.params.id == 'create' ? 'Criar filial' : 'Editar filial' }}</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="12" md="6">
            <v-text-field v-model="branch.code" label="Filial"></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-text-field v-model="branch.description" label="Descrição"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="6">
            <v-text-field v-model="branch.address1" type="text" label="Morada 1"></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-text-field v-model="branch.address2" label="Morada 2"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="6">
            <v-text-field v-model="branch.city" type="text" label="Cidade"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field v-model="branch.state" type="text" label="Estado"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field v-model="branch.country" type="text" label="Pais"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="warning" @click="close">Cancelar</v-btn>
      <v-btn color="success" :loading="onSave" @click="save">Gravar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  layout: "dashboard",
  data() {
    return {
      branch: {},
      onSave: false,
      isUpdate: false,
    };
  },

  async created() {

    const branchIdentifier = this.$route.params.id.trim().toLowerCase();
    if( branchIdentifier !== 'create') 
      {
        this.branch = await this.$store.dispatch(
            "getDataAsync",
            `branch/${branchIdentifier}`
        );

        this.isUpdate = true;
    }
  },

  methods: {
    async save() {
      let post_data = this.branch;

     this.onSave = true

     if(this.isUpdate);
     else
      await this.$store.dispatch("postDataAsync", {
        api_resourse: "branch",
        post_data
      });

      this.onSave = false;
      this.clearValues();
    },

    clearValues(){
        this.branch.code = null;
        this.branch.description = null;
        this.branch.address1 = null;
        this.branch.address2 = null;
        this.branch.city = null;
        this.branch.state = null;
        this.branch.country = null;
        this.isUpdate = false;
    },

    close() {
        const previousPath = this.$route.path.slice(0, this.$route.path.lastIndexOf('/')) 
        this.$router.push(previousPath)
    }    
  }
};
</script>

<style>
</style>