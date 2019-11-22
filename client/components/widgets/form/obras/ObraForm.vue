<template>
  <v-form v-model="valid">
    <v-container grid-list-xl fluid id="watch-example">
      <v-layout row wrap>
        <v-flex lg6>
          
          <v-text-field  type="text" id ="barcode" v-model="scan1"
            label="Codigo de Barras"
             @input="someHandler" 
             @change="someHandler" 
             v-on:keypress="keymonitor"
             ></v-text-field> 

          <input  type="text" id ="funcBarcode" v-model="funcScan" hidden="hidden"/>

          <input  type="text" id ="projetoBarcode" v-model="projetoScan" hidden="hidden"/>

          <v-select
            id= "listFuncionario"
            :items="funcionarios"
            v-validate="'required'"
            v-if="funcionarios.Codigo === filter || filter === ''"
            data-vv-name="funcionario"
            :error-messages="errors.collect('funcionario')"
            v-model="formModel.funcionario"
            label="Nome do Fúncionario"
            
            required
            item-text="Nome"
            item-value="Codigo"
          >
            
          
          </v-select>

          <v-select
            id= "listProjetos"
            :items="projetos"
            v-validate="'required'"
            data-vv-name="projeto"
            :error-messages="errors.collect('projeto')"
            v-model="formModel.projeto"
            label="Projeto"
            
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

import Funcionarios from '@/api/obra/funcionarios';
import Projetos from '@/api/obra/projetos';

export default {
  props: ['filter'],

  $_veeValidate: {
    validator: "new"
  },
  data: () => ({
    el: '#watch-example',
    scan1: "",
    funcScan: "",
    projetoScan: "",
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
    funcionarios: Funcionarios,
    projetos: Projetos,

    valid: true
  }),
  created() {
    setInterval(this.getNow, 1000);
    
    
    
  },
watch: {

  // sempre que a pergunta mudar, essa função será executada
    scan1: function (scan1New,scan1Old) {

      var pressed = false; 
      var chars = [];
      
      if (pressed == false) {

        var barcode = scan1New;
        
        if(barcode.length >  10){

            var func = Funcionarios.filter(d => d.CodBarras === barcode);
            
            if(func.length > 0){

              this.funcScan = func[0].Codigo;
              this.scan1="";   
              
            }

            var proj = Projetos.filter(d => d.CodBarras === barcode);
            
            if(proj.length > 0){

              this.projetoScan = proj[0].Projeto;
              this.scan1="";   
              
            }
            
        }else{

        }
        chars = [];
        
      }      
    },
    // sempre que a pergunta mudar, essa função será executada
    funcScan: function () {

      this.formModel.funcionario =this.funcScan; 
      this.scan1="";   
    },
    // sempre que a pergunta mudar, essa função será executada
    projetoScan: function () {
      this.formModel.projeto =this.projetoScan; 
      this.scan1="";   
    }
  },

  mounted() {
    this.$validator.localize("en", this.dictionary);

    var pressed = false; 
    var chars = [];

    /* window.addEventListener("keypress", function(e) {
      if (e.which >= 48 && e.which <= 57) {
        chars.push(String.fromCharCode(e.which));
      }

      if (pressed == false) {
   
        setTimeout(function() {
          if (chars.length >= 10) {
            var barcode = chars.join("");
            console.log("Barcode Scanned: " + barcode);
            
              var func = Funcionarios.filter(d => d.CodBarras === barcode);
            
            if(func.length > 0){
              //this.funcBarcode.value = func[0].Codigo;
              
              document.querySelector("#funcBarcode").innerHTML = func[0].Codigo;
              //this.$forceUpdate();

            }
          } else {
              
          }
          chars = [];

          
          //pressed = false;
        }, 500);
        //pressed = true;
      }
      
    }); */
    
  },
  methods: {
    submit() {
      this.$validator.validateAll();
    },
    clear() {
      this.formModel = {};
      this.$validator.reset();
    },
    someHandler: function(evt){
      
    },
    keymonitor: function(e) {

    }
  },
  computed: {
  location: () => window.location,
  
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
}
};
</script>
