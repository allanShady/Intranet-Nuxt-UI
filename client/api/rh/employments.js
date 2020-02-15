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

const Todos = [{
  employ: '001',
  avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ludwiczakpawel/128.jpg',
  name: 'Template PSD',
  deadline: '2 days later',
  points: 90,
  color: 'pink',
  year: 2019
},
{
  employ: '001',
  avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/suprb/128.jpg',
  name: 'Logo Design',
  deadline: '1 weeks later',
  points: 70,
  color: 'success',
  year: 2019
},
{
  employ: '001',
  avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ludwiczakpawel/128.jpg',
  name: 'REST API',
  deadline: '1 Month later',
  points: 50,
  color: 'info',
  year: 2018
},
{
  employ: 'A001',
  avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/damenleeturks/128.jpg',
  name: 'API Unit Test',
  deadline: '2 Month later',
  points: 30,
  color: 'teal',
  year: 2019
},
{
  employ: 'A001',
  avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/caspergrl/128.jpg',
  name: 'Project Deploy',
  deadline: 'half year later',
  points: 15,
  color: 'grey',
  year: 2019
},

];

const getTodos = (limit) => {
return (limit) ? Todos.slice(0, limit) : Todos;
};

export {
  Employees ,
  getAllEmployees,
  Todos,
  getTodos
};
