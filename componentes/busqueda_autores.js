const busqueda_autores = {
    data(){
        return{
            buscar:'',
            autores:[]
        }
    },
    methods:{
        modificarAutor(autor){
            this.$emit('modificar', autor);
        },
        async obtenerAutores(){
            this.autores = await db.autores.filter(
                autor => autor.codigo.toLowerCase().includes(this.buscar.toLowerCase())
                    || autor.nombre.toLowerCase().includes(this.buscar.toLowerCase())
            ).toArray();
        },
        async eliminarAutor(autor, e){
            e.stopPropagation();
            alertify.confirm('Eliminar autor', `¿Está seguro de eliminar el autor ${autor.nombre}?`, async e=>{
                await db.autores.delete(autor.idAutor);
                this.obtenerAutores();
                alertify.success(`Autor ${autor.nombre} eliminado correctamente`);
            }, () => {
                //No hacer nada
            });
        },
    },
    template: `
        <div class="row">
            <div class="col-6">
                <table class="table table-success table-striped" id="tblAutores">
                    <thead>
                        <tr>
                            <th colspan="6">
                                <input autocomplete="off" type="search" @keyup="obtenerAutores()" v-model="buscar" placeholder="Buscar autor" class="form-control">
                            </th>
                        </tr>
                        <tr>
                            <th>CODIGO</th>
                            <th>NOMBRE</th>
                            <th>PAIS</th>
                            <th>TELEFONO</th>
                            <th>HASH</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="autor in autores" :key="autor.idAutor" @click="modificarAutor(autor)">
                            <td>{{ autor.codigo }}</td>
                            <td>{{ autor.nombre }}</td>
                            <td>{{ autor.pais }}</td>
                            <td>{{ autor.telefono }}</td>
                            <td>{{ autor.hash }}</td>
                            <td>
                                <button class="btn btn-danger" @click="eliminarAutor(autor, $event)">DEL</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `
};