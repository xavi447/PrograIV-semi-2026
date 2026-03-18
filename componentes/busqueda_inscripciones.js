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
            this.inscripciones = await db.inscripciones.orderBy('codigo_alumno').filter(
                inscripcion => inscripcion.codigo_alumno?.toLowerCase().includes(this.buscar.toLowerCase())
                    || String(inscripcion.materia)?.toLowerCase().includes(this.buscar.toLowerCase())
                    || inscripcion.ciclo_periodo?.toLowerCase().includes(this.buscar.toLowerCase())
                    || inscripcion.observaciones?.toLowerCase().includes(this.buscar.toLowerCase())
            ).toArray();
            if (this.inscripciones.length < 1 && this.buscar.length <= 0) {
                fetch(`private/modulos/inscripciones/inscripcion.php?accion=consultar`)
                    .then(response => response.json())
                    .then(data => {
                        this.inscripciones = data;
                        db.inscripciones.bulkAdd(data);
                    });
            }
        },
        async eliminarInscripcion(inscripcion, e) {
            e.stopPropagation();
            alertify.confirm('Eliminar inscripcion', `¿Está seguro de eliminar la inscripcion ${inscripcion.idInscripcion}?`, async e => {
                await db.inscripciones.delete(inscripcion.idInscripcion);
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