const busqueda_inscripciones = {
    props: ['forms'],
    data() {
        return {
            buscar: '',
            inscripciones: []
        }
    },
    methods: {
        modificarInscripcion(inscripcion) {
            this.$emit('modificar', inscripcion);
        },
        async obtenerInscripciones() {
            let query = `SELECT * FROM inscripciones ORDER BY codigo_alumno`;
            if (this.buscar.length > 0) {
                const search = `%${this.buscar.toLowerCase()}%`;
                query = `SELECT * FROM inscripciones WHERE LOWER(codigo_alumno) LIKE ? OR LOWER(materia) LIKE ? OR LOWER(ciclo_periodo) LIKE ? OR LOWER(observaciones) LIKE ? ORDER BY codigo_alumno`;
                this.inscripciones = db.select(query, [search, search, search, search]);
            } else {
                this.inscripciones = db.select(query);
                if (this.inscripciones.length === 0) {
                    fetch(`private/modulos/inscripciones/inscripcion.php?accion=consultar`)
                        .then(response => response.json())
                        .then(async data => {
                            this.inscripciones = data;
                            for (const item of data) {
                                await db.execute(
                                    `INSERT OR REPLACE INTO inscripciones (idInscripcion, codigo_alumno, materia, fecha_inscripcion, ciclo_periodo, observaciones) VALUES (?, ?, ?, ?, ?, ?)`,
                                    [item.idInscripcion, item.codigo_alumno, item.materia, item.fecha_inscripcion, item.ciclo_periodo, item.observaciones]
                                );
                            }
                        });
                }
            }
        },
        async eliminarInscripcion(inscripcion, e) {
            e.stopPropagation();
            alertify.confirm('Eliminar inscripcion', `¿Está seguro de eliminar la inscripcion ${inscripcion.idInscripcion}?`, async e => {
                await db.execute(`DELETE FROM inscripciones WHERE idInscripcion = ?`, [inscripcion.idInscripcion]);
                fetch(`private/modulos/inscripciones/inscripcion.php?accion=eliminar&inscripciones=${JSON.stringify(inscripcion)}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data != true) alertify.error(`Error al sincronizar con el servidor: ${data}`);
                    });
                this.obtenerInscripciones();
                alertify.success(`Inscripcion eliminada correctamente`);
            }, () => {
                //No hacer nada
            });
        },
    },
    template: `
        <div class="row">
            <div class="col-12">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th colspan="5">
                                <input autocomplete="off" type="search" @keyup="obtenerInscripciones()" v-model="buscar" placeholder="Buscar inscripcion" class="form-control">
                            </th>
                        </tr>
                        <tr>
                            <th>CÓDIGO ALUMNO</th>
                            <th>MATERIA</th>
                            <th>FECHA</th>
                            <th>CICLO</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="inscripcion in inscripciones" :key="inscripcion.idInscripcion" @click="modificarInscripcion(inscripcion)">
                            <td>{{ inscripcion.codigo_alumno }}</td>
                            <td>{{ inscripcion.materia }}</td>
                            <td>{{ inscripcion.fecha_inscripcion }}</td>
                            <td>{{ inscripcion.ciclo_periodo }}</td>
                            <td>
                                <button class="btn btn-danger" @click="eliminarInscripcion(inscripcion, $event)">DEL</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `
};