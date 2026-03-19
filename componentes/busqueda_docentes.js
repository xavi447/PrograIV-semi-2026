const busqueda_docentes = {
    data(){
        return{
            buscar:'',
            docentes:[]
        }
    },
    methods:{
        modificarDocente(docente){
            this.$emit('modificar', docente);
        },
        async obtenerDocentes(){
            let query = `SELECT * FROM docentes`;
            if (this.buscar.length > 0) {
                const search = `%${this.buscar.toLowerCase()}%`;
                query += ` WHERE LOWER(codigo) LIKE ? OR LOWER(nombre) LIKE ?`;
                this.docentes = db.select(query, [search, search]);
            } else {
                this.docentes = db.select(query);
                if (this.docentes.length === 0) {
                    fetch(`private/modulos/docentes/docente.php?accion=consultar`)
                        .then(response=>response.json())
                        .then(async data=>{
                            this.docentes = data;
                            for (const item of data) {
                                await db.execute(
                                    `INSERT OR REPLACE INTO docentes (idDocente, codigo, nombre, direccion, email, telefono, escalafon) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                                    [item.idDocente, item.codigo, item.nombre, item.direccion, item.email, item.telefono, item.escalafon]
                                );
                            }
                        });
                }
            }
        },
        async eliminarDocente(docente, e){
            e.stopPropagation();
            alertify.confirm('Eliminar docentes', `¿Está seguro de eliminar el docente ${docente.nombre}?`, async e=>{
                await db.execute(`DELETE FROM docentes WHERE idDocente = ?`, [docente.idDocente]);

                fetch(`private/modulos/docentes/docente.php?accion=eliminar&docentes=${JSON.stringify(docente)}`)
                    .then(response=>response.json())
                    .then(data=>{
                        if(data!=true) alertify.error(`Error al sincronizar con el servidor: ${data}`);
                    });

                this.obtenerDocentes();
                alertify.success(`Docente ${docente.nombre} eliminado correctamente`);
            }, () => {});
        },
    },
    template: `
        <div class="row">
            <div class="col-6">
                <table class="table table-striped table-hover" id="tblDocentes">
                    <thead>
                        <tr>
                            <th colspan="7">
                                <input autocomplete="off" type="search" @keyup="obtenerDocentes()" v-model="buscar" placeholder="Buscar docente" class="form-control">
                            </th>
                        </tr>
                        <tr>
                            <th>CODIGO</th>
                            <th>NOMBRE</th>
                            <th>DIRECCION</th>
                            <th>EMAIL</th>
                            <th>TELEFONO</th>
                            <th>ESCALAFON</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="docente in docentes" :key="docente.idDocente" @click="modificarDocente(docente)">
                            <td>{{ docente.codigo }}</td>
                            <td>{{ docente.nombre }}</td>
                            <td>{{ docente.direccion }}</td>
                            <td>{{ docente.email }}</td>
                            <td>{{ docente.telefono }}</td>
                            <td>{{ docente.escalafon }}</td>
                            <td>
                                <button class="btn btn-danger" @click="eliminarDocente(docente, $event)">DEL</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `
};