<template>
  <v-card>
    <v-card-text class="pa-0">

        <v-data-table :headers="headers" :items="items" class="elevation-0">
          <template v-slot:item.progress="{ item }">
            <v-progress-linear :value="item.progress" height="5" :color="item.color"></v-progress-linear>

          </template>

          <template v-slot:item.action="{ item }">
            <v-btn  icon color="grey">
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn  icon color="grey">
                <v-icon>delete</v-icon>
              </v-btn>
          </template>
        </v-data-table>

      <v-divider></v-divider>
    </v-card-text>
  </v-card>
</template>
<script>
import Projects from "@/api/crm/project";

export default {
  data: () => ({
    headers: [
      { text: "Project", value: "code" },
      { text: "Description", value: "description" },
      { text: "Client", value: "client.name" },
      { text: "Dead Line", value: "deadline" },
      { text: "Progress", value: "progress" },
      { text: "Status", value: "status" },
      { text: "Supervisor", value: "supervisor.name" },
      { text: "Actions", value: "action", sortable: false }
    ],
    items: Projects
  })
};
</script>
