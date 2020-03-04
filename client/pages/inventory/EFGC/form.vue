<template>
  <Document-Form></Document-Form>
</template>
<script>
import DocumentForm from "@/components/inv/Document";

export default {
  layout: "dashboard",
  middleware: 'custom-auth',
  components: {
    DocumentForm
  },
  data: () => ({

  }),
  beforeMount: async function() {

  }
}
</script>
