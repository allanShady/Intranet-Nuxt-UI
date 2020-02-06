<template>
  <div id="page-forms">
    <ability-form></ability-form>

  </div>
</template>

<script>

   import AbilityForm from '@/components/crm/rh/evaluation/AbilityForm';

  export default {
    layout: "dashboard",
    components: {
      AbilityForm
    },
    data() {
      return {};
    },
    computed: {},
    methods: {}
  };
</script>
