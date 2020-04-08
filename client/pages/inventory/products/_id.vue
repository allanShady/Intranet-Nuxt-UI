<template>
  <v-card>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="12" md="6">
            <v-text-field v-model="productModel.id" label="Codigo"></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-autocomplete
              v-model="productModel.supplier"
              :items="product_suppliers"
              clearable
              label="Fornecedor"
              return-object
              v-validate="'required'"
              data-vv-name="productModel.supplier"
              :error-messages="errors.collect('productModel.supplier')"
              required
              item-text="name"
              item-value="code"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field v-model="productModel.description" label="Descricao"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="6">
            <v-autocomplete
              v-model="productModel.type"
              :items="product_types"
              clearable
              label="Tipo"
              return-object
              v-validate="'required'"
              data-vv-name="productModel.type"
              :error-messages="errors.collect('productModel.type')"
              required
              item-text="description"
              item-value="code"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-autocomplete
              v-model="productModel.status"
              :items="product_statuses"
              clearable
              label="Estado"
              return-object
              v-validate="'required'"
              data-vv-name="productModel.status"
              :error-messages="errors.collect('productModel.status')"
              required
              item-text="description"
              item-value="code"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="6">
            <v-text-field v-model="productModel.barcode" label="Cod. Barras"></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-text-field v-model="productModel.stock" type="number" min="0" label="Stock"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
      <v-btn color="blue darken-1" text @click="save">Gravar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  layout: "dashboard",
  data: () => ({
    menu: false,
    productModel: {},
    product_types: [],
    product_statuses: [],
    product_suppliers: []
  }),

  methods: {
    close() {
        //Check if the route comes with a param id 
        if(this.$route.params.id)
            this.$router.push(`/inventory/products`);
        else 
        {
            //Reset form
            (this.productModel.id = null),
                (this.productModel.description = null),
                (this.productModel.barcode = null),
                (this.productModel.supplier = null);
            (this.productModel.type = null),
                (this.productModel.Warehouse = null),
                (this.productModel.unit = null);
            this.productModel.stock = null;
            this.productModel.status = null;
        }
    },

    async save() {
      let post_data = {
        id: this.productModel.id,
        description: this.productModel.description,
        barcode: this.productModel.barcode,
        supplier_id: this.productModel.supplier.code,
        type: this.productModel.type.code,
        status_id: this.productModel.status.code,
        stock: this.productModel.stock
      };

      console.log("Product to Save::::", post_data);
      let created_product = await this.$store.dispatch("postDataAsync", {
        api_resourse: "products",
        post_data
      });
      
      this.close();
    },

    async initData() {
      
      if(this.$route.params.id) 
      {
        this.productModel = await this.$store.dispatch(
            "getDataAsync",
            `products/${this.$route.params.id.trim()}`
        );

        //Init model if the response is 204 - not found
        if(!this.productModel) this.productModel = {};
      }    

      this.product_types = await this.$store.dispatch(
        "getDataAsync",
        "products/types"
      );

      this.product_suppliers = await this.$store.dispatch(
        "getDataAsync",
        "products/suppliers"
      );

      console.log('The suppliers are: ', this.product_suppliers);

      this.product_statuses = await this.$store.dispatch(
        "getDataAsync",
        "products/statuses"
      );
    }
  },

  created() {
    this.initData();
  }
};
</script>
