export default {
    getTableHeadersView(document) {
        let headers;
        if(document === 'DPPC') {
            //Init headers
        headers = [
            { text: "Artigo", value: "product_id" },
            { text: "descrição", value: "description" },
            { text: "Unidade", value: "unit_id" },
            { text: "Qtd. Pendente", value: "pending_qtd" },
            { text: "Qtd. Entrega", value: "quantity" },
            { text: "Estado", value: "status.description" },
            { text: "Notas", value: "notes" },
          ]
        }

        return headers;
    },

    getTableHeadersView4Validation(document) {
        let headers;
        if(document === 'DPPC') {
            //Init headers
        headers = [
            //{ text: "Artigo", value: "product_id" },
            //{ text: "descrição", value: "description" },
            { text: "Funcionário", value: "entityName" },
            { text: "Aréa de negócio", value: "businessAreaDescription" },
            { text: "Artigo", value: "description" },
            { text: "Unidade", value: "unity_id" },
            { text: "Qtd. Pendente", value: "pending_qtd" },
            { text: "Qtd. Validação", value: "quantity" },
            { text: "Estado", value: "status.description" },
            { text: "Notas (devolução)", value: "delivery_notes" },
            { text: "Notas (validação)", value: "validation_notes" },
          ]
        }

        return headers;
    },

    prepareLinesToSave(itemsTocopy) { 
        let result = [];

        itemsTocopy.forEach(element => {
            result.push({
                id: element.id,
                notes: element.notes,
                product_id: element.product_id,
                description: element.description,
                unity_id: element.unit_id,
                quantity: element.quantity,
                DocumentId: element.header_id,
                status_id: element.status ? element.status.code : null,
                factor: 1,
                branch_id: localStorage.getItem('branch'), 
                warehouse_id: localStorage.getItem('warehouse') || "Sede",
                location: localStorage.getItem('localization') || "Sede",
                businessArea: element.business_area
            });
        });

        return result;
    },

    prepareDeliveryPostData(document_details, doc_type_id)
    {
        const post_data = {
            document_type_id: doc_type_id,
            date: this.formattDate(new Date()),
            reference_doc: `Validação de devolução de ${document_details.length} items`,
        };
        
        post_data.details = this.prepareLinesToSave(document_details);
        return post_data;
    },

    formattDate(date) {
        console.log('Date: ', date);
       return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`
    },

    postEvent(apiResource, event) {
        //return appClient.post(apiResource, event);
    },

    getEvent(apiResource, id) {
        //return appClient.get(`${apiResource}/${id}`);
    }    
}