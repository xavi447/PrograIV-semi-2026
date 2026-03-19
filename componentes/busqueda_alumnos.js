const busqueda_alumnos = {
    data(){
        return{
            buscar:'',
            alumnos:[]
        }
    },
    
    methods:{
        modificarAlumno(alumno){
            this.$emit('modificar', alumno);
        },
        async obtenerAlumnos(){
            let query = `SELECT * FROM alumnos`;
            if (this.buscar.length > 0) {
                const search = `%${this.buscar.toLowerCase()}%`;
                query += ` WHERE LOWER(codigo) LIKE ? OR LOWER(nombre) LIKE ?`;
                this.alumnos = db.select(query, [search, search]);
            } else {
                this.alumnos = db.select(query);
                if (this.alumnos.length === 0) {
                    fetch(`private/modulos/alumnos/alumno.php?accion=consultar`)
                        .then(response=>response.json())
                        .then(async data=>{
                            this.alumnos = data;
                            for (const item of data) {
                                await db.execute(
                                    `INSERT OR REPLACE INTO alumnos (idAlumno, codigo, nombre, direccion, email, telefono) VALUES (?, ?, ?, ?, ?, ?)`,
                                    [item.idAlumno, item.codigo, item.nombre, item.direccion, item.email, item.telefono]
                                );
                            }
                        });
                }
            }
        },
        async eliminarAlumno(alumno, e){
            e.stopPropagation();
            alertify.confirm('Elimanar alumnos', `¿Está seguro de eliminar el alumno ${alumno.nombre}?`, async e=>{
                await db.execute(`DELETE FROM alumnos WHERE idAlumno = ?`, [alumno.idAlumno]);
                fetch(`private/modulos/alumnos/alumno.php?accion=eliminar&alumnos=${JSON.stringify(alumno)}`)
                    .then(response=>response.json())
                    .then(data=>{
                        if(data!=true) alertify.error(`Error al sincronizar con el servidor: ${data}`);
                    });
                this.obtenerAlumnos();
                alertify.success(`Alumno ${alumno.nombre} eliminado correctamente`);
            }, () => {
                //No hacer nada
            });
        },
    },
    template: `
        <div class="row">
            <div class="col-6">
                <table class="table table-striped table-hover" id="tblAlumnos">
                    <thead>
                        <tr>
                            <th colspan="6">
                                <input autocomplete="off" type="search" @keyup="obtenerAlumnos()" v-model="buscar" placeholder="Buscar alumno" class="form-control">
                            </th>
                        </tr>
                        <tr>
                            <th>CODIGO</th>
                            <th>NOMBRE</th>
                            <th>DIRECCION</th>
                            <th>EMAIL</th>
                            <th>TELEFONO</th>
                            <th>HASH</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="alumno in alumnos" :key="alumno.idAlumno" @click="modificarAlumno(alumno)">
                            <td>{{ alumno.codigo }}</td>
                            <td>{{ alumno.nombre }}</td>
                            <td>{{ alumno.direccion }}</td>
                            <td>{{ alumno.email }}</td>
                            <td>{{ alumno.telefono }}</td>
                            <td>{{ alumno.hash }}</td>
                            <td>
                                <button class="btn btn-danger" @click="eliminarAlumno(alumno, $event)">DEL</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `
};