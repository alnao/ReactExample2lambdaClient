import axios from 'axios';

class SalutiService {

    getSalutiData = () => {
        return axios.get("http://localhost:8080/api/saluti");
    }

    getSalutiDataParam = (nome) => {
        return axios.get(`http://localhost:8080/api/saluti/${nome}`); //ALT + 0096 | ALT GR + '
    }
}

export default new SalutiService()