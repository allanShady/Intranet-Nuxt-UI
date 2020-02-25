const typeDocuments = [
  {
    code: "DF",
    description: "Devolução de Ferramentas",
    classifier: { code: "Ferramentas" },
    icon: "mdi-Wrench"
  },
  {
    code: "SF",
    description: "Saida de Ferramentas",
    classifier: { code: "Ferramentas" },
    icon: "mdi-Wrench"
  },
  {
    code: "EPPC",
    description: "Entrada PCC",
    classifier: { code: "PCC" },
    icon: "reorder"
  },
  {
    code: "DE",
    description: "Devolução de Equipamentos",
    classifier: { code: "Equipamentos" },
    icon: "reorder"
  },
  {
    code: "ERGAS",
    description: "Reabastecimento de Botija Gas",
    classifier: { code: "Gás", icon: "reorder" }
  },
  {
    code: "ERPC",
    description: "Entrada Reparação de PPC",
    classifier: { code: "PPC" },
    icon: "reorder"
  },
  {
    code: "APPC",
    description: "Atribuição de PPC",
    classifier: { code: "PPC" },
    icon: "reorder"
  },
  {
    code: "ELAV",
    description: "Entrada Lavandaria de PPC",
    classifier: { code: "PPC" },
    icon: "reorder"
  },
  {
    code: "DDPC",
    description: "Devolução Danificado de PPC",
    classifier: { code: "PPC" },
    icon: "reorder"
  },
  {
    code: "DLAV",
    description: "Entrada PCC",
    classifier: { code: "PCC" },
    icon: "reorder"
  },
  {
    code: "DPCC",
    description: "Devolução de PCC",
    classifier: { code: "PCC" },
    icon: "reorder"
  },
  {
    code: "DPPC",
    description: "Entrada PCC",
    classifier: { code: "PCC" },
    icon: "reorder"
  },
  {
    code: "DC",
    description: "Devolução de Consumiveis",
    classifier: { code: "Consumiveis" },
    icon: "reorder"
  },

  {
    code: "DRPC",
    description: "Devolução Reparação de PPC",
    classifier: { code: "PCC" },
    icon: "reorder"
  },
  {
    code: "EARM",
    description: "Entrada Armazem de PPC",
    classifier: { code: "PCC" },
    icon: "reorder"
  },
  {
    code: "EDPC",
    description: "Entrada Danificado de PPC",
    classifier: { code: "PPC" },
    icon: "reorder"
  },

  {
    code: "DGAS",
    description: "Devolução de Botija Gás",
    classifier: { code: "Gás" },
    icon: "reorder"
  },

  {
    code: "DRGAS",
    description: "Dev. Reabast. de Botija Gas",
    classifier: { code: "Gás" },
    icon: "reorder"
  },
  {
    code: "EGAS",
    description: "Entrega de Botija Gás",
    classifier: { code: "Gás" },
    icon: "reorder"
  },

  {
    code: "SC",
    description: "Saida de Consumiveis",
    classifier: { code: "Consumiveis" },
    icon: "reorder"
  },
  {
    code: "SE",
    description: "Saida de Equipamentos",
    classifier: { code: "Consumiveis" },
    icon: "reorder"
  },

  {
    code: "SPPC",
    description: "Saida de PCC",
    classifier: { code: "PPC" },
    icon: "reorder"
  }
];

async function getTypeDocuments(classifier, limit) {
  var Items;

  Items = typeDocuments.filter(p => p.classifier == classifier);
  Items.sort((t1, t2) => (t1.description < t2.description ? -1 : 1));

  return limit ? Items.slice(0, limit) : Items;
}

export default [typeDocuments, getTypeDocuments];
