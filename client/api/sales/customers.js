
const getAllCustomer = (limit) =>  {

  var data =  this.$api.get('/api/Iventario/ListaFuncionarios');

  return (limit) ? data.slice(0, limit) : data;
};

const Customers = [{
  "Customer": "10001",
  "Name": "Brighten Chemicals"
}, {
  "Customer": "10002",
  "Name": "Depósitos diversos "
}, {
  "Customer": "1001",
  "Name": "MOZAL S.A.R.L"
}, {
  "Customer": "10010",
  "Name": "Cimentos de Moçambique"
}, {
  "Customer": "10011",
  "Name": "HYTEC SERVICE MOZAMBIQUE LDA"
}, {
  "Customer": "10012",
  "Name": "JACINTO MUTEMBA"
}, {
  "Customer": "10013",
  "Name": "Rural Capital SA"
}, {
  "Customer": "10014",
  "Name": "Portas Galore, LDA"
}, {
  "Customer": "10015",
  "Name": "Alistair Services Mocambique,Lda"
}, {
  "Customer": "10016",
  "Name": "TEMOC MOCAMBIQUE"
}, {
  "Customer": "10017",
  "Name": "Tio Peixe Lda,"
}, {
  "Customer": "10018",
  "Name": "MAC Engineering & Service"
}, {
  "Customer": "1002",
  "Name": "Metso Minerals"
}, {
  "Customer": "1003",
  "Name": "RULA BULK MATERIAL HANDLING (Pty) Ltd"
}, {
  "Customer": "1004",
  "Name": "MIDAL CABLES INTERNATIONAL, LIMITADA"
}, {
  "Customer": "1005",
  "Name": "Strang Rennies Mocambique Consortiun"
}, {
  "Customer": "1006",
  "Name": "FIVES  SERVICES  SOUTHERN AFRICA (PTY)LT"
}, {
  "Customer": "1007",
  "Name": "VALERIO MARCOLINO MATSOMBE"
}, {
  "Customer": "1008",
  "Name": "CANDIDO FRANCISCO SOTO"
}, {
  "Customer": "1009",
  "Name": "STEMA silos e terminal graneleiro da matola, SA"
}, {
  "Customer": "1010",
  "Name": "Chiefton Moçambique SA"
}, {
  "Customer": "1011",
  "Name": "TSUMELENE-Sociedade Unipessoal,Lda"
}, {
  "Customer": "1012",
  "Name": "Machin Service"
}, {
  "Customer": "1013",
  "Name": "MozaBanco"
}, {
  "Customer": "1014",
  "Name": "Trans Auto"
}, {
  "Customer": "11100",
  "Name": "KENMARE (não facturar aqui)",
  "Address":""
}, {
  "Customer": "11101",
  "Name": "Caixa Geral - BELUTECNICA SA"
}, {
  "Customer": "11102",
  "Name": "KENMARE, Moma Mining (Mauritius) Limited",
  "Address":"Rua de Chuindi No. 67, Maputo, Mozambique",
  "Att_Name":"Paulo Magazique",
  "Att_Number":"(+258) 84 864 8231"
}, {
  "Customer": "11103-2",
  "Name": "KENMARE, Moma Processing (Mauritus) Limited",
  "Address":"Rua de Chuindi No. 67, Maputo, Mozambique",
  "Att_Name":"Paulo Magazique",
  "Att_Number":"(+258) 84 864 8231",
}, {
  "Customer": "12111",
  "Name": "Standard Bank",
  "Address":""
}, {
  "Customer": "2001",
  "Name": "METSO MINERALS",
  "Address":""
}, {
  "Customer": "2002",
  "Name": "RULA BULK MATERIAL HANDLING (PTY) LTD",
  "Address":""
}, {
  "Customer": "2003",
  "Name": "MIDAL CABLES INTERNATIONAL, LIMITADA",
  "Address":""
}, {
  "Customer": "2004",
  "Name": "STRANG RENNIES MOCAMBIQUE CONSORTIUN",
  "Address":""
}, {
  "Customer": "2005",
  "Name": "FIVES  SERVICES  SOUTHERN AFRICA (PTY)LTD",
  "Address":""
}, {
  "Customer": "2006",
  "Name": "VALERIO MARCOLINO MATSOMBE",
  "Address":""
}, {
  "Customer":"2007",
  "Name": "CANDIDO FRANCISCO SOTO",
  "Address":""
}, {
  "Customer": "2008",
  "Name": "STEMA SILOS E TERMINAL GRANELEIRO DA MATOLA, SA",
  "Address":""
}, {
  "Customer": "2009",
  "Name": "CHIEFTON MOÇAMBIQUE SA",
  "Address":""
}, {
  "Customer": "2010",
  "Name": "TECNAGRA MOÇAMBIQUE SERVICE,EI",
  "Address":""
}, {
  "Customer": "2011",
  "Name": "GRAVITA MOZAMBIQUE LIMITADA",
  "Address":""
}, {
  "Customer": "2012",
  "Name": "COCA-COLA",
  "Address":""
}, {
  "Customer": "2013",
  "Name": "P&O Maritime Moçambique,SA.",
  "Address":""
}, {
  "Customer": "2014",
  "Name": "Armando Jose Zaqueu"
}, {
  "Customer": "2015",
  "Name": "Parque Industrial Beluluane ",
  "Address":""
}, {
  "Customer": "2016",
  "Name": "Anuar Daude Hassane",
  "Address":""
}, {
  "Customer": "2017",
  "Name": "GEOMA MOÇAMBIQUE, LIMITADA ",
  "Address":""
}, {
  "Customer": "2018",
  "Name": "Lopes Arnaldo Fungo - Reembolsos de compras",
  "Address":""
}, {
  "Customer": "2019",
  "Name": "Hollard Moc. Companhia de Seguros",
  "Address":""
}, {
  "Customer": "2020",
  "Name": "NAT -AFRICA ",
  "Address":""
}, {
  "Customer": "2021",
  "Name": "ENHL Bonatti LDA",
  "Address":""
}, {
  "Customer": "2022",
  "Name": "NELSON DA GRACA MATIMBE",
  "Address":""
}, {
  "Customer": "2023",
  "Name": "Eliote Ernesto Nguenha",
  "Address":""
}, {
  "Customer": "2024",
  "Name": "SIKA Moçambique Lda",
  "Address":""
}, {
  "Customer": "2025",
  "Name": "Sterling Moz Lda",
  "Address":""
}, {
  "Customer": "2026",
  "Name": "GE OIL & GAS Mozambique,Limitada-Baker Hughes a GE",
  "Address":""
}, {
  "Customer": "2027",
  "Name": "Paulino Cumaio",
  "Address":""
}, {
  "Customer": "2028",
  "Name": "Daniel Rafael Milando",
  "Address":""
}, {
  "Customer": "2029",
  "Name": "Antonio Domingos Joao",
  "Address":""
}, {
  "Customer": "2030",
  "Name": "Delfina Jose Namburete",
  "Address":""
}, {
  "Customer": "2031",
  "Name": "Marcel Maughan",
  "Address":""
}, {
  "Customer": "2032",
  "Name": "TransAuto",
  "Address":""
}, {
  "Customer": "C001",
  "Name": "GLOBAL NDT",
  "Address":""
}, {
  "Customer": "CDM",
  "Name": "Cervejas de Mocambique",
  "Address":""
}, {
  "Customer": "DJN",
  "Name": "Jan De Nul Dredging",
  "Address":""
}, {
  "Customer": "NELSON",
  "Name": "NELSON DA GRACA MATIMBE",
  "Address":""
}, {
  "Customer": "PROAIR",
  "Name": "ProAir Construcoes Lda",
  "Address":""
}, {
  "Customer": "RH",
  "Name": "Recursos Humanos",
  "Address":""
}, {
  "Customer": "SASOL",
  "Name": "Sasol Petroleum Temane Limitada",
  "Address":""
}, {
  "Customer": "UEM",
  "Name": "Universidade Eduardo Mondlane",
  "Address":""
}, {
  "Customer": "VD",
  "Name": "Cliente Indiferenciado",
  "Address":""
}];

export {
  Customers,
  getAllCustomer
};
