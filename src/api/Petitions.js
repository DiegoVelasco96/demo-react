import axios from 'axios';
import {
    getDocuments,
    saveCategory,
    deleteDocument
} from './Routes';

class Petitions {
    listDocuments(document) {
        return axios.get(
            //'products.json',
            getDocuments + "&document=" + document,
        );
    }

    saveDocument(datos) {
        return axios({
            method: 'POST',
            url: saveCategory,
            data: datos
        });
    }

    deleteDocument(id) {
        return axios.get(
            deleteDocument + "&documentId=" + id
        );
    }
}

export default Petitions;