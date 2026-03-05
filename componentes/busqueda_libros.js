const busqueda_libros = {
    data(){
        return{
            buscar:'',
            libros:[],
            autores:[]
        }
    },
    methods:{
        modificarLibro(libro){
            this.$emit('modificar', libro);
        },
        async obtenerLibros(){
            this.libros = await db.libros.filter(
                libro => libro.isbn.toLowerCase().includes(this.buscar.toLowerCase())
                    || libro.titulo.toLowerCase().includes(this.buscar.toLowerCase())
            ).toArray();
        },
        async eliminarLibro(libro, e){
            e.stopPropagation();
            alertify.confirm('Eliminar libro', `¿Está seguro de eliminar el libro ${libro.titulo}?`, async e=>{
                await db.libros.delete(libro.idLibro);
                this.obtenerLibros();
                alertify.success(`Libro ${libro.titulo} eliminado correctamente`);
            }, () => {
                //No hacer nada
            });
        },
        nombreAutor(idAutor){
            const autor = this.autores.find(a => a.idAutor === idAutor);
            return autor ? autor.nombre : '';
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
            <div class="col-8">
                <table class="table table-success table-striped" id="tblLibros">
                    <thead>
                        <tr>
                            <th colspan="7">
                                <input autocomplete="off" type="search" @keyup="obtenerLibros()" v-model="buscar" placeholder="Buscar libro" class="form-control">
                            </th>
                        </tr>
                        <tr>
                            <th>AUTOR</th>
                            <th>ISBN</th>
                            <th>TITULO</th>
                            <th>EDITORIAL</th>
                            <th>EDICION</th>
                            <th>HASH</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="libro in libros" :key="libro.idLibro" @click="modificarLibro(libro)">
                            <td>{{ nombreAutor(libro.idAutor) }}</td>
                            <td>{{ libro.isbn }}</td>
                            <td>{{ libro.titulo }}</td>
                            <td>{{ libro.editorial }}</td>
                            <td>{{ libro.edicion }}</td>
                            <td>{{ libro.hash }}</td>
                            <td>
                                <button class="btn btn-danger" @click="eliminarLibro(libro, $event)">DEL</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `
};