import axios from 'axios';
import { CLIENTI_API_GATEWAY } from '../../../DataConstants';  

class  ClientiService {

    state = {
        Server: CLIENTI_API_GATEWAY,
        BaseUrl: "/api/clienti",
    }

    getAllClientiData = () => {

        return axios.get(`${this.state.Server}${this.state.BaseUrl}/cerca/all`);
    }

    getClienteByNome = (nominativo) => {
        return axios.get(`${this.state.Server}${this.state.BaseUrl}/cerca/selectname/${nominativo}`); //ALT + 0096 | ALT GR + '
    }

    getClienteByCode = (codfid) => {
        return axios.get(`${this.state.Server}${this.state.BaseUrl}/cerca/selectcode/${codfid}`); //ALT + 0096 | ALT GR + '
    }

    delClienteByCode = (codfid) => {
        return axios.delete(`${this.state.Server}${this.state.BaseUrl}/elimina/${codfid}`);
    }

    insCliente = (cliente) => {
        return axios.post(`${this.state.Server}${this.state.BaseUrl}/inserisci`, cliente);
    }    

}

export default new ClientiService()
