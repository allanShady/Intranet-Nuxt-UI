<template>
  <div id="page-forms">
    <InternalDoc-Form></InternalDoc-Form>
  </div>
</template>

<script>
import InternalDocForm from "@/components/crm/inv/internalDoc";

export default {
  layout: "dashboard",
  components: {
    InternalDocForm
  },
  data() {
    return {
      menu: false
    };
  },
  computed: {},
  methods: {}
};
</script>
