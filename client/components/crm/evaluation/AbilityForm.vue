<template>
  <div id="ability">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg7 sm12 xs12>
          <v-card>
            <v-toolbar color="teal" dark  dense cad>
              <v-toolbar-title class="subheading">Avaliação de Habilidades</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class>
              <v-layout colum warp>
                <v-flex lg6>
                  <v-select
                    id="listEmployment"
                    :items="employments"
                    v-validate="'required'"
                    data-vv-name="employment"
                    :error-messages="errors.collect('employment')"
                    v-model="formModel.employment"
                    label="Nome do Fúncionario"
                    required
                    item-text="Name"
                    item-value="Code"
                  ></v-select>
                </v-flex>

                <v-flex lg3>
                  <v-layout row>
                  <v-flex xs4>
                    <v-subheader>Ano</v-subheader>
                  </v-flex>
                  <v-flex xs8>
                    <v-text-field
                      label="Ano de Avaliação"
                      v-model="formModel.year"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex lg7 sm12 xs12>
          <v-card>
            <v-toolbar card dense color="transparent">
              <v-toolbar-title>
                <h4>Objectivos</h4>
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>more_vert</v-icon>
              </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="pa-0">
              <template>
                <v-data-table :headers="headers" :items="todos" hide-actions class="elevation-0">
                  <template
                    slot="items"
                    slot-scope="props"
                    v-if="props.item.employ === formModel.employment && props.item.year.toString() === formModel.year.toString()"
                  >
                    <td>
                      <!-- <v-avatar size="36px">
                        <img :src="props.item.avatar" :alt="props.item.username" />
                      </v-avatar>-->
                    </td>
                    <td>{{ props.item.name }}</td>
                    <td class="text-xs-left">{{ props.item.deadline }}</td>
                    <td class="text-xs-left">
                      <v-progress-linear
                        :value="props.item.points"
                        height="5"
                        :color="props.item.color"
                      ></v-progress-linear>
                    </td>
                    <td class="text-xs-right">
                      <v-btn  icon color="grey">
                        <v-icon>edit</v-icon>
                      </v-btn>
                      <v-btn  icon color="grey">
                        <v-icon>delete</v-icon>
                      </v-btn>
                    </td>
                  </template>
                </v-data-table>
              </template>
              <v-divider></v-divider>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Employments from "@/api/rh/employments";
import { Todos } from "@/api/rh/todos";

export default {
  data: () => ({
    el: "#ability",
    headers: [
      {
        text: "",
        align: "center",
        sortable: false,
        value: "avatar"
      },
      {
        text: "Objectivo",
        align: "left",
        value: "name"
      },
      { text: "Deadline", value: "deadline" },
      { text: "Avaliação", value: "progress" },
      { text: "Acção", value: "action", align: "right" }
    ],
    formModel: {
      menu: false,
      modal: false,
      menu2: false,
      employment: null,
      time:
        new Date().getHours() +
        ":" +
        new Date().getMinutes() +
        ":" +
        new Date().getSeconds(),
      year: new Date().getFullYear()
    },
    employments: Employments,

    valid: true
  }),
  computed: {
    todos() {
      return Todos;
    }
  }
};
</script>
