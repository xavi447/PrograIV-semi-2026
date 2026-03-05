const libros = {
    props:['forms'],
    data(){
        return{
            libro:{
                idLibro:0,
                idAutor:0,
                isbn:"",
                titulo:"",
                editorial:"",
                edicion:"",
                hash:""
            },
            accion:'nuevo',
            idLibro:0,
            data_libros:[],
            autores:[]
        }
    },
    methods:{
        buscarLibro(){
            this.forms.busqueda_libros.mostrar = !this.forms.busqueda_libros.mostrar;
            this.$emit('buscar');
        },
        modificarLibro(libro){
            this.accion = 'modificar';
            this.idLibro = libro.idLibro;
            this.libro.idAutor = libro.idAutor;
            this.libro.isbn = libro.isbn;
            this.libro.titulo = libro.titulo;
            this.libro.editorial = libro.editorial;
            this.libro.edicion = libro.edicion;
        },
        async guardarLibro() {
            let datos = {
                idLibro: this.accion=='modificar' ? this.idLibro : this.getId(),
                idAutor: this.libro.idAutor,
                isbn: this.libro.isbn,
                titulo: this.libro.titulo,
                editorial: this.libro.editorial,
                edicion: this.libro.edicion,
            };
            datos.hash=sha256(JSON.stringify(datos));
            this.buscar = datos.isbn;

            if(this.data_libros.length > 0 && this.accion=='nuevo'){
                alertify.error(`El ISBN del libro ya existe, ${this.data_libros[0].titulo}`);
                return;
            }
            db.libros.put(datos);
            this.limpiarFormulario();
            alertify.success(`${datos.titulo} guardado correctamente`);
        },
        getId(){
            return new Date().getTime();
        },
        limpiarFormulario(){
            this.accion = 'nuevo';
            this.idLibro = 0;
            this.libro.idAutor = 0;
            this.libro.isbn = '';
            this.libro.titulo = '';
            this.libro.editorial = '';
            this.libro.edicion = '';
        },
        async obtenerAutores(){
            this.autores = await db.autores.toArray();
        },
    },
    async mounted(){
        await this.obtenerAutores();
    },
    template: `
        <div class="row">
            <div class="col-6">
                <form id="frmLibros" @submit.prevent="guardarLibro" @reset.prevent="limpiarFormulario">
                   <div class="card text-bg-secondary mb-3" style="max-width: 38rem;">
                        <div class="card-header">REGISTRO DE LIBROS</div>
                        <div class="card-body">
                            <div class="row p-1">
                                <div class="col-3">
                                    AUTOR:
                                </div>
                                <div class="col-6">
                                    <select required v-model="libro.idAutor" class="form-select">
                                        <option value="0">Seleccionar autor</option>
                                        <option v-for="autor in autores" :key="autor.idAutor" :value="autor.idAutor">{{ autor.nombre }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3">
                                    ISBN:
                                </div>
                                <div class="col-4">
                                    <input placeholder="isbn" required v-model="libro.isbn" type="text" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3">
                                    TITULO:
                                </div>
                                <div class="col-6">
                                    <input placeholder="titulo" required v-model="libro.titulo" type="text" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3">
                                    EDITORIAL:
                                </div>
                                <div class="col-6">
                                    <input placeholder="editorial" required v-model="libro.editorial" type="text" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3">
                                    EDICION:
                                </div>
                                <div class="col-4">
                                    <input placeholder="edicion" required v-model="libro.edicion" type="text" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="card-footer">
                            <div class="row">
                                <div class="col text-center">
                                    <button type="submit" id="btnGuardarLibro" class="btn btn-primary">GUARDAR</button>
                                    <button type="reset" id="btnCancelarLibro" class="btn btn-warning">NUEVO</button>
                                    <button type="button" @click="buscarLibro" id="btnBuscarLibro" class="btn btn-success">BUSCAR</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `
};