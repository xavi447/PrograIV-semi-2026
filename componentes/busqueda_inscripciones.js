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
            this.inscripciones = await db.inscripciones.filter(
                inscripcion =>
                    inscripcion.nombre_alumno.toLowerCase().includes(this.buscar.toLowerCase()) ||
                    inscripcion.dui.toString().includes(this.buscar) ||
                    inscripcion.carrera.toLowerCase().includes(this.buscar.toLowerCase()) ||
                    inscripcion.ciclo_periodo.toLowerCase().includes(this.buscar.toLowerCase()) ||
                    inscripcion.estado.toLowerCase().includes(this.buscar.toLowerCase())
            ).toArray();
        },
        async eliminarInscripcion(inscripcion, e) {
            e.stopPropagation();
            alertify.confirm('Eliminar inscripción',
                `¿Está seguro de eliminar la inscripción de ${inscripcion.nombre_alumno}?`,
                async () => {
                    await db.inscripciones.delete(inscripcion.idInscripcion);
                    this.obtenerInscripciones();
                    alertify.success(`Inscripción de ${inscripcion.nombre_alumno} eliminada correctamente`);
                }, () => {
                    // No hacer nada
                }
            );
        },
    },
    template: `
        <div>
            <div class="row mb-2">
                <div class="col-6">
                    <input v-model="buscar" type="text" class="form-control" placeholder="Buscar por nombre, DUI, carrera, ciclo...">
                </div>
                <div class="col-6">
                    <button @click="obtenerInscripciones" class="btn btn-primary">Buscar</button>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>NOMBRE ALUMNO</th>
                                <th>DUI</th>
                                <th>CARRERA</th>
                                <th>CICLO/PERIODO</th>
                                <th>FECHA INSCRIPCIÓN</th>
                                <th>ESTADO</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="inscripcion in inscripciones" :key="inscripcion.idInscripcion" @click="modificarInscripcion(inscripcion)">
                                <td>{{ inscripcion.nombre_alumno }}</td>
                                <td>{{ inscripcion.dui }}</td>
                                <td>{{ inscripcion.carrera }}</td>
                                <td>{{ inscripcion.ciclo_periodo }}</td>
                                <td>{{ inscripcion.fecha_inscripcion }}</td>
                                <td>
                                    <span :class="inscripcion.estado === 'activo' ? 'badge bg-success' : 'badge bg-danger'">
                                        {{ inscripcion.estado }}
                                    </span>
                                </td>
                                <td>
                                    <button class="btn btn-danger btn-sm" @click.stop="eliminarInscripcion(inscripcion, $event)">DEL</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `
};