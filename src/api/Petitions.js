import axios from 'axios';
import { 
    getDocuments,
    saveCategory
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
            url: saveCategory,
            data: datos
        });
    }
}

export default Petitions;