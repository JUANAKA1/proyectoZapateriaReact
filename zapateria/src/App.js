import './App.css';
import 'primeicons/primeicons.css';
import "primereact/resources/themes/vela-blue/theme.css";
import 'primeicons/primeicons.css';
        

import { UsuarioService } from './services/UsuarioService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Component } from 'react';
import { Panel } from 'primereact/panel';
import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { MessageSeverity } from 'primereact/api';
      
export default class App extends Component{
    constructor(){
        super();
        this.state= {
            visible:false,
            usuario:{
                id:null,
                nombre:null,
                apellido:null,
                email:null,
                telefono:null
            },
            selectedUsuario:{

            }
        };
        this.items=[
            {
                label:"Nuevo",
                icon:"pi pi-fw pi-user-plus",
                command: ()=> {this.showSaveDialog()}
            },
            {
                label:"Editar",
                icon:"pi pi-fw pi-user-edit",
                command: ()=> {alert('Editar!')}
            },
            {
                label:"Eliminar",
                icon:"pi pi-fw pi-user-minus",
                command: ()=> {this.delete()}
            }
        ];

        this.usuarioService= new UsuarioService();
        this.save= this.save.bind(this);
        this.footer=(
            <div>
                <Button label="Guardar" icon="pi pi-check" onClick={this.save}/>
            </div>
        )
        this.Toast = React.createRef();
    }
    componentDidMount(){
        this.usuarioService.getAll().then(data => this.setState({usuarios: data}))
        
    }

    save(){
        this.usuarioService.save(this.state.usuario).then(data =>{ 
            this.setState({
                visible: false,
                usuario:{
                    id:null,
                    nombre:null,
                    apellido:null,
                    email:null,
                    telefono:null
                }
            });
            this.Toast.current.show({severity:"success", summary:"Atencion!", detail:"El registro se guardó correctamente",});
            this.usuarioService.getAll().then(data => this.setState({usuarios: data}))
        })
    }
    delete(){
        if(window.confirm("¿Desea eliminar el registro?")){
            this.usuarioService.delete(this.state.selectedUsuario.id).then(data=> { 
                this.Toast.current.show({severity:"success", summary:"Atencion!", detail:"Se elimino el registro correctamente",});
                this.usuarioService.getAll().then(data => this.setState({usuarios: data}))
            })
        }
    }
    render(){
        return(
        <div style={{width:'80%', margin:'40px auto 0px'}}>
            <Menubar model={this.items}/>
            <br/>
            <Panel header="Gestion de Usuarios Zapateria JM" >
            <DataTable value={this.state.usuarios} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} selectionMode="single" selection={this.state.selectedUsuario}
            onSelectionChange={(e)=> this.setState({selectedUsuario: e.value})}>
                <Column field='id' header='ID'></Column>
                <Column field='nombre' header='Nombres'></Column>
                <Column field='apellido' header='Apellidos'></Column>
                <Column field='email' header='Correo'></Column>
                <Column field='telefono' header='Telefono'></Column>
            </DataTable>
            </Panel>
            <Dialog header="Usuarios" visible={this.state.visible} style={{ width: '400px' }} footer={this.footer} modal={true} onHide={() => this.setState({visible:false})}>

            <FloatLabel>
            <InputText style={{width: "100%"}} value={this.state.value} id= 'id' onChange={(e) => {
                let val = e.target.value;

                this.setState(prevState =>{
                let usuario= Object.assign({}, prevState.usuario);
                usuario.id= val;
                return{usuario};
            })}}/>
            <label htmlFor="id">id usuario</label>
            </FloatLabel> <br/>

            <FloatLabel>
            <InputText style={{width: "100%"}} value={this.state.value} id= 'nombre' onChange={(e) => {
                let val = e.target.value;
                
                this.setState(prevState =>{
                let usuario= Object.assign({}, prevState.usuario);
                usuario.nombre= val;
                return{usuario};
            })}
            }/>
            <label htmlFor="nombre">Nombre</label>
            </FloatLabel> <br/>

            <FloatLabel>
            <InputText style={{width: "100%"}} value={this.state.value} id= 'apellido' onChange={(e) => {
                let val = e.target.value;
                
                this.setState(prevState =>{
                let usuario= Object.assign({}, prevState.usuario);
                usuario.apellido= val;
                return{usuario};
            })}
            }/>
            <label htmlFor="apellido">Apellido</label>
            </FloatLabel> <br/>

            <FloatLabel>
            <InputText style={{width: "100%"}} value={this.state.value} id= 'email' onChange={(e) => {
                let val = e.target.value;
                
                this.setState(prevState =>{
                let usuario= Object.assign({}, prevState.usuario);
                usuario.email= val;
                return{usuario};
            })}
            }/>
            <label htmlFor="email">Email</label>
            </FloatLabel> <br/>

            <FloatLabel>
            <InputText style={{width: "100%"}} value={this.state.value} id= 'telefono' onChange={(e) => {
                let val = e.target.value;
                
                this.setState(prevState =>{
                let usuario= Object.assign({}, prevState.usuario);
                usuario.telefono= val;
                return{usuario};
            })}
            }/>
            <label htmlFor="telefono">Telefono</label>
            </FloatLabel> <br/>
            </Dialog>
            <Toast ref={this.Toast}/> 
        </div>
        );
    }
    showSaveDialog(){
        this.setState({
            visible:true,
            usuario:{
                id:null,
                nombre:null,
                apellido:null,
                email:null,
                telefono:null
            }
        });
    }
}
