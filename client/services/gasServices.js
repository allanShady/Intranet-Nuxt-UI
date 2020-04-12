export default {
    getTableHeadersView(tabArea) {
        let headers;
        if(tabArea === 'wharehouse') {
            //Init headers
        headers = [
            { text: "Artigo", value: "product_id" },
            { text: "descrição", value: "description" },
            { text: "Unidade", value: "unit_id" },
            { text: "Estado", value: "status_desc" },
            { text: "Fornecedor", value: "supplier.name" },
          ]
        }
        else if(tabArea === 'productView') {
            headers = [
                { text: "Artigo", value: "id" },
                { text: "descrição", value: "description" },
                { text: "Unidade", value: "Unity.id" },
                { text: "Estado", value: "status.description" },
                { text: "Fornecedor", value: "supplier.name" },
              ] 
        }
        
        return headers;
    },

    postEvent(apiResource, event) {
        //return appClient.post(apiResource, event);
    },

    getEvent(apiResource, id) {
        //return appClient.get(`${apiResource}/${id}`);
    }    
}