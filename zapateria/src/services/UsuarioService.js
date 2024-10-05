// Importación de axios, una librería para realizar solicitudes HTTP
import axios from 'axios';

// Definición de la clase UsuarioService que manejará las operaciones CRUD relacionadas con los usuarios
export class UsuarioService {
    // URL base del servicio REST que se conecta con el backend en localhost
    baseUrl = "http://localhost:8080/usuario";
    
    // Método para obtener todos los usuarios llamando al endpoint "/mostrar"
    getAll() {
        // Realiza una solicitud GET a la API y retorna los datos de la respuesta
        return axios.get(this.baseUrl + "/mostrar").then(res => res.data);
    }

    // Método para guardar un nuevo usuario, enviando los datos a la API en formato JSON
    save(usuario) {
        // Realiza una solicitud POST al endpoint "/nuevo" para crear un nuevo usuario
        return axios.post(this.baseUrl + "/nuevo", usuario).then(res => res.data);
    }

    // Método para eliminar un usuario por su ID, utilizando el endpoint "/delete/{id}"
    delete(id) {
        // Realiza una solicitud POST al endpoint "/delete/{id}" para eliminar un usuario
        return axios.post(this.baseUrl + "/delete/" + id).then(res => res.data);
    }
}
