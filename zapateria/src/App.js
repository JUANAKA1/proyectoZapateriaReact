import './App.css';
import 'primeicons/primeicons.css';
import "primereact/resources/themes/vela-blue/theme.css";

import { UsuarioService } from './services/UsuarioService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Component } from 'react';
import { Panel } from 'primereact/panel';
        
        
      
export default class App extends Component{
    constructor(){
        super();
        this.state= {};
        this.usuarioService= new UsuarioService();
    }
    componentDidMount(){
        this.usuarioService.getAll().then(data => this.setState({usuarios: data}))
    }

    render(){
        return(
        <Panel header="Gestion de Usuarios Zapateria JM" style={{width:'80%', margin:'40px auto 0px'}}>
        <DataTable value={this.state.usuarios} >
            <Column field='id' header='ID'></Column>
            <Column field='nombre' header='Nombres'></Column>
            <Column field='apellido' header='Apellidos'></Column>
            <Column field='email' header='Correo'></Column>
            <Column field='telefono' header='Telefono'></Column>
        </DataTable>
        </Panel>
        );
    }
}
