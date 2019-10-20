<template>
  <v-app id="login" class="primary">
    <register-form></register-form>
    
  </v-app>
</template>

<script>
import RegisterForm from "@/components/auth/RegisterForm";

export default {
  layout: "default",
  components: {
    RegisterForm
  }
};


  /* export default {
    layout: 'default',
    data: () => ({
      loading: false,
      model: {
        username: 'admin@example.com',
        password: 'password'
      }
    }),

    methods: {
      login() {
        this.loading = true;
        setTimeout(() => {
          this.$router.push('/dashboard');
        }, 1000);
      }
    }

  }; */
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
