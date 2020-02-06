<template>
  <v-card ref="form">
    <v-card-text>
    <v-text-field
        label="Codigo"
        placeholder="Codigo do Cliente"
        v-model="customer.code"
        required
        ref="customer.code"
        :rules="[() => !!customer.code || 'This field is required']"
        :error-messages="errorMessages"
      ></v-text-field>
      <v-text-field
        label="Nome"
        placeholder="Nome do Cliente"
        v-model="customer.name"
        required
        ref="customer.name"
        :rules="[() => !!customer.name || 'This field is required']"
        :error-messages="errorMessages"
      ></v-text-field>
      <v-text-field
        label="Address Line"
        placeholder="Snowy Rock Pl"
        :rules="[
          () => !!customer.address || 'This field is required',
          () => !!customer.address && customer.address.length <= 25 || 'Address must be less than 25 characters',
          addressCheck
        ]"
        v-model="customer.address"
        ref="customer.address"
        counter="25"
        required
      ></v-text-field>
      <v-text-field
        label="City"
        placeholder="El Paso"
        :rules="[() => !!customer.city || 'This field is required', addressCheck]"
        v-model="customer.city"
        ref="customer.city"
        required
      ></v-text-field>
      <v-text-field
        label="State/Province/Region"
        v-model="customer.state"
        :rules="[() => !!customer.state || 'This field is required']"
        required
        ref="customer.state"
        placeholder="TX"
      ></v-text-field>
      <v-select
        autocomplete
        label="Country"
        placeholder="Select..."
        :rules="[() => !!country || 'This field is required']"
        :items="countries"
        v-model="customer.country"
        ref="country"
        required
      ></v-select>
    </v-card-text>
    <v-divider class="mt-5"></v-divider>
    <v-card-actions>
      <v-btn >Cancel</v-btn>
      <v-spacer></v-spacer>
      <v-slide-x-reverse-transition>
        <v-tooltip
          left
          v-if="formHasErrors"
        >
          <v-btn
            icon
            @click="resetForm"
            slot="activator"
            class="my-0"
          >
            <v-icon>refresh</v-icon>
          </v-btn>
          <span>Refresh form</span>
        </v-tooltip>
      </v-slide-x-reverse-transition>
      <v-btn color="primary"  @click="submit">Submit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Customers from "@/api/crm/customer";

export default {
  data: () => ({
    countries: ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua &amp; Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia &amp; Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Cape Verde', 'Cayman Islands', 'Chad', 'Chile', 'China', 'Colombia', 'Congo', 'Cook Islands', 'Costa Rica', 'Cote D Ivoire', 'Croatia', 'Cruise Ship', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Polynesia', 'French West Indies', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Kyrgyz Republic', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russia', 'Rwanda', 'Saint Pierre &amp; Miquelon', 'Samoa', 'San Marino', 'Satellite', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'St Kitts &amp; Nevis', 'St Lucia', 'St Vincent', 'St. Lucia', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', "Timor L'Este", 'Togo', 'Tonga', 'Trinidad &amp; Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks &amp; Caicos', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe'],
    errorMessages: [],
    customer:{
       code: null,
      name:null,
      state: null,
      city: null,
      address:null,
      contact:null,
      country: "Mozambique"
    },
    formHasErrors: false
  }),

  computed: {
    form () {
      return {
        code: this.code,
        name:this.name,
        state: this.state,
        city: this.city,
        address:this.address,
        contact:this.contact,
        country: this.country
      };
    }
  },

  watch: {
    name () {
      this.errorMessages = [];
    }
  },

  methods: {
    addressCheck () {
      this.errorMessages = this.address && !this.name
        ? ['Hey! I\'m required']
        : [];

      return true;
    },
    resetForm () {
      this.errorMessages = [];
      this.formHasErrors = false;

      Object.keys(this.form).forEach(f => {
        this.$refs[f].reset();
      });
    },
    submit () {
      this.formHasErrors = false;
      /* Object.keys(this.form).forEach(f => {
        if (!this.form[f]) this.formHasErrors = true;

        this.$refs[f].validate(true);
      }); */

      this.Customers.push(this.customer)
    }
  }
};
</script>
