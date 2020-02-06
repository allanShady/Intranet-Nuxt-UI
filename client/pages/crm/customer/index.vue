<template>
  <div id="page-forms">
    <customer-form></customer-form>
  </div>
</template>

<script>
import CustomerForm from "@/components/crm/project/customer/CustomerForm";

export default {
  layout: "dashboard",
  components: {
    CustomerForm
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
