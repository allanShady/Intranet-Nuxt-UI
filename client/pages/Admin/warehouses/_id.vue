<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ $route.params.id == 'create' ? 'Criar armazén' : 'Editar armazén' }}</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="12" md="6">
            <v-text-field v-model="warehouse.code" label="Armazén"></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-text-field v-model="warehouse.description" label="Descrição"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="6">
            <v-text-field v-model="warehouse.address1" type="text" label="Morada 1"></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-text-field v-model="warehouse.address2" label="Morada 2"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="6">
            <v-text-field v-model="warehouse.city" type="text" label="Cidade"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field v-model="warehouse.state" type="text" label="Distrito"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field v-model="warehouse.country" type="text" label="Pais"></v-text-field>
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
      warehouse: {},
      onSave: false,
      isUpdate: false,
    };
  },

  async created() {

    const warehouseIdentifier = this.$route.params.id.trim().toLowerCase();
    if( warehouseIdentifier !== 'create') 
      {
        this.warehouse = await this.$store.dispatch(
            "getDataAsync",
            `warehouse/${warehouseIdentifier}`
        );

        this.isUpdate = true;
    }
  },

  methods: {
    async save() {
      let post_data = this.warehouse;

     this.onSave = true

     if(this.isUpdate);
     else
      await this.$store.dispatch("postDataAsync", {
        api_resourse: "warehouse",
        post_data
      });

      this.onSave = false;
      this.clearValues();
    },

    clearValues(){
        this.warehouse.code = null;
        this.warehouse.description = null;
        this.warehouse.address1 = null;
        this.warehouse.address2 = null;
        this.warehouse.city = null;
        this.warehouse.state = null;
        this.warehouse.country = null;
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