const busqueda_materias = {
    data(){
        return{
            buscar:'',
            materias:[]
        }
    },
    methods:{
        modificarMateria(materia){
            this.$emit('modificar', materia);
        },
        async obtenerMaterias(){
            let query = `SELECT * FROM materias ORDER BY codigo`;
            if (this.buscar.length > 0) {
                const search = `%${this.buscar.toLowerCase()}%`;
                query = `SELECT * FROM materias WHERE LOWER(codigo) LIKE ? OR LOWER(nombre) LIKE ? ORDER BY codigo`;
                this.materias = db.select(query, [search, search]);
            } else {
                this.materias = db.select(query);
                if (this.materias.length === 0) {
                    fetch(`private/modulos/materias/materia.php?accion=consultar`)
                        .then(response=>response.json())
                        .then(async data=>{
                            this.materias = data;
                            for (const item of data) {
                                await db.execute(
                                    `INSERT OR REPLACE INTO materias (idMateria, codigo, nombre, uv) VALUES (?, ?, ?, ?)`,
                                    [item.idMateria, item.codigo, item.nombre, item.uv]
                                );
                            }
                        });
                }
            }
        },
        async eliminarMateria(materia, e){
            e.stopPropagation();
            alertify.confirm('Eliminar materias', `¿Está seguro de eliminar el materia ${materia.nombre}?`, async e=>{
                await db.execute(`DELETE FROM materias WHERE idMateria = ?`, [materia.idMateria]);
                fetch(`private/modulos/materias/materia.php?accion=eliminar&materias=${JSON.stringify(materia)}`)
                    .then(response=>response.json())
                    .then(data=>{
                        if(data!=true) alertify.error(`Error al sincronizar con el servidor: ${data}`);
                    });
                this.obtenerMaterias();
                alertify.success(`Materia ${materia.nombre} eliminada correctamente`);
            }, () => {
                //No hacer nada
            });
        },
    },
    template: `
        <div class="row">
            <div class="col-6">
                <table class="table table-striped table-hover" id="tblMaterias">
                    <thead>
                        <tr>
                            <th colspan="6">
                                <input autocomplete="off" type="search" @keyup="obtenerMaterias()" v-model="buscar" placeholder="Buscar materia" class="form-control">
                            </th>
                        </tr>
                        <tr>
                            <th>CODIGO</th>
                            <th>NOMBRE</th>
                            <th>UV</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="materia in materias" :key="materia.idMateria" @click="modificarMateria(materia)">
                            <td>{{ materia.codigo }}</td>
                            <td>{{ materia.nombre }}</td>
                            <td>{{ materia.uv }}</td>
                            <td>
                                <button class="btn btn-danger" @click="eliminarMateria(materia, $event)">DEL</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `
};