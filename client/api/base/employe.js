import axios from "axios";

let url = "https://192.168.3.106:5001/";

const Employees = [
  {
    code: "F0001",
    name: "Rafael Tomas Tembe",
    BusinessArea: [
      {
        employee: "F0001",
        businessArea: "1114103",
        isSupervisor: false,
        isDirector: false,
        isPrincipal: true
      }
    ]
  },
  {
    code: "F0002",
    name: "Hilário  Bento Pacule",
    BusinessArea: [
      {
        employee: "F0002",
        businessArea: "1114102",
        isSupervisor: false,
        isDirector: false,
        isPrincipal: false
      },
      {
        employee: "F0002",
        businessArea: "11143",
        isSupervisor: false,
        isDirector: false,
        isPrincipal: true
      }
    ]
  },
  { code: "F0003", name: "Célio Munjovo", BusinessArea: [] },
  { code: "F0004", name: "Florêncio Feliciano Judas", BusinessArea: [] },
  { code: "F0005", name: "Adriano Manpadzene", BusinessArea: [] },
  {
    code: "F0006",
    name: "Artur Pascoal Mbie",
    BusinessArea: [
      {
        employee: "F0006",
        businessArea: "1114103",
        isSupervisor: false,
        isDirector: false,
        isPrincipal: true
      }
    ]
  },
  {
    code: "F0007",
    name: "Felix Azarias Bila",
    BusinessArea: [
      {
        employee: "F0007",
        businessArea: "11143",
        isSupervisor: false,
        isDirector: false,
        isPrincipal: true
      }
    ]
  },
  {
    code: "F0008",
    name: "José Mula",
    BusinessArea: [
      {
        employee: "F0008",
        businessArea: "1114103",
        isSupervisor: false,
        isDirector: false,
        isPrincipal: true
      }
    ]
  },
  {
    code: "F0009",
    name: "Juma Raul Eugenio Moura",
    BusinessArea: [
      {
        employee: "F0009",
        businessArea: "1114201",
        isSupervisor: false,
        isDirector: false,
        isPrincipal: true
      }
    ]
  },
  {
    code: "F0010",
    name: "Américo Mauai",
    BusinessArea: [
      {
        employee: "F0010",
        businessArea: "1114106",
        isSupervisor: false,
        isDirector: false,
        isPrincipal: true
      }
    ]
  },
  {
    code: "F0011",
    name: "Cassimo Joaquim Manhula",
    BusinessArea: [
      {
        employee: "F0011",
        businessArea: "1114106",
        isSupervisor: false,
        isDirector: false,
        isPrincipal: true
      }
    ]
  },
  { code: "F0012", name: "Juvenal Ernesto Pelembe", BusinessArea: [] },
  {
    code: "F0013",
    name: "Eduardo Francisco Monjane",
    BusinessArea: [
      {
        employee: "F0013",
        businessArea: "1114106",
        isSupervisor: false,
        isDirector: false,
        isPrincipal: true
      }
    ]
  },
  {
    code: "F0014",
    name: "Guiven Buque",
    BusinessArea: [
      {
        employee: "F0014",
        businessArea: "1114201",
        isSupervisor: false,
        isDirector: false,
        isPrincipal: true
      }
    ]
  },
  {
    code: "F0015",
    name: "Daniel SilvestreTimba",
    BusinessArea: [
      {
        employee: "F0015",
        businessArea: "1114106",
        isSupervisor: false,
        isDirector: false,
        isPrincipal: true
      }
    ]
  },
  {
    code: "F0016",
    name: "Gildo Paulo Balane",
    BusinessArea: [
      {
        employee: "F0016",
        businessArea: "1114103",
        isSupervisor: false,
        isDirector: false,
        isPrincipal: true
      }
    ]
  },
  {
    code: "F0017",
    name: "Aguinaldo Lopes",
    BusinessArea: [
      {
        employee: "F0017",
        businessArea: "1114106",
        isSupervisor: false,
        isDirector: false,
        isPrincipal: true
      }
    ]
  },
  {
    code: "F0018",
    name: "Eliote Ernesto Nguenha",
    BusinessArea: [
      {
        employee: "F0018",
        businessArea: "1114202",
        isSupervisor: false,
        isDirector: false,
        isPrincipal: true
      }
    ]
  },
  { code: "F0019", name: "Ozias Manaciz Joina", BusinessArea: [] },
  {
    code: "F0020",
    name: "Augusto Fernando Maibasso",
    BusinessArea: [
      {
        employee: "F0020",
        businessArea: "1114202",
        isSupervisor: false,
        isDirector: false,
        isPrincipal: true
      }
    ]
  }
];

async function getEmployees(limit) {
  var Items;

  await axios
    .get(url + "api/Employees", null, {
      headers: {}
    })
    .then(
      response => (Items = response.data),
      error => {
        console.log(error);
        Items = Employees;
      }
    );

  return limit ? Items.slice(0, limit) : Items;
}

export { Employees, getEmployees };
