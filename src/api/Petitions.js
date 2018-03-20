import axios from 'axios';
import { 
    getDocuments,
    saveDocument
} from './Routes';

class Petitions {
    listDocuments(document) {
        return axios.get(
            //'products.json',
            getDocuments+"&document="+document,
        );
    }

    saveDocument(datos) {
        return axios({
            method: 'POST',
            url: saveDocument,
            data: datos
        });
    }
}

export default Petitions;