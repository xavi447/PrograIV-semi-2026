const inscripciones = {
    props: ['forms'],

    data() {
        return {
            inscripcion: {
                idInscripcion: '',
                codigo_alumno: '',
                materia: '',
                fecha_inscripcion: '',
                ciclo_periodo: '',
                observaciones: '',
            },
            materias: [],
            accion: 'nuevo',
            idInscripcion: '',
        }
    },

    mounted() {
        this.cargarMaterias();
    },

    methods: {
        async cargarMaterias() {
            this.materias = db.select(`SELECT * FROM materias`);
        },

        buscarInscripcion() {
            this.forms.busqueda_inscripciones.mostrar =
                !this.forms.busqueda_inscripciones.mostrar;
            this.$emit('buscar');
        },

        modificarInscripcion(inscripcion) {
            this.accion = 'modificar';
            this.idInscripcion = inscripcion.idInscripcion;
            Object.assign(this.inscripcion, inscripcion);
        },

        limpiarFormulario() {
            this.accion = 'nuevo';
            this.idInscripcion = '';
            this.inscripcion = {
                idInscripcion: '',
                codigo_alumno: '',
                materia: '',
                fecha_inscripcion: '',
                ciclo_periodo: '',
                observaciones: '',
            };
        },


        seleccionarMateria() {
            let materia = this.materias.find(
                m => String(m.nombre) === String(this.inscripcion.materia)
            );
            if (materia) {
                this.inscripcion.materia = materia.nombre;
            } else {
                this.inscripcion.materia = '';
            }
        },

        async guardarInscripcion() {
            if (!this.inscripcion.codigo_alumno ||
                !this.inscripcion.materia ||
                !this.inscripcion.fecha_inscripcion ||
                !this.inscripcion.ciclo_periodo) {
                alertify.error('Complete todos los campos obligatorios');
                return;
            }

            try {
                let alumno = await fetch(`private/modulos/inscripciones/inscripcion.php?accion=validar_alumno&codigo=${this.inscripcion.codigo_alumno}`)
                    .then(response => response.json());

                if (!alumno) {
                    alertify.error('El código del alumno no existe');
                    return;
                }

                let datos = {
                    idInscripcion: this.accion === 'modificar' ? this.idInscripcion : this.getId(),
                    codigo_alumno: this.inscripcion.codigo_alumno,
                    materia: this.inscripcion.materia,
                    fecha_inscripcion: this.inscripcion.fecha_inscripcion,
                    ciclo_periodo: this.inscripcion.ciclo_periodo,
                    observaciones: this.inscripcion.observaciones,
                };

                await db.execute(
                    `INSERT OR REPLACE INTO inscripciones (idInscripcion, codigo_alumno, materia, fecha_inscripcion, ciclo_periodo, observaciones) VALUES (?, ?, ?, ?, ?, ?)`,
                    [datos.idInscripcion, datos.codigo_alumno, datos.materia, datos.fecha_inscripcion, datos.ciclo_periodo, datos.observaciones]
                );
                fetch(`private/modulos/inscripciones/inscripcion.php?accion=${this.accion}&inscripciones=${JSON.stringify(datos)}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data != true) alertify.error(`Error al sincronizar con el servidor: ${data}`);
                    });

                this.limpiarFormulario();
                alertify.success(`Inscripcion guardada correctamente`);
            } catch (error) {
                alertify.error(`Error al guardar: ${error.message}`);
                console.error('Error en guardarInscripcion:', error);
            }
        },

        getId() {
            return uuid.v4();
        }
    },

    template: `
        <div class="row">
            <div class="col-8">
                <form id="frmInscripciones" @submit.prevent="guardarInscripcion" @reset.prevent="limpiarFormulario">
                    <div class="card text-bg-secondary mb-3">
                        <div class="card-header">INSCRIPCIÓN DE MATERIAS</div>
                        <div class="card-body">

                            <div class="row p-1">
                                <div class="col-3">CÓDIGO ALUMNO:</div>
                                <div class="col-4">
                                    <input v-model="inscripcion.codigo_alumno" type="text" class="form-control">
                                </div>
                            </div>

                            <div class="row p-1">
                                <div class="col-3">MATERIA:</div>
                                <div class="col-6">
                                    <select v-model="inscripcion.materia" @change="seleccionarMateria" class="form-control" :disabled="materias.length === 0">
                                        <option value="">-- Seleccione Materia --</option>
                                        <option v-for="m in materias" :key="m.idMateria" :value="m.nombre">
                                            {{ m.codigo }} - {{ m.nombre }}
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div class="row p-1">
                                <div class="col-3">FECHA INSCRIPCIÓN:</div>
                                <div class="col-4">
                                    <input v-model="inscripcion.fecha_inscripcion" type="date" class="form-control">
                                </div>
                            </div>

                            <div class="row p-1">
                                <div class="col-3">CICLO/PERIODO:</div>
                                <div class="col-4">
                                    <select v-model="inscripcion.ciclo_periodo" class="form-control">
                                        <option value="" disabled>Seleccione ciclo</option>
                                        <option value="Ciclo 1-2026">Ciclo 1-2026</option>
                                        <option value="Ciclo 2-2026">Ciclo 2-2026</option>
                                    </select>
                                </div>
                            </div>

                            <div class="row p-1">
                                <div class="col-3">OBSERVACIONES:</div>
                                <div class="col-8">
                                    <textarea v-model="inscripcion.observaciones" class="form-control" rows="2"></textarea>
                                </div>
                            </div>

                        </div>
                        <div class="card-footer">
                            <div class="row">
                                <div class="col text-center">
                                    <button type="submit" id="btnGuardarInscripcion" class="btn btn-primary">GUARDAR</button>
                                    <button type="reset" id="btnCancelarInscripcion" class="btn btn-warning">NUEVO</button>
                                    <button type="button" @click="buscarInscripcion" id="btnBuscarInscripcion" class="btn btn-success">BUSCAR</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `
};