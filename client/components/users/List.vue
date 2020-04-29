<template>
  <v-card>
    <v-card-title>
      Utilizadores
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Pesquisar" single-line hide-details></v-text-field>
      <v-icon @click="dialog = !dialog" color="primary">mdi-plus-circle-outline</v-icon>
      <v-dialog v-model="dialog" max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
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
                    <v-text-field v-model="userModel.email" type="email" label="Email"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="6">
                    <v-text-field v-model="userModel.phone_number_1" label="Celular"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="12" md="6">
                    <v-text-field v-model="userModel.password" type="password" label="Senha"></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field v-model="userModel.confirm_password" type="password" label="Confirmar a senha"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="save">Gravar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </v-card-title>

    <v-card-text class="pa-0">
      <v-data-table
        :headers="headers"
        :items="users"
        :search="search"
        single-select
        :items-per-page="20"
        item-key="code"
        class="elevation-0"
        :loading="loading"
        loading-text="Carregando a lista dos utilizadores. Por favor aguarde"
      >
 <template v-slot:item.inactive="{ item }">
        <v-chip
          small
          :color="item.inactive ? 'error' : 'success'"
          dark
        >{{ item.inactive ? 'inactivo': 'activo' }}</v-chip>
      </template>

        <template v-slot:item.action="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>

      <v-divider></v-divider>
    </v-card-text>
  </v-card>
</template>
<script>

export default {
  data: () => ({
    search: "",
    users: [],
    userModel: {},
    dialog: false,
    formTitle: 'Criar utilizador',
    loading: false,
    headers: [

      { text: "#", value: "id" },
      { text: "Nome", value: "first_name" },
      { text: "Apelido", value: "last_name" },
      { text: "Email", value: "email" },
      { text: "Celular", value: "phone_number_1" },
      { text: "Estado", value: "inactive" },
      { text: "", value: "action", sortable: false }
    ],
  }),
  methods: {
    detailsItem(value){
      this.$router.push('/project/detail?id='+value.code)
    },
    editItem(value){

    },
    deleteItem(value){

    },

    close() {
      this.dialog = false;

      //Reset form
      this.userModel.first_name = null,
      this.userModel.last_name = null,
      this.userModel.email = null,
      this.userModel.phone_number_1 = null,
      this.userModel.password = null,
      this.userModel.confirm_password = null
    },

    async save() {
     let post_data = this.userModel;
     let created_user = await this.$store.dispatch("postDataAsync", {api_resourse: 'auth/create' , post_data})

     this.users.push({
       id: created_user.id,
       first_name: created_user.firstName,
       last_name: created_user.lastName,
       email: created_user.email,
       phone_number_1: created_user.phoneNumber1,
       inactive: false
     })

      this.close();
    },

    async initData() {
      this.loading = !this.loading;
      this.users = await this.$store.dispatch("getDataAsync", 'auth/users');
      this.loading = !this.loading;
    }
  },

  created() {
    this.initData()
  }
};
</script>
