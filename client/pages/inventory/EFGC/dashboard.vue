<template>
  <dashboard></dashboard>
</template>
<script>
import dashboard from "@/components/inv/Dashboard";

export default {
  layout: "dashboard",
  components: {
    dashboard
  },
  data() {
    return {
      menu: false
    };
  }
};
</script>
