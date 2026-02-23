const inscripciones = {
    props: ['forms'],
    data() {
        return {
            inscripcion: {
                idInscripcion: '',
                idAlumno: '',
                nombre_alumno: '',
                fecha_inscripcion: '',
                ciclo_periodo: '',
                carrera: '',
                estado: 'activo',
                dui: '',
                sexo: '',
                correo: '',
                telefono: '',
                enfermedades: '',
                hash: ''
            },
            accion: 'nuevo',
            idInscripcion: '',
        }
    },
    methods: {
        buscarInscripcion() {
            this.forms.busqueda_inscripciones.mostrar = !this.forms.busqueda_inscripciones.mostrar;
            this.$emit('buscar');
        },
        modificarInscripcion(inscripcion) {
            this.accion = 'modificar';
            this.idInscripcion = inscripcion.idInscripcion;
            this.inscripcion.idAlumno = inscripcion.idAlumno;
            this.inscripcion.nombre_alumno = inscripcion.nombre_alumno;
            this.inscripcion.fecha_inscripcion = inscripcion.fecha_inscripcion;
            this.inscripcion.ciclo_periodo = inscripcion.ciclo_periodo;
            this.inscripcion.carrera = inscripcion.carrera;
            this.inscripcion.estado = inscripcion.estado;
            this.inscripcion.dui = inscripcion.dui;
            this.inscripcion.sexo = inscripcion.sexo;
            this.inscripcion.correo = inscripcion.correo;
            this.inscripcion.telefono = inscripcion.telefono;
            this.inscripcion.enfermedades = inscripcion.enfermedades;
        },
        limpiarFormulario() {
            this.accion = 'nuevo';
            this.idInscripcion = '';
            this.inscripcion.idAlumno = '';
            this.inscripcion.nombre_alumno = '';
            this.inscripcion.fecha_inscripcion = '';
            this.inscripcion.ciclo_periodo = '';
            this.inscripcion.carrera = '';
            this.inscripcion.estado = 'activo';
            this.inscripcion.dui = '';
            this.inscripcion.sexo = '';
            this.inscripcion.correo = '';
            this.inscripcion.telefono = '';
            this.inscripcion.enfermedades = '';
        },
        async guardarInscripcion() {
            if (!this.inscripcion.nombre_alumno || !this.inscripcion.fecha_inscripcion || !this.inscripcion.dui) {
                alertify.error('Por favor complete los campos obligatorios: Nombre, DUI y Fecha');
                return;
            }
            let datos = {
                idInscripcion: this.accion == 'modificar' ? this.idInscripcion : this.getId(),
                idAlumno: this.accion == 'modificar' ? this.idInscripcion : this.getId(),
                nombre_alumno: this.inscripcion.nombre_alumno,
                fecha_inscripcion: this.inscripcion.fecha_inscripcion,
                ciclo_periodo: this.inscripcion.ciclo_periodo,
                carrera: this.inscripcion.carrera,
                estado: this.inscripcion.estado,
                dui: this.inscripcion.dui,
                sexo: this.inscripcion.sexo,
                correo: this.inscripcion.correo,
                telefono: this.inscripcion.telefono,
                enfermedades: this.inscripcion.enfermedades,
            };
            datos.hash=sha256(JSON.stringify(datos));
            await db.inscripciones.put(datos);
            this.limpiarFormulario();
            alertify.success('Inscripción guardada correctamente');
        },
        getId() {
            return new Date().getTime();
        },
    },
    template: `
        <div class="row">
            <div class="col-8">
                <div class="card text-bg-secondary mb-3">
                    <div class="card-header">INSCRIPCIÓN DE NUEVO INGRESO</div>
                    <div class="card-body">

                        <div class="row p-1">
                            <div class="col-3">NOMBRE ALUMNO: <span class="text-danger">*</span></div>
                            <div class="col-8">
                                <input v-model="inscripcion.nombre_alumno" type="text" class="form-control">
                            </div>
                        </div>

                        <div class="row p-1">
                            <div class="col-3">DUI: <span class="text-danger">*</span></div>
                            <div class="col-4">
                                <input v-model="inscripcion.dui" type="text" class="form-control">
                            </div>
                            <div class="col-2">SEXO:</div>
                            <div class="col-3">
                                <select v-model="inscripcion.sexo" class="form-control">
                                    <option value="">-- Seleccione --</option>
                                    <option value="M">Masculino</option>
                                    <option value="F">Femenino</option>
                                </select>
                            </div>
                        </div>

                        <div class="row p-1">
                            <div class="col-3">CORREO:</div>
                            <div class="col-8">
                                <input v-model="inscripcion.correo" type="email" class="form-control">
                            </div>
                        </div>

                        <div class="row p-1">
                            <div class="col-3">TELÉFONO:</div>
                            <div class="col-4">
                                <input v-model="inscripcion.telefono" type="text" class="form-control" >
                            </div>
                        </div>

                        <div class="row p-1">
                            <div class="col-3">FECHA INSCRIPCIÓN: <span class="text-danger">*</span></div>
                            <div class="col-4">
                                <input v-model="inscripcion.fecha_inscripcion" type="date" class="form-control">
                            </div>
                        </div>

                        <div class="row p-1">
                            <div class="col-3">CICLO/PERIODO:</div>
                            <div class="col-4">
                                <input v-model="inscripcion.ciclo_periodo" type="text" class="form-control">
                            </div>
                        </div>

                        <div class="row p-1">
                            <div class="col-3">CARRERA/PROGRAMA:</div>
                            <div class="col-8">
                                <input v-model="inscripcion.carrera" type="text" class="form-control">
                            </div>
                        </div>

                        <div class="row p-1">
                            <div class="col-3">ESTADO:</div>
                            <div class="col-4">
                                <select v-model="inscripcion.estado" class="form-control">
                                    <option value="activo">Activo</option>
                                    <option value="inactivo">Inactivo</option>
                                </select>
                            </div>
                        </div>

                        <div class="row p-1">
                            <div class="col-3">ENFERMEDADES / ALERGIAS:</div>
                            <div class="col-8">
                                <textarea v-model="inscripcion.enfermedades" class="form-control" rows="2"></textarea>
                            </div>
                        </div>

                        <div class="row p-1 mt-2">
                            <div class="col text-center">
                                <button type="button" @click="guardarInscripcion" class="btn btn-primary">GUARDAR</button>
                                <button type="button" @click="limpiarFormulario" class="btn btn-warning ms-2">NUEVO</button>
                                <button type="button" @click="buscarInscripcion" class="btn btn-success ms-2">BUSCAR</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    `
};