import axios from 'axios';

let url = 'https://192.168.3.106:5001/';

const Projects = [
  {
    code: "RECCA_3818",
    summary:"ESCRITÓRIO -  fracção autonoma A4, R/C loja nº 4, inserido no talhão nº 85",
    description: "ESCRITÓRIO -  fracção autonoma A4, R/C loja nº 4, inserido no talhão nº 85, implantado num lote de terreno com uma área de 1.399,95 m2, localizado na Av. José Cabral esquina com a Rua Gago Coutinho, Cidade de Nampula.",
    barcode: "8850585992458",
    year: 2019,
    deadline: '2 days later',
    progress: 90,
    color: 'pink',
    status: 'In progress',
    client:{
      code:'C001',
      name:"Banco Único"
    },
    proponent:{
      code:'P001',
      name:"Paginas Amarelas"
    },
    supervisor:{
      code:'F002',
      name:'Guimarães Mahota'
    },
    state:"Proposal",
    type:"Aval"
  },
  {
    code: "11001",
    summary:"POSTO DE COMBUSTÍVEL - composto por escritórios, loja de conviniencia",
    description: "POSTO DE COMBUSTÍVEL - composto por escritórios, loja de conviniencia, e sanitarios, inserido na parcela nº 1119, implantado num lote de terreno com uma área de 3 hectares e uma área coberta de 477 m2, localizado em Chicochana, Província de Maputo.",
    barcode: "8850585992526",
    year: 2019,
    deadline: '1 weeks later',
    progress: 70,
    color: 'success',
    status: 'Approved',
    client:{
      code:'C002',
      name:"BIM"
    },
    proponent:{
      code:'P001',
      name:"Accsys"
    },
    supervisor:{
      code:'F002',
      name:'Guimarães Mahota'
    },
    state:"Proposal",
    type:"Aval"
  },
  {
    code: "11002",
    summary:"MORADIA - inserido na parcela",
    description: "MORADIA - inserido na parcela , implantado num lote de terreno com uma área de 536 m2, localizado em Tete",
    barcode: "8850585992632",
    year: 2019,
    deadline: '1 Month later',
    progress: 50,
    color: 'info',
    status: 'done',
    client:{
      code:'C001',
      name:"Banco Único"
    },
    proponent:{
      code:'P001',
      name:"Meridian"
    },
    supervisor:{
      code:'F001',
      name:'João Neto'
    },
    state:"Proposal",
    type:"Aval"
  },
  {
    code: "11003",
    summary:"MORADIA - do tipo T5",
    description: "MORADIA - do tipo T5, implanato num lote de terreno com uma área de 800 m2",
    barcode: "8850585992649",
    year: 2018,
    deadline: '2 Month later',
    progress: 30,
    color: 'teal',
    status: 'On Reporting',
    client:{
      code:'C002',
      name:"BIM"
    },
    proponent:{
      code:'P001',
      name:"Meridian"
    },
    supervisor:{
      code:'F001',
      name:'João Neto'
    },
    state:"Proposal",
    type:"Est",


  }
];

const Invoices = [
  {
    id: 'ADC 1/2019',
    summary: 'Adiantamento 10% do projeto',
    date: '2019-02-01',
    price: -300000,
    status: 'advance',

    project: "RECCA_3818"
  },
  {
    id: 'FA 10/2019',
    summary: 'Emissão do Relatiorio Inicial',
    date: '2019-05-01',
    price: 50000,
    status: 'paid',

    project: "RECCA_3818"
  },
  {
    id: 'FA 20/2019',
    summary: 'Emissão do Relatiorio Inicial',
    date: '2019-05-01',
    price: 50000,
    status: 'pedding',

    project: "11001"
  }
];

const Task = [{
  employ: 'NI',
  avatar: require('@/static/avatar/a4.jpg'),
  name: 'Relátorio de Levantamento',
  deadline: '2 days later',
  points: 90,
  color: 'pink',
  year: 2019,
  type:"Document",
  status:"proposta",
  project : 'RECCA_3818',
  date: '2019-01-15',
  duo: '2019-02-01',
},
{
  employ: 'NI',
  avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ludwiczakpawel/128.jpg',
  name: 'Aprovação do Relátorio',
  deadline: '15 apos a emissão do relatório',
  points: 70,
  color: 'success',
  year: 2019,
  type:"Document",
  status:"validação",
  project : 'RECCA_3818',
  date: '2019-01-21',
  duo: '2019-02-10',
},
{
  employ: 'JC',
  avatar: require('@/static/avatar/a3.jpg'),
  name: 'Facturar o Relátorio',
  deadline: '1 mês',
  points: 50,
  color: 'default',
  year: 2018,
  type:"Email",
  status:"validado",
  project: 'RECCA_3818',
  date: '2019-02-11',
  duo: '2019-03-10',
},
{
  employ: 'HS',
  avatar: require('@/static/avatar/a1.jpg'),
  name: 'API Unit Test',
  deadline: '2 Month later',
  points: 30,
  color: 'teal',
  year: 2019,
  project: '11001',
  date: '2020-02-01',
  duo: '2019-02-05',
}]

async function getProjects(limit) {
  var Items;

  await axios
    .get(url + "api/Projects", null, {
      headers: {}
    })
    .then(response => (Items = response.data),
    error => {
      console.log(error);
      Items = Projects;
    });
  return limit ? Items.slice(0, limit) : Items;
}


const getProjectByCode = (code) => {
  return Projects.find(x => x.code === code);
};

const getProjectInvoices =(code) => {
  return  Invoices.filter(x => x.project === code);
};

const getProjectTasks =(code) => {
  return  Task.filter(x => x.project === code);
};

export {
  Projects,
  getProjects,
  getProjectByCode,
  getProjectInvoices,
  getProjectTasks
}
