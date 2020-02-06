<template>
  <div id="page-forms">
    <appoiment-form></appoiment-form>
  </div>
</template>

<script>
import AppoimentForm from "@/components/appointment/AppointmentScheduler";

export default {
  layout: "dashboard",
  components: {
    AppoimentForm
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