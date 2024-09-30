import axios from 'axios';

export class UsuarioService {
    baseUrl = "http://localhost:8080/usuario";
    getAll(){
        return axios.get(this.baseUrl+ "/mostrar").then(res =>res.data);
    }
   save(usuario){
    return axios.post(this.baseUrl +"/nuevo", usuario). then(res =>res.data);
   }

}