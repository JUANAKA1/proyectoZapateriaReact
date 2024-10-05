// Importaciones de archivos CSS y temas para el estilo de la aplicación
import './App.css'; // Estilos personalizados de la aplicación
import 'primeicons/primeicons.css'; // Iconos de PrimeReact
import "primereact/resources/themes/vela-blue/theme.css"; // Tema 'vela-blue' para PrimeReact

// Importación de servicios y componentes necesarios
import { UsuarioService } from './services/UsuarioService'; // Servicio para gestionar usuarios
import { DataTable } from 'primereact/datatable'; // Componente de tabla de datos de PrimeReact
import { Column } from 'primereact/column'; // Componente para definir columnas en la tabla
import { Component } from 'react'; // Componente base de React
import { Panel } from 'primereact/panel'; // Panel para agrupar contenido
import React from 'react'; // Biblioteca principal de React
import { Menubar } from 'primereact/menubar'; // Barra de menú de PrimeReact
import { Dialog } from 'primereact/dialog'; // Diálogo modal de PrimeReact
import { InputText } from 'primereact/inputtext'; // Campo de entrada de texto
import { FloatLabel } from 'primereact/floatlabel'; // Etiqueta flotante para los inputs
import { Button } from 'primereact/button'; // Botón de PrimeReact
import { Toast } from 'primereact/toast'; // Componente para mostrar notificaciones

// Componente principal de la aplicación
export default class App extends Component {
    constructor() {
        super();
        // Estado inicial de la aplicación
        this.state = {
            visible: false, // Controla la visibilidad del diálogo modal
            usuario: this.resetUsuario(), // Objeto usuario con campos vacíos
            selectedUsuario: null, // Usuario seleccionado en la tabla
            usuarios: [] // Lista de usuarios cargados
        };

        // Elementos del menú superior
        this.items = [
            {
                label: "Nuevo",
                icon: "pi pi-fw pi-user-plus", // Icono de agregar usuario
                command: () => { this.showSaveDialog() } // Comando para abrir el diálogo de guardado
            },
            {
                label: "Editar",
                icon: "pi pi-fw pi-user-edit", // Icono de edición de usuario
                command: () => { this.showEditDialog() } // Comando para abrir el diálogo de edición
            },
            {
                label: "Eliminar",
                icon: "pi pi-fw pi-user-minus", // Icono para eliminar usuario
                command: () => { this.delete() } // Comando para eliminar el usuario seleccionado
            }
        ];

        this.usuarioService = new UsuarioService(); // Instancia del servicio de usuario
        this.save = this.save.bind(this); // Enlaza la función de guardar al contexto actual

        // Pie de página del diálogo con un botón de guardar
        this.footer = (
            <div>
                <Button label="Guardar" icon="pi pi-check" onClick={this.save} />
            </div>
        );
        this.Toast = React.createRef(); // Referencia para el componente Toast (notificaciones)
    }

    // Función que inicializa los campos del usuario con valores vacíos
    resetUsuario() {
        return {
            id: null,
            nombre: null,
            apellido: null,
            cc: null, // Cédula de ciudadanía
            email: null,
            telefono: null
        };
    }

    // Llama al servicio de usuario para cargar la lista de usuarios al montar el componente
    componentDidMount() {
        this.usuarioService.getAll().then(data => this.setState({ usuarios: data }));
    }

    // Función para guardar un usuario
    save() {
        this.usuarioService.save(this.state.usuario).then(data => {
            this.setState({
                visible: false, // Oculta el diálogo tras guardar
                usuario: this.resetUsuario() // Resetea los campos del formulario
            });
            // Muestra una notificación de éxito
            this.Toast.current.show({ severity: "success", summary: "Atención", detail: "El registro se guardó correctamente" });
            // Recarga la lista de usuarios
            this.usuarioService.getAll().then(data => this.setState({ usuarios: data }));
        });
    }

    // Función para eliminar un usuario
    delete() {
        if (this.state.selectedUsuario && window.confirm("¿Desea eliminar el registro?")) {
            this.usuarioService.delete(this.state.selectedUsuario.id).then(data => {
                // Muestra una notificación de éxito tras eliminar
                this.Toast.current.show({ severity: "success", summary: "Atención", detail: "Se eliminó el registro correctamente" });
                // Recarga la lista de usuarios
                this.usuarioService.getAll().then(data => this.setState({ usuarios: data }));
            });
        }
    }

    // Actualiza los campos del formulario de usuario conforme se editan
    updateUsuarioField(field, value) {
        this.setState(prevState => {
            let usuario = { ...prevState.usuario }; // Crea una copia del objeto usuario
            usuario[field] = value; // Actualiza el campo correspondiente
            return { usuario }; // Retorna el nuevo estado
        });
    }

    // Renderiza el contenido del componente
    render() {
        return (
            <div style={{ width: '80%', margin: '40px auto 0px' }}>
                <Menubar model={this.items} /> {/* Barra de menú con opciones */}
                <br />
                <Panel header="Gestión de Usuarios Zapatería JM"> {/* Panel con título */}
                    <DataTable
                        value={this.state.usuarios} // Lista de usuarios cargados
                        paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} // Paginación
                        selectionMode="single" // Permite seleccionar un usuario a la vez
                        selection={this.state.selectedUsuario} // Usuario seleccionado
                        onSelectionChange={(e) => this.setState({ selectedUsuario: e.value })} // Maneja el cambio de selección
                    >
                        <Column field="id" header="ID"></Column> {/* Columna para ID */}
                        <Column field="nombre" header="Nombres"></Column> {/* Columna para nombres */}
                        <Column field="apellido" header="Apellidos"></Column> {/* Columna para apellidos */}
                        <Column field="cc" header="Cedula"></Column> {/* Columna para cédula */}
                        <Column field="email" header="Correo"></Column> {/* Columna para correo */}
                        <Column field="telefono" header="Teléfono"></Column> {/* Columna para teléfono */}
                    </DataTable>
                </Panel>

                {/* Diálogo modal para crear o editar un usuario */}
                <Dialog header="Usuarios" visible={this.state.visible} style={{ width: '400px' }} footer={this.footer} modal={true} onHide={() => this.setState({ visible: false })}>
                    {/* Campos de formulario para los atributos del usuario */}
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

                <Toast ref={this.Toast} /> {/* Componente para notificaciones */}
            </div>
        );
    }

    // Muestra el diálogo para crear un nuevo usuario
    showSaveDialog() {
        this.setState({
            visible: true, // Muestra el diálogo
            usuario: this.resetUsuario() // Resetea los campos del formulario
        });
    }

    // Muestra el diálogo para editar un usuario seleccionado
    showEditDialog() {
        if (this.state.selectedUsuario) {
            this.setState({
                visible: true, // Muestra el diálogo
                usuario: { ...this.state.selectedUsuario } // Rellena los campos con los datos del usuario seleccionado
            });
        } else {
            // Muestra una notificación de advertencia si no se ha seleccionado un usuario
            this.Toast.current.show({ severity: "warn", summary: "Atención", detail: "Seleccione un usuario para editar" });
        }
    }
}
