import axios from 'axios';

export class UsuarioService {
    baserUrl = "http://localhost:8080/usuario";
    getAll(){
        return axios.get(this.baserUrl+ "/mostrar").then(res =>res.data);
    }
   

}