<template>
  <v-card>
    <v-card-title>
      Artigos
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="mdi-magnify" label="Pesquisar"  single-line hide-details></v-text-field>
      <v-icon color="primary" @click="createNewProduct()">add</v-icon>
    </v-card-title>

    <v-card-text class="pa-0">
      <v-data-table
        :headers="headers"
        :items="products"
        :search="search"
        single-select
        :items-per-page="20"
        item-key="code"
        class="elevation-0"
        :loading="loading"
        loading-text="Loading products. Please wait"
      >
        <template v-slot:item.progress="{ item }">
          <v-progress-linear :value="item.progress" height="5" :color="item.color"></v-progress-linear>
        </template>

        <template v-slot:item.action="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>

      <v-divider></v-divider>
    </v-card-text>
  </v-card>
</template>
<script>
import {mapGetters} from 'vuex';

export default {
  data: () => ({
    search: "",
    products: [],
    product_types: [],
    search_product: '',
    product_statuses: [],
    product_suppliers: [],
    productModel: {},
    dialog: false,
    formTitle: "Criar Artigo",
    loading: false,
    headers: [
      { text: "Codigo", value: "id" },
      { text: "Descrição", value: "description" },
      { text: "Cod. barras", value: "barcode" },
      { text: "Tipo", value: "Type.description" },
      { text: "Estado", value: "status.description" },
      { text: "Fornecedor", value: "supplier.name" },
      //{ text: "Stock", value: "stock" },
      { text: "", value: "action", sortable: false }
    ]
  }),

  methods: {
    detailsItem(value) {},

    editItem(value) {
      this.$router.push(`/inventory/products/${value.id}`);
    },

    deleteItem(value) {},

    close() {
      this.dialog = false;

      //Reset form
      (this.productModel.id = null),
        (this.productModel.description = null),
        (this.productModel.barcode = null),
        (this.productModel.supplier = null);
        (this.productModel.type = null),
        (this.productModel.Warehouse = null),
        (this.productModel.unit = null);
        (this.productModel.stock = null);
        (this.productModel.status = null);
    },

    //Redirect to the form to create new product
    createNewProduct() {
      this.$router.push(`/inventory/products/new`);
    },

    async save() {
      let post_data = {
        id: this.productModel.id,
        description: this.productModel.description,
        barcode: this.productModel.barcode,
        supplier_id: this.productModel.supplier.code || null,
        type: this.productModel.type.code || null,
        status_id: this.productModel.status.id,
        stock: this.productModel.stock,
      };

      let created_product = await this.$store.dispatch("postDataAsync", {
        api_resourse: "products",
        post_data
      });

      console.log(created_product)

      this.products.push(created_product);

      this.close();
    },

    async initData() {
      this.loading = !this.loading;
       this.$store.dispatch("getDataAsync", "products")
      .then((result) => {         
          this.products  = result     
      }).catch((err) => {
        
      });;
      this.loading = !this.loading;

      this.product_types = await this.$store.dispatch(
        "getDataAsync",
        "products/types"
      );
      this.product_suppliers = await this.$store.dispatch(
        "getDataAsync",
        "products/suppliers"
      );
      this.product_statuses = await this.$store.dispatch(
        "getDataAsync",
        "products/statuses"
      );
    }
  },

  async created() {
    await this.initData();
    console.log('Product pagination: ', this.productPagination)
  },

  computed: {
    ...mapGetters(['productPagination'])
  },

  watch: {
    async search_product (search_term) {
      this.products = await this.$store.dispatch(
          "getDataAsync",
          `products/filters?code=${search_term}`
        );
    }
  }
};
</script>
