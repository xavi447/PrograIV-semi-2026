const autores = {
    props:['forms'],
    data(){
        return{
            autor:{
                idAutor:0,
                codigo:"",
                nombre:"",
                pais:"",
                telefono:"",
                hash:""
            },
            accion:'nuevo',
            idAutor:0,
            data_autores:[]
        }
    },
    methods:{
        buscarAutor(){
            this.forms.busqueda_autores.mostrar = !this.forms.busqueda_autores.mostrar;
            this.$emit('buscar');
        },
        modificarAutor(autor){
            this.accion = 'modificar';
            this.idAutor = autor.idAutor;
            this.autor.codigo = autor.codigo;
            this.autor.nombre = autor.nombre;
            this.autor.pais = autor.pais;
            this.autor.telefono = autor.telefono;
        },
        async guardarAutor() {
            let datos = {
                idAutor: this.accion=='modificar' ? this.idAutor : this.getId(),
                codigo: this.autor.codigo,
                nombre: this.autor.nombre,
                pais: this.autor.pais,
                telefono: this.autor.telefono,
            };
            datos.hash=sha256(JSON.stringify(datos));
            this.buscar = datos.codigo;

            if(this.data_autores.length > 0 && this.accion=='nuevo'){
                alertify.error(`El codigo del autor ya existe, ${this.data_autores[0].nombre}`);
                return;
            }
            db.autores.put(datos);
            this.limpiarFormulario();
            alertify.success(`${datos.nombre} guardado correctamente`);
        },
        getId(){
            return new Date().getTime();
        },
        limpiarFormulario(){
            this.accion = 'nuevo';
            this.idAutor = 0;
            this.autor.codigo = '';
            this.autor.nombre = '';
            this.autor.pais = '';
            this.autor.telefono = '';
        },
    },
    template: `
        <div class="row">
            <div class="col-6">
                <form id="frmAutores" @submit.prevent="guardarAutor" @reset.prevent="limpiarFormulario">
                   <div class="card text-bg-secondary mb-3" style="max-width: 38rem;">
                        <div class="card-header">REGISTRO DE AUTORES</div>
                        <div class="card-body">
                            <div class="row p-1">
                                <div class="col-3">
                                    CODIGO:
                                </div>
                                <div class="col-3">
                                    <input placeholder="codigo" required v-model="autor.codigo" type="text" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3">
                                    NOMBRE:
                                </div>
                                <div class="col-6">
                                    <input placeholder="nombre" required v-model="autor.nombre" type="text" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3">
                                    PAIS:
                                </div>
                                <div class="col-6">
                                    <input placeholder="pais" required v-model="autor.pais" type="text" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3">
                                    TELEFONO:
                                </div>
                                <div class="col-4">
                                    <input placeholder="telefono" required v-model="autor.telefono" type="text" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="card-footer">
                            <div class="row">
                                <div class="col text-center">
                                    <button type="submit" id="btnGuardarAutor" class="btn btn-primary">GUARDAR</button>
                                    <button type="reset" id="btnCancelarAutor" class="btn btn-warning">NUEVO</button>
                                    <button type="button" @click="buscarAutor" id="btnBuscarAutor" class="btn btn-success">BUSCAR</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `
};