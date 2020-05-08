<template>
  <v-card>
    <v-card-title>
      <span
        class="headline"
      >{{ $route.params.id == 'create' ? 'Criar utilizador' : 'Editar utilizador' }}</span>
    </v-card-title>

    <v-card-text>
      <v-container md8>
        <v-row>
          <v-col cols="12" sm="12" md="6">
            <v-text-field v-model="userModel.first_name" label="Nome"></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-text-field v-model="userModel.last_name" label="Apelido"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="6">
            <v-text-field :disabled="isUpdate" v-model="userModel.email" type="email" label="Email"></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-text-field v-model="userModel.phone_number_1" label="Celular"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col v-if="displayPassworFields" cols="12" sm="12" md="3">
            <v-text-field v-model="userModel.password" type="password" label="Senha"></v-text-field>
          </v-col>
          <v-col v-if="displayPassworFields" md="3">
            <v-text-field
              v-model="userModel.confirm_password"
              type="password"
              label="Confirmar a senha"
            ></v-text-field>
          </v-col>
          <v-col md="1">
            <v-checkbox label="Activo" v-model="userModel.inactive"></v-checkbox>
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
      userModel: { inactive: true },
      onSave: false,
      isUpdate: null,
      displayPassworFields: null
    };
  },

  async created() {
    const userIdentifier = this.$route.params.id.trim().toLowerCase();
    if (userIdentifier !== "create") {
      this.userModel = await this.$store.dispatch(
        "getDataAsync",
        `auth/users/${userIdentifier}`
      );

      if(this.userModel) {
        this.isUpdate = true;
        this.userModel.inactive = !this.userModel.inactive
      }          
    }
    else {
     this.displayPassworFields = true
     }
  },

  methods: {
    async save() {
      let post_data = this.userModel;
      
      this.onSave = true;

      if (this.isUpdate) {
      
        post_data.inactive = !this.userModel.inactive
        await this.$store.dispatch("putDataAsync", {
          api_resourse: "auth/users",
          identifier: this.$route.params.id,
          post_data
        });
        
      }
      else
        await this.$store.dispatch("postDataAsync", {
          api_resourse: "auth/create",
          post_data
        });

      this.onSave = false;
      this.clearValues();
    },

    clearValues() {
      //Reset form
      (this.userModel.first_name = null),
        (this.userModel.last_name = null),
        (this.userModel.email = null),
        (this.userModel.phone_number_1 = null),
        (this.userModel.password = null),
        (this.userModel.confirm_password = null);
        this.userModel.inactive = true
      
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