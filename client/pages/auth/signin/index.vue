<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img src="~/static/logo2.png" alt="Vue Material Admin">
                  <p class="primary--text">Inicie a sessão com a sua conta</p>
                </div>
                <v-form>
                  <v-text-field append-icon="person" name="login" label="Email" placeholder="seu@email.com" type="text"
                                v-model="model.email"></v-text-field>
                  <v-text-field append-icon="lock" name="password" label="Senha" id="password" placeholder="senha"  type="password"
                                v-model="model.password"></v-text-field>
                
                  <span style="cursor: pointer; color: #3366BB" class="caption" @click="requestPasswordReset">Esqueci a senha</span>
                  <p v-show="signInSuccess()">
                    <v-icon small color="warning" class="text-xs-center">warning</v-icon>
                  <span class="body-1 red--text" color="red">Email ou senha inválido!</span>                  
                  </p>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn block color="primary" small @click="login" :loading="loading">Autenticar</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    layout: 'default',
    data: () => ({
      loading: false,
      model: {
        email: '',
        password: ''
      }
    }),

    methods: {
      async login() {
        this.loading = true;

        await this.$store.dispatch("authenticateUser", {
        email: this.model.email,
        password: this.model.password
      })
      .then(()=> {

        this.loading = false;
      })
      .catch( error => console.log(error));        
      },

    requestPasswordReset() {
        this.$store.dispatch("requestPasswordReset");
        this.$router.push('/auth/forgetpassword');
    },

    signInSuccess() {
      return this.$store.getters.loginErrorMsg;
    }
    }
  };
</script>
<style scoped lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>
