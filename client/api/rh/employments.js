const Employees = [
  {
    code: "001",
    name: "Maria João Pereira Alves",
    dateAdmission: "2015-08-01T00:00:00",
    pc: [{ Department: "11001" }]
  },
  {
    code: "A001",
    name: "Filomena Maria Cruz Rebelo",
    dateAdmission: "2015-07-01T00:00:00",
    pc: [{ Department: "11001" }, { Department: "11002" }]
  },
  {
    code: "A002",
    name: "João Carlos Araújo Fonseca",
    dateAdmission: "2013-01-01T00:00:00",
    pc: [{ Department: "11001" }]
  },
  {
    code: "A003",
    name: "Carla Alexandra Gomes Azevedo",
    dateAdmission: "2012-01-01T00:00:00",
    pc: [{ Department: "11001" }]
  },
  {
    code: "A017",
    name: "Filipe Manuel Marques da Silva Dias",
    dateAdmission: "2011-01-01T00:00:00",
    pc: [{ Department: "11001" }]
  },
  {
    code: "B001",
    name: "Luís Augusto Pinto Teixeira Neves",
    dateAdmission: "2015-04-01T00:00:00",
    pc: [{ Department: "11001" }]
  },
  {
    code: "D002",
    name: "Sandra Regina Queirós Azevedo Conceição",
    dateAdmission: "2012-01-15T00:00:00",
    pc: [{ Department: "11001" }]
  },
  {
    code: "F001",
    name: "Ana Cristina Leite Casaco",
    dateAdmission: "2012-02-17T00:00:00",
    pc: [{ Department: "11001" }]
  },
  {
    code: "F002",
    name: "Olga Maria Casal Melo da Cunha",
    dateAdmission: "2012-03-12T00:00:00",
    pc: [{ Department: "11001" }]
  }
];

const getAllEmployees = (limit) =>  {

  var data =  this.$api.get('/api/Iventario/ListaFuncionarios');

  return (limit) ? data.slice(0, limit) : data;
};

export {
  Employees ,
  getAllEmployees
};
