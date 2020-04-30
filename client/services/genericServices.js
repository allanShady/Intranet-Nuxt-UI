export default {
    getTableHeadersView(documentType) {
        let headers = [];

        if(documentType == 'stock_balaces') {
            headers = [
                { text: "Aréa de negócio", value: "business_area" },
                //{ text: "Funcionario", value: "entity_id" },
                { text: "Funcionário", value: "entity" },
                //{ text: "Artigo", value: "product_id" },
                { text: "Artigo", value: "product_description" },
                { text: "Unidade", value: "unit" },
                { text: "Qtd.", value: "balance", sortable: true }
            ]
        } else {
        
        //Init headers
        headers = [
            //{ text: "Artigo", value: "product_id" },
            { text: "Artigo", value: "description" },
            { text: "Unidade", value: "unit_id" },
            { text: "Qtd.", value: "quantity" },
            { text: "Entidade", value: "project.description" },
            { text: "Notas", value: "notes" },
            { text: "", value: "action", sortable: false }
        ]
        
        if(documentType == 'E')
            headers.unshift({ text: "Nr. Doc", value: "doc_number" })
        }
        
        return headers;
    },

    formattDate(date) {
       return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`
    }
}