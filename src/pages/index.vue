<template>
  <v-layout justify-center align-center>
    <v-flex xs12 sm8>
      <div class="mt-5">
        <div v-if="!$store.state.user">
          <login-form></login-form>
        </div>
        <div v-else class="flexWrapper align-center">
          <h4 class="blue--text">You're logged in!</h4>
          <v-btn icon class="blue white--text">
            <v-icon>thumb_up</v-icon>
          </v-btn>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import LoginForm from "@/components/auth/LoginForm";

export default {
  layout: "default",
  components: {
    LoginForm
  }
};
</script>

<style scoped>
</style>
