<template>
  <div id="page-forms">
    <Document-Form></Document-Form>
  </div>
</template>

<script>
import DocumentForm from "@/components/crm/inv/Document";

export default {
  layout: "dashboard",
  components: {
    DocumentForm
  },
  data() {
    return {
      menu: false
    };
  }
};
</script>
