export default {
    getTableHeadersView(documentType) {
        //Init headers
        let headers = [
            { text: "Artigo", value: "product_id" },
            { text: "Descrição", value: "description" },
            { text: "UN", value: "unity_id" },
            { text: "Qnt.", value: "quantity" },
            { text: "Projeto", value: "project.description" },
            { text: "Notas", value: "notes" },
            { text: "", value: "action", sortable: false }
        ]
        
        if(documentType == 'E')
            headers.unshift({ text: "Nr. Doc", value: "doc_number" })

        return headers;
    },

    formattDate(date) {
       return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`
    }
}