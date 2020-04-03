export default {
    getTableHeadersView(document) {
        let headers;
        if(document === 'DPPC') {
            //Init headers
        headers = [
            { text: "Artigo", value: "product_id" },
            { text: "descrição", value: "description" },
            { text: "unidade", value: "unity_id" },
            { text: "Qtd. Pendente", value: "pending_qtd" },
            { text: "Qtd. Entrega", value: "quantity" },
            { text: "Estado", value: "status.description" },
            { text: "Notas", value: "notes" },
          ]
        }

        return headers;
    },

    prepareLinesToSave(itemsTocope) { 
        let result = [];
        
        itemsTocope.forEach(element => {
            result.push({
                id: element.id,
                notes: element.notes,
                product: element.product_id,
                description: element.description,
                unity: element.unity_id,
                quantity: element.quantity,
                DocumentId: element.header_id,
                status_id: element.status.code,
                factor: 1,
                branch: localStorage.getItem('branch'), 
                warehouse: localStorage.getItem('warehouse') || "Sede",
                location: localStorage.getItem('localization') || "Sede",
                businessArea: element.business_area
            });
        });

        return result;
    },

    formattDate(date) {
        console.log('Date: ', date);
       return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`
    }
}