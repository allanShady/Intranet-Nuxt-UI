<template>
  <Statement-Form></Statement-Form>
</template>

<script>
import StatementForm from "@/components/inv/Statement";

export default {
  layout: "inventory",
  middleware: "custom-auth",
  components: {
    StatementForm
  },
  data: () => ({}),
  beforeMount: async function() {}
};
</script>
