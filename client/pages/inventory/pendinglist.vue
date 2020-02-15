<template>
  <div id="page-forms">
    <Pending-List></Pending-List>
  </div>
</template>
<script>
import PendingList from "@/components/crm/inv/PendingList";

export default {
  layout: "dashboard",
  components: {
    PendingList
  },
  data() {
    return {
      menu: false
    };
  }
};
</script>
