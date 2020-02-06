export default [
  {
    code: "11",
    description: "Centros de custo",
    barcode: "8850585992458",
    deadline: '2 days later',
    progress: 90,
    color: 'pink',
    status: 'In progress',
    client:{
      code:'C001',
      name:"Banco Único"
    },
    supervisor:{
      code:'F002',
      name:'Guimarães Mahota'
    }
  },
  {
    code: "11001",
    description: "Sede",
    barcode: "8850585992526",
    deadline: '1 weeks later',
    progress: 70,
    color: 'success',
    status: 'Approved',
    client:{
      code:'C002',
      name:"BIM"
    },
    supervisor:{
      code:'F002',
      name:'Guimarães Mahota'
    }
  },
  {
    code: "11002",
    description: "Filial Av. da Liberdade",
    barcode: "8850585992632",
    deadline: '1 Month later',
    progress: 50,
    color: 'info',
    status: 'done',
    client:{
      code:'C001',
      name:"Banco Único"
    },
    supervisor:{
      code:'F001',
      name:'João Neto'
    }
  },
  {
    code: "11003",
    description: "Filial Av. Central",
    barcode: "8850585992649",
    deadline: '2 Month later',
    progress: 30,
    color: 'teal',
    status: 'On Reporting',
    client:{
      code:'C002',
      name:"BIM"
    },
    supervisor:{
      code:'F001',
      name:'João Neto'
    }
  }
];
