<template>
  <v-card max-width="90%">
    <v-card-title>
      <span
        class="headline"
      >{{ $route.params.id == 'create' ? 'Criar localização' : 'Editar localização' }}</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="12" md="3">
            <v-text-field :disabled="isUpdate"
              prepend-icon="mdi mdi-map-marker"
              v-model="location.code"
              label="Localização"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="9">
            <v-text-field v-model="location.description" label="Descrição"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="3">
            <v-autocomplete
              prepend-icon="mdi-warehouse"
              v-model="location.warehouseId"
              :items="warehouses"
              label="Armazén"
              item-text="description"
              item-value="code"
              return-object
              :loading="loadingWarehouses"
            ></v-autocomplete>
          </v-col>
          <v-col md="2">
            <v-checkbox label="Activo" v-model="location.active"></v-checkbox>
          </v-col>
          <v-col md="2">
            <v-checkbox label="Anual" v-model="location.anual"></v-checkbox>
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
      location: { active: true },
      onSave: false,
      isUpdate: false,
      warehouses: [],
      loadingWarehouses: false
    };
  },

  async created() {
    const locationIdentifier = this.$route.params.id.trim().toLowerCase();
    if (locationIdentifier !== "create") {
      this.location = await this.$store.dispatch(
        "getDataAsync",
        `locations/${locationIdentifier}`
      );

      if (this.location) this.isUpdate = true;
    }

    await this.loadWarehouses();
  },

  methods: {
    async save() {
      let post_data = this.location;
      post_data.warehouseId =
        this.location.warehouseId.code || this.location.warehouseId;

      this.onSave = true;

      if (this.isUpdate)
        await this.$store.dispatch("putDataAsync", {
          api_resourse: "locations",
          identifier: this.location.code,
          post_data
        });
      else
        await this.$store.dispatch("postDataAsync", {
          api_resourse: "locations",
          post_data
        });

      this.pauseLoaderIndicatorAndClearValues();
    },

    pauseLoaderIndicatorAndClearValues() {
      this.onSave = false;
      this.clearValues();
    },

    async loadWarehouses() {
      this.loadingWarehouses = true;
      this.warehouses = await this.$store.dispatch("getDataAsync", "warehouse");
      this.loadingWarehouses = false;
    },

    clearValues() {
      this.location.code = null;
      this.location.description = null;
      this.location.active = null;
      this.location.anual = null;
      this.location.warehouseId = null;
      this.isUpdate = false;
    },

    close() {
      const previousPath = this.$route.path.slice(
        0,
        this.$route.path.lastIndexOf("/")
      );
      this.$router.push(previousPath);
    }
  }
};
</script>

<style>
</style>