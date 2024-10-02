import './App.css';
import 'primeicons/primeicons.css';
import "primereact/resources/themes/vela-blue/theme.css";
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

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            usuario: this.resetUsuario(),
            selectedUsuario: null,
            usuarios: []
        };

        this.items = [
            {
                label: "Nuevo",
                icon: "pi pi-fw pi-user-plus",
                command: () => { this.showSaveDialog() }
            },
            {
                label: "Editar",
                icon: "pi pi-fw pi-user-edit",
                command: () => { this.showEditDialog() }
            },
            {
                label: "Eliminar",
                icon: "pi pi-fw pi-user-minus",
                command: () => { this.delete() }
            }
        ];

        this.usuarioService = new UsuarioService();
        this.save = this.save.bind(this);
        this.footer = (
            <div>
                <Button label="Guardar" icon="pi pi-check" onClick={this.save} />
            </div>
        );
        this.Toast = React.createRef();
    }

    resetUsuario() {
        return {
            id: null,
            nombre: null,
            apellido: null,
            cc: null,
            email: null,
            telefono: null
        };
    }

    componentDidMount() {
        this.usuarioService.getAll().then(data => this.setState({ usuarios: data }));
    }

    save() {
        this.usuarioService.save(this.state.usuario).then(data => {
            this.setState({
                visible: false,
                usuario: this.resetUsuario()
            });
            this.Toast.current.show({ severity: "success", summary: "Atención", detail: "El registro se guardó correctamente" });
            this.usuarioService.getAll().then(data => this.setState({ usuarios: data }));
        });
    }

    delete() {
        if (this.state.selectedUsuario && window.confirm("¿Desea eliminar el registro?")) {
            this.usuarioService.delete(this.state.selectedUsuario.id).then(data => {
                this.Toast.current.show({ severity: "success", summary: "Atención", detail: "Se eliminó el registro correctamente" });
                this.usuarioService.getAll().then(data => this.setState({ usuarios: data }));
            });
        }
    }

    updateUsuarioField(field, value) {
        this.setState(prevState => {
            let usuario = { ...prevState.usuario };
            usuario[field] = value;
            return { usuario };
        });
    }

    render() {
        return (
            <div style={{ width: '80%', margin: '40px auto 0px' }}>
                <Menubar model={this.items} />
                <br />
                <Panel header="Gestión de Usuarios Zapatería JM">
                    <DataTable
                        value={this.state.usuarios}
                        paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
                        selectionMode="single"
                        selection={this.state.selectedUsuario}
                        onSelectionChange={(e) => this.setState({ selectedUsuario: e.value })}
                    >
                        <Column field="id" header="ID"></Column>
                        <Column field="nombre" header="Nombres"></Column>
                        <Column field="apellido" header="Apellidos"></Column>
                        <Column field="cc" header="Cedula"></Column>
                        <Column field="email" header="Correo"></Column>
                        <Column field="telefono" header="Teléfono"></Column>
                    </DataTable>
                </Panel>

                <Dialog header="Usuarios" visible={this.state.visible} style={{ width: '400px' }} footer={this.footer} modal={true} onHide={() => this.setState({ visible: false })}>
                    <FloatLabel>
                        <InputText style={{ width: "100%" }} value={this.state.usuario.id} id="id" onChange={(e) => this.updateUsuarioField('id', e.target.value)} />
                        <label htmlFor="id">ID Usuario</label>
                    </FloatLabel> <br />
                    
                    <FloatLabel>
                        <InputText style={{ width: "100%" }} value={this.state.usuario.nombre} id="nombre" onChange={(e) => this.updateUsuarioField('nombre', e.target.value)} />
                        <label htmlFor="nombre">Nombre</label>
                    </FloatLabel> <br />
                    
                    <FloatLabel>
                        <InputText style={{ width: "100%" }} value={this.state.usuario.apellido} id="apellido" onChange={(e) => this.updateUsuarioField('apellido', e.target.value)} />
                        <label htmlFor="apellido">Apellido</label>
                    </FloatLabel> <br />

                    <FloatLabel>
                        <InputText style={{ width: "100%" }} value={this.state.usuario.cc} id="cc" onChange={(e) => this.updateUsuarioField('cc', e.target.value)} />
                        <label htmlFor="cc">Cedula</label>
                    </FloatLabel> <br />
                    
                    <FloatLabel>
                        <InputText style={{ width: "100%" }} value={this.state.usuario.email} id="email" onChange={(e) => this.updateUsuarioField('email', e.target.value)} />
                        <label htmlFor="email">Email</label>
                    </FloatLabel> <br />
                    
                    <FloatLabel>
                        <InputText style={{ width: "100%" }} value={this.state.usuario.telefono} id="telefono" onChange={(e) => this.updateUsuarioField('telefono', e.target.value)} />
                        <label htmlFor="telefono">Teléfono</label>
                    </FloatLabel> <br />
                </Dialog>

                <Toast ref={this.Toast} />
            </div>
        );
    }

    showSaveDialog() {
        this.setState({
            visible: true,
            usuario: this.resetUsuario()
        });
    }

    showEditDialog() {
        if (this.state.selectedUsuario) {
            this.setState({
                visible: true,
                usuario: { ...this.state.selectedUsuario }
            });
        } else {
            this.Toast.current.show({ severity: "warn", summary: "Atención", detail: "Seleccione un usuario para editar" });
        }
    }
}
