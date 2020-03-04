<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img src="~/static/m.png" alt="Vue Material Admin" width="120" height="120" />
                  <h1 class="flex my-4 primary--text">Belutécnica</h1>
                </div>
                <v-form>
                  <v-text-field
                    append-icon="email"
                    name="login"
                    label="Enter your email"
                    placeholder="youremail@domain.com"
                    type="text"
                    v-model="model.email"
                  ></v-text-field>

                  <p v-show="signInSuccess()">
                    <v-icon small color="warning" class="text-xs-center">warning</v-icon>
                    <span class="body-1 red--text" color="red">Invalid Email address!</span>
                  </p>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn block color="primary" @click="requestPassordReset" :loading="loading">Request password reset</v-btn>
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
  layout: "default",
  data: () => ({
    loading: false,
    model: { email: "" }
  }),

  methods: {
    async requestPassordReset() {
      this.loading = true;

      await this.$store
        .dispatch("requestPassordReset", {
          email: this.model.email,
        })
        .then(() => {
          this.loading = false;
        })
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
