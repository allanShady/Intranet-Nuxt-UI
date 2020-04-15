export default {
    getTableHeadersView(tabArea) {
        let headers;

        switch (tabArea) {
            case 'wharehouse':        
                headers = [
                    { text: "Artigo", value: "product_id" },
                    { text: "descrição", value: "description" },
                    { text: "Unidade", value: "unit_id" },
                    { text: "Estado", value: "status_desc" },
                    { text: "Fornecedor", value: "supplier.name" },
                ]
                break;            
            case 'productView':
                headers = [
                    { text: "Artigo", value: "id" },
                    { text: "descrição", value: "description" },
                    { text: "Unidade", value: "Unity.id" },
                    { text: "Estado", value: "status.description" },
                    { text: "Fornecedor", value: "supplier.name" },
                  ] 
                break;
            case 'stocks':
                headers = [
                    { text: "Artigo", value: "product.id" },
                    { text: "Descrição", value: "product.description" },
                    { text: "Projecto", value: "project.description" },
                    { text: "Estado", value: "status.description" },
                    { text: "Fornecedor", value: "supplier.name" }
                ];
                break;
            default:
                break;
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