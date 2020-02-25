import axios from "axios";

let url = "https://192.168.3.106:5001/";

const Unities = [
  { code: "%", description: "%", rounding: 0 },
  { code: "5KG", description: "5 Kilograma(s)", rounding: 2 },
  { code: "G", description: "Grama(s)", rounding: 2 },
  { code: "HR", description: "Hours", rounding: 2 },
  { code: "KG", description: "Kilograma(s)", rounding: 2 },
  { code: "LT", description: "Litro(s)", rounding: 2 },
  { code: "ML", description: "Mililitro(s)", rounding: 2 },
  { code: "MM", description: "Milimetro(s)", rounding: 0 },
  { code: "MT", description: "Metro(s)", rounding: 2 },
  { code: "UN", description: "Unidade ", rounding: 2 },
  { code: "VG", description: "VG", rounding: 0 }
];

async function getUnities(limit) {
  var Items;

  await axios
    .get(url + "api/Unities", null, {
      headers: {}
    })
    .then(
      response => (Items = response.data),
      error => {
        console.log(error);
        Items = Unities;
      }
    );

  return limit ? Items.slice(0, limit) : Items;
}

export { Unities, getUnities };
