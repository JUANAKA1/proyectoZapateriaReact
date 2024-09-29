import axios from 'axios';

export class ZapateriaService {
    baseUrl = "http//localhost:8080/usuarios";
    getAll(){
        return axios.get(this.baseUrl)
    }
   

}