<template>
  <v-form v-model="valid">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg6>
          <div id="intro" style="text-align:center;">
            <h1>{{ formModel.timestamp }}</h1>
          </div>


          <v-select
            :items="funcionarios"
            v-validate="'required'"
            v-if="funcionarios.CodBarras === filter || filter === ''"
            data-vv-name="funcionario"
            :error-messages="errors.collect('funcionario')"
            v-model="formModel.funcionario"
            label="Nome do Fúncionario"
            auto
            required
            item-text="Nome"
            item-value="Codigo"
          >
            
          
          </v-select>

          <v-select
            :items="projetos"
            v-validate="'required'"
            data-vv-name="projeto"
            :error-messages="errors.collect('projeto')"
            v-model="formModel.projeto"
            label="Projeto"
            auto
            required
            item-text="Descricao"
            item-value="Projeto"
          ></v-select>

          <div class="form-btn">
            <v-btn outline @click="submit" color="primary">Submit</v-btn>
            <v-btn outline @click="clear">Clear</v-btn>
          </div>
        </v-flex>
        <v-flex lg6>
          <v-time-picker
            v-model="formModel.time"
            class="mt-4"
            format="24hr"
            scrollable
            min="6:30"
            max="23:15"
            color="green lighten-1"
          ></v-time-picker>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
export default {
  props: ['filter'],

  $_veeValidate: {
    validator: "new"
  },
  data: () => ({
    formModel: {
      country: null,
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      funcionario: null,
      time:
        new Date().getHours() +
        ":" +
        new Date().getMinutes() +
        ":" +
        new Date().getSeconds(),
      projeto: null,
      timestamp: "",
      filter:''
    },
    funcionarios: [
      {
        Codigo: "001",
        Nome: "Maria João Pereira Alves",
        CodBarras: "1600108501844"
      },
      {
        Codigo: "A001",
        Nome: "Filomena Maria Cruz Rebelo",
        CodBarras: "1600102521459"
      },
      {
        Codigo: "A002",
        Nome: "João Carlos Araújo Fonseca",
        CodBarras: "1600103807354"
      },
      {
        Codigo: "A003",
        Nome: "Carla Alexandra Gomes Azevedo",
        CodBarras: "1600104700111"
      },
      {
        Codigo: "A017",
        Nome: "Filipe Manuel Marques da Silva Dias",
        CodBarras: "1600105200160"
      },
      {
        Codigo: "B001",
        Nome: "Luís Augusto Pinto Teixeira Neves",
        CodBarras: "1600105201013"
      },
      {
        Codigo: "D002",
        Nome: "Sandra Regina Queirós Azevedo Conceição",
        CodBarras: "1600152010132"
      },
      {
        Codigo: "F001",
        Nome: "Ana Cristina Leite Casaco",
        CodBarras: "1600107010330"
      },
      {
        Codigo: "F002",
        Nome: "Olga Maria Casal Melo da Cunha",
        CodBarras: "1600108501844"
      },
      {
        Codigo: "F003",
        Nome: "Ana Alexandra Valença Pinto",
        CodBarras: "1600108511324"
      }
    ],
    projetos: [
      {
        Projeto: "11",
        Descricao: "Centros de custo",
        CodBarras: "8850585992458"
      },
      { Projeto: "11001", Descricao: "Sede", CodBarras: "8850585992526" },
      {
        Projeto: "11002",
        Descricao: "Filial Av. da Liberdade",
        CodBarras: "8850585992632"
      },
      {
        Projeto: "11003",
        Descricao: "Filial Av. Central",
        CodBarras: "8850585992649"
      }
    ],

    valid: true
  }),
  created() {
    setInterval(this.getNow, 1000);

    
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);

    var pressed = false; pressed = true;
    var chars = [];

    window.addEventListener("keypress", function(e) {
      if (e.which >= 48 && e.which <= 57) {
        chars.push(String.fromCharCode(e.which));
      }
      //console.log(e.which + ":" + chars.join("|"));
      if (pressed == false) {
   
        setTimeout(function() {
          if (chars.length >= 10) {
            var barcode = chars.join("");
            console.log("Barcode Scanned: " + barcode);
            // assign value to some input (or do whatever you want)
            //$("#MainContent_txtInput").val(barcode);
            //var selected = $('#ListBoxfuncionario').find('option:selected').text();
            //var selected = $("#MainContent_ListBoxfuncionario")
            //  .find("option:selected")
            //  .val();
            
            if (selected == "") {
              getFuncionarioCodigoBarras();
            } else {
              var btn = document.getElementById("MainContent_NewFerramentaBt");
              if (btn) btn.click();
            }
          } else {
              
          }
          chars = [];
          pressed = false;
        }, 500);
        pressed = true;
      }else{
        this.filter = "1600107010330";
        console.log(this.filter);
      }
      
    });
  },
  methods: {
    submit() {
      this.$validator.validateAll();
    },
    clear() {
      this.formModel = {};
      this.$validator.reset();
    },
    getNow: function() {
      const today = new Date();
      const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      const time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date + " " + time;
      this.timestamp = dateTime;
    }
  },
  computed: {
  location: () => window.location,
}
};
</script>
