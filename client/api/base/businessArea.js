import axios from "axios";

let url = "https://192.168.3.106:5001/";

const BusinessArea = [
  { code: "1111", description: "1111" },
  { code: "11121", description: "11121" },
  { code: "11122", description: "11122" },
  { code: "11131", description: "11131" },
  { code: "11132", description: "11132" },
  { code: "1114101", description: "Manutenção - Mozal - Reduction - Pot Room" },
  { code: "1114102", description: "Manutenção - Mozal - Reduction - GTC" },
  {
    code: "1114103",
    description: "Manutenção - Mozal - Reduction - Pot Cut Out"
  },
  {
    code: "1114104",
    description: "Manutenção - Mozal - Reduction - Bus Bar Repair"
  },
  {
    code: "1114105",
    description: "Manutenção - Mozal - Reduciton - Connectors"
  },
  {
    code: "1114106",
    description: "Manutenção - Mozal - Reduciton - Global Change"
  },
  { code: "11141103", description: "1111" },
  {
    code: "1114201",
    description: "Manutenção - Mozal - Carbon - Bake Furnace"
  },
  {
    code: "1114202",
    description: "Manutenção - Mozal - Carbon - Rodding Shop"
  },
  { code: "1114203", description: "Manutenção - Mozal - Carbon - Bath Plant" },
  { code: "1114204", description: "Manutenção - Mozal - Carbon - Past Plant" },
  {
    code: "1114205",
    description: "Manutenção - Mozal - Carbon - Roding Shop Rehab."
  },
  { code: "11143", description: "Manutenção - Mozal - Cast House" },
  {
    code: "1114401",
    description: "Manutenção - Mozal - Projectos de Engenharia"
  },
  {
    code: "11145011",
    description: "Manutenção Industrial - Kenmare - Moma - Mining"
  },
  {
    code: "11145012",
    description: "Manutenção Industrial - Kenmare - Moma -Processing"
  },
  { code: "1114502", description: "Manutenção Industrial - CDM" },
  { code: "1114503", description: "Manutenção Mecânica - Midal" },
  { code: "1114504", description: "Manutenção Mecânica - PO Marítmo" },
  { code: "1114505", description: "Manutenção Mecânica - Solios" },
  { code: "1114506", description: "Manutenção Mecânica - Tio Peixe Lda" },
  { code: "1114507", description: "Manutenção Mecânica - Dioni" },
  { code: "1114508", description: "Manutenção Mecânica - Temoc" },
  {
    code: "1114509",
    description: "Manutenção Mecânica - Mac Engineering & Service"
  },
  { code: "1114510", description: "Manutenção Mecânica - Alistair Services" },
  {
    code: "1114511",
    description: "Manutenção Mecânica - Tsumelene Sociedade U. Lda"
  },
  { code: "1114512", description: "Manutenção Mecânica - Sterling Moz" },
  { code: "1114513", description: "Manutenção Mecânica - Machin Service" },
  { code: "11150", description: "Petróleo e Gás - Sasol" },
  { code: "11151", description: "Petróleo e Gás - ENHL Bonatti" },
  { code: "11152", description: "Petróleo e Gás - Galp" },
  { code: "11153", description: "Petróleo e Gás - KENMARE" },
  { code: "11154", description: "Petróleo e Gás - Outros" },
  { code: "11155", description: "Petróleo e Gás - Baker Hughes a GE Company" },
  { code: "111611", description: "Direcção - G - Assessoria Jurídica" },
  { code: "111612", description: "Direcção - G - Sistema Integrado de Gestão" },
  { code: "111613", description: "Direcção - G - Secretariado Geral" },
  {
    code: "111614",
    description: "Direcção - G - Saude, Segurança e Meio Ambiente"
  },
  { code: "111615", description: "Direcção - G - Concelho de Administração" },
  { code: "111621", description: "Direcção - FE - Finanças" },
  {
    code: "111622",
    description: "Direcção - FE - Estratégia e Desenvolvimento"
  },
  {
    code: "111631",
    description: "Direcção - RH - Recrutamento e Desenvolvimento"
  },
  { code: "111632", description: "Direcção - RH - Remunerações" },
  { code: "111633", description: "Direcção - RH - Relações Laborais" },
  { code: "111641", description: "Direcção - GP - Engenharia e Projectos" },
  { code: "111642", description: "Direcção - GP - M. Mecânica" },
  { code: "111643", description: "Direcção - GP - Refractários" },
  { code: "111644", description: "Direcção - GP - Petróleo e Gás" },
  { code: "111645", description: "Direcção - GP - Fábrica Metalomecânica" },
  { code: "111651", description: "Outros - CI - Serviços Sociais" },
  { code: "111652", description: "Outros - CI - Segurança" },
  { code: "111653", description: "Outros - CI - Eléctrica (Manutenção)" },
  { code: "111654", description: "Outros - CI - Procurement" },
  { code: "111655", description: "Outros - CI - Transportes" },
  { code: "111656", description: "Outros - CI - Armazem" },
  { code: "111661", description: "Direcção - C - Marketing" },
  { code: "111662", description: "Direcção - C - Vendas" },
  { code: "11169", description: "11169" },
  { code: "11170", description: "11170" },
  {
    code: "111711",
    description: "Refractários - Mozal - Carbon - Induction Furnance"
  },
  {
    code: "111712",
    description: "Refractários - Mozal -Carbon-Bake Furnance(ABF)"
  },
  {
    code: "111713",
    description: "Refractários - Mozal - Carbon - Outros serviços"
  },
  {
    code: "111721",
    description: "Refractários - Mozal - Reduction - DE-Lining Shop"
  },
  {
    code: "111722",
    description: "Refractários - Mozal - Reduction - Lining Shop"
  },
  {
    code: "111723",
    description: "Refractários - Mozal - Reduction - Sealing Shop"
  },
  {
    code: "111724",
    description: "Refractários - Mozal - Reduction - Ladle Workshop"
  },
  { code: "111725", description: "Refractários - Mozal - Cast House" },
  { code: "111726", description: "Refractários - Midal" },
  { code: "111727", description: "Refratarios-Mozal- Recuction-Pot Relining" },
  { code: "111731", description: "Refractários - Mozal - Reduction - Lancing" },
  {
    code: "111732",
    description: "Refractários - Mozal - Reduction - Basement Clean"
  },
  { code: "111733", description: "Refractários - Mozal - T&L - Cleaning" },
  {
    code: "111734",
    description: "Refractários - Mozal - Cast House - Lancing"
  },
  { code: "111735", description: "Refractários - Mozal - Reduction - GTC" },
  { code: "1121", description: "Investimentos C - Fábrica Beluluane" },
  { code: "11221", description: "Bloco A - Administrativo" },
  { code: "11222", description: "Bloco B - Oficina" },
  { code: "11223", description: "Bloco C1 - Sanitários" },
  { code: "11224", description: "Bloco D - Guarita" },
  { code: "11225", description: "Bloco D - Casa de Máquinas" },
  { code: "11226", description: "Bloco G - Infraestruturas" },
  { code: "11227", description: "Bloco F - Oficina de Cátodos" },
  { code: "11228", description: "Bloco E" },
  { code: "11229", description: "Equipamentos" },
  { code: "1140", description: "1140" },
  { code: "114103", description: "114103" },
  { code: "114106", description: "114106" }
];

async function getBusinessArea(limit) {
  var Items;

  await axios
    .get(url + "api/BusinessArea", null, {
      headers: {}
    })
    .then(
      response => (Items = response.data),
      error => {
        console.log(error);
        Items = BusinessArea;
      }
    );

  return limit ? Items.slice(0, limit) : Items;
}

export { BusinessArea, getBusinessArea };
