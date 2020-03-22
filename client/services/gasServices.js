export default {
    getTableHeadersView(tabArea) {
        let headers;
        if(tabArea === 'wharehouse') {
            //Init headers
        headers = [
            { text: "Artigo", value: "code" },
            { text: "descrição", value: "description" },
            { text: "Unidade", value: "unit.description" },
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