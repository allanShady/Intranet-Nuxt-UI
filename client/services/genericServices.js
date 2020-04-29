export default {
    getTableHeadersView(documentType) {
        let headers = [];

        if(documentType == 'stock_balaces') {
            headers = [
                { text: "Aréa negocio", value: "business_area" },
                //{ text: "Funcionario", value: "entity_id" },
                { text: "Funcionário", value: "entity" },
                //{ text: "Artigo", value: "product_id" },
                { text: "Artigo", value: "product_description" },
                { text: "UN", value: "unit" },
                { text: "Qnt.", value: "balance", sortable: true }
            ]
        } else {
        
        //Init headers
        headers = [
            //{ text: "Artigo", value: "product_id" },
            { text: "Artigo", value: "description" },
            { text: "UN", value: "unit_id" },
            { text: "Qnt.", value: "quantity" },
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