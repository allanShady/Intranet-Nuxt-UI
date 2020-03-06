<template>
  <v-card>
    <v-toolbar flat color="primary" dark>
      <v-toolbar-title>Project - {{ project.code }}</v-toolbar-title>
    </v-toolbar>
    <v-tabs horizontal>
      <v-tab>
        <v-icon right>mdi-details</v-icon>General
      </v-tab>
      <v-tab>
        <v-icon right>mdi-cash-100</v-icon>Invoices
      </v-tab>
      <v-tab>
        <v-icon right>mdi-calendar-check-outline</v-icon>Appoiment
      </v-tab>
      <v-tab>
        <v-icon right>mdi-calendar-check-outline</v-icon>Tasks
      </v-tab>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-container>
              <v-layout row>
                <v-flex xs12>
                  <v-textarea
                    outlined
                    label="Summary"
                    v-model="project.summary"
                    :rules="[() => !!project.summary || 'This field is required']"
                  ></v-textarea>
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    outlined
                    label="Description"
                    v-model="project.description"
                    :rules="[() => !!project.description || 'This field is required']"
                  ></v-textarea>
                </v-flex>

                <v-flex xs6>
                  <v-text-field
                    label="State"
                    v-model="project.state"
                    :rules="[() => !!project.state || 'This field is required']"
                  ></v-text-field>
                </v-flex>

                <v-flex xs6>
                  <v-text-field
                    label="Client"
                    prepend-icon="mdi-account-box"
                    v-model="project.client.name"
                    :rules="[() => !!project.client.name || 'This field is required']"
                  ></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    label="Proponent"
                    prepend-icon="mdi-account-box"
                    v-model="project.proponent.name"
                    :rules="[() => !!project.proponent.name || 'This field is required']"
                  ></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    label="Supervisor"
                    prepend-icon="mdi-account-supervisor"
                    v-model="project.supervisor.name"
                    :rules="[() => !!project.supervisor.name || 'This field is required']"
                  ></v-text-field>
                </v-flex>

                <v-flex xs6>
                  <v-text-field
                    label="Status"
                    v-model="project.status"
                    :rules="[() => !!project.status || 'This field is required']"
                  ></v-text-field>
                </v-flex>

                <v-flex xs6>
                  <v-text-field
                    label="Type"
                    v-model="project.type"
                    :rules="[() => !!project.type || 'This field is required']"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="invoices"
              single-select
              :items-per-page="20"
              item-key="id"
              class="elevation-0"
            >
              <template v-slot:item.date="{ item }">
                <span>{{new Date(item.date).toLocaleString('pt-BR')}}</span>
              </template>

              <template v-slot:item.price="{ item }">
                <span>{{ item.price.toLocaleString('pt-BR')}}</span>
              </template>

              <template v-slot:item.status="{ item }">
                <v-chip
                  label
                  small
                  :color="getColorByStatus(item.status)"
                  text-color="white"
                >{{ item.status }}</v-chip>
              </template>

              <template v-slot:item.action="{ item }">
                <v-icon small @click="detailsItem(item)">mdi-eye</v-icon>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <v-toolbar flat dense color="transparent">
            <v-toolbar-title>
              <h4>Task's</h4>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text class="pa-0">
            <template>
              <v-data-table
                :headers="headersTask"
                :items="tasks"
                hide-default-footer
                class="elevation-0"
              >
                <template v-slot:item.avatar="{ item }">
                  <v-avatar size="36px">
                    <img :src="item.avatar" :alt="item.username" />
                  </v-avatar>
                </template>
                <template v-slot:item.name="{ item }">
                  <td>{{ item.name }}</td>
                </template>
                <template v-slot:item.date="{ item }">
                <span>{{ item.date.toLocaleString('pt-BR')}}</span>
              </template>
              <template v-slot:item.duo="{ item }">
                <span>{{ item.duo.toLocaleString('pt-BR')}}</span>
              </template>

                <template v-slot:item.deadline="{ item }">
                  <td class="text-xs-left">{{ item.deadline }}</td>
                </template>
                <template v-slot:item.progress="{ item }">
                  <v-progress-linear :value="item.progress" height="5" :color="item.color"></v-progress-linear>
                </template>
                <template v-slot:item.action>
                  <v-icon  @click="detailsItem(item)">mdi-eye</v-icon>
                </template>
              </v-data-table>
            </template>
            <v-divider></v-divider>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <v-toolbar flat dense color="transparent">
            <v-toolbar-title>
              <h4>Task's</h4>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text class="pa-0">
            <template>
              <v-data-table
                :headers="headersTask"
                :items="tasks"
                hide-default-footer
                class="elevation-0"
              >
                <template v-slot:item.avatar="{ item }">
                  <v-avatar size="36px">
                    <img :src="item.avatar" :alt="item.username" />
                  </v-avatar>
                </template>
                <template v-slot:item.name="{ item }">
                  <td>{{ item.name }}</td>
                </template>
                <template v-slot:item.date="{ item }">
                <span>{{ item.date.toLocaleString('pt-BR')}}</span>
              </template>
              <template v-slot:item.duo="{ item }">
                <span>{{ item.duo.toLocaleString('pt-BR')}}</span>
              </template>

                <template v-slot:item.deadline="{ item }">
                  <td class="text-xs-left">{{ item.deadline }}</td>
                </template>
                <template v-slot:item.progress="{ item }">
                  <v-progress-linear :value="item.progress" height="5" :color="item.color"></v-progress-linear>
                </template>
                <template v-slot:item.action>
                  <v-icon  @click="detailsItem">mdi-eye</v-icon>
                </template>
              </v-data-table>
            </template>
            <v-divider></v-divider>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import { getProjectByCode, getProjectInvoices,getProjectTasks } from "@/api/crm/project";

export default {
  data: () => ({
    project: null,
    invoices: [{}],
    tasks:[{}],
    headers: [
      { text: "Document", value: "id" },
      { text: "Summary", value: "summary" },
      { text: "Date", value: "date" },
      { text: "Price", value: "price" },
      { text: "Status", value: "status" },
      { text: "Actions", value: "action", sortable: false }
    ],
    headersTask: [
       {
          text: '',
          align: 'center',
          sortable: false,
          value: 'avatar'
        },
        {
          text: 'Name',
          align: 'left',
          value: 'name'
        },
        { text: "Date", value: "date" },
        { text: "Duo", value: "duo" },
        { text: 'Deadline', value: 'deadline' },
        { text: 'Type', value: 'type' },
        { text: 'status', value: 'status' },
        { text: 'Progress', value: 'progress' },
        { text: 'Action', value: 'action', align: 'center' }
    ],
    colors: {
      pedding: "blue",
      advance: "red",
      paid: "green"
    }
  }),
  created() {
    let proj = getProjectByCode(this.$router.currentRoute.query["id"]);

    this.project = proj;

    let inv = getProjectInvoices(proj.code);
    this.invoices = inv;

    let tas = getProjectTasks(proj.code);
    this.tasks = tas;
  },
  methods: {
    getColorByStatus(status) {
      return this.colors[status];
    },
    detailsItem(value){

    }
  }
};
</script>
