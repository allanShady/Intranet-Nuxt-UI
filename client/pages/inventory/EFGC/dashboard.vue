<template>
  <dashboard></dashboard>
</template>
<script>
import dashboard from "@/components/inv/Dashboard";

export default {
  layout: "inventory",
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
