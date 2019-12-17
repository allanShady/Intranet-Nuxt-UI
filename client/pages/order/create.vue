<template>
  <div id="page-forms">
    <order-form></order-form>
  </div>
</template>

<script>
import OrderForm from "@/components/widgets/form/orders/order";
export default {
  layout: "dashboard",
  components: {
    OrderForm
  },
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>