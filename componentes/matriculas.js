const matriculas = {
props :['forms'],
data(){
    return{
        matricula:{
            idMatricula:'',
            idAlumno:'',
            idMateria:'',
            idDocente:'',
            fecha_matricula:'',
            nombre_materia:'',
            hash:'',
        },
        accion:'nuevo',
        idMatricula:0,
        data_matriculas:[],
    }
},
methods:{
    buscarMatricula(){
        this.forms.busqueda_matriculas.mostrar = !this.forms.busqueda_matriculas.mostrar;
        this.$emit('buscar');
    },
    modificarMatricula(matricula){
        this.accion = 'modificar';
        this.idMatricula = matricula.idMatricula;
        this.matricula.idAlumno = matricula.idAlumno;
        this.matricula.idMateria = matricula.idMateria;
        this.matricula.idDocente = matricula.idDocente;
        this.matricula.fecha_matricula = matricula.fecha_matricula;
        this.matricula.nombre_materia = matricula.nombre_materia;
    },
    limpiarFormulario(){
        this.accion = 'nuevo';
        this.idMatricula = '';
        this.matricula.idAlumno = '';
        this.matricula.idMateria = '';
        this.matricula.idDocente = '';
        this.matricula.fecha_matricula = '';
        this.matricula.nombre_materia = '';
    },
    async guardarMatricula() {
        let datos = {
            idMatricula: this.accion=='modificar' ? this.idMatricula : this.getId(),
            idAlumno: this.matricula.idAlumno,
            idMateria: this.matricula.idMateria,
            idDocente: this.matricula.idDocente,
            fecha_matricula: this.matricula.fecha_matricula,            
            nombre_materia: this.matricula.nombre_materia,
        };
        datos.hash=sha256(JSON.stringify(datos));
        this.buscar = datos.idMatricula;
        //await this.obtenerMatriculas();

        if(this.data_matriculas.length > 0 && this.accion=='nuevo'){
            alertify.error(`El alumno ya esta matriculado en la materia ${this.data_matriculas[0].nombre_materia}`);
            return; //Termina la ejecucion de la funcion
        }
        db.matriculas.put(datos);
        this.limpiarFormulario();
        alertify.success(`Matricula guardada correctamente`);
        //this.obtenerMatriculas();
    },
    getId(){
        return new Date().getTime();
    },
},



template: `
    <div class="row">
        <div class="col-6">
            <div class="card text-bg-secondary mb-3" style="max-width: 38rem;">
                <div class="card-header">REGISTRO DE MATRICULAS</div>
                <div class="card-body">
                    <div class="row p-1">
                        <div class="col-3">
                            ALUMNO:
                        </div>
                        <div class="col-6">
                            <input v-model="matricula.idAlumno" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="row p-1">
                        <div class="col-3">
                            MATERIA:
                        </div>
                        <div class="col-6">
                            <input v-model="matricula.idMateria" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="row p-1">
                        <div class="col-3">
                            DOCENTE:
                        </div>
                        <div class="col-6">
                            <input v-model="matricula.idDocente" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="row p-1">
                        <div class="col-3">
                            FECHA:
                        </div>
                        <div class="col-6">
                            <input v-model="matricula.fecha_matricula" type="date" class="form-control">
                        </div>
                    </div>
                    <div class="row p-1">
                        <div class="col-3">
                            NOMBRE MATERIA:
                        </div>
                        <div class="col-6">
                            <input v-model="matricula.nombre_materia" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="row p-1">
                        <div class="col text-center">
                            <button type="submit"@click="guardarMatricula" id="btnguardarMatricula" class="btn btn-primary">GUARDAR</button>
                                    <button type="reset" @click="limpiarFormulario" id="btnCancelarMatricula" class="btn btn-warning">NUEVO</button>
                                    <button type="button" @click="buscarMatricula" id="btnBuscarMatricula" class="btn btn-success">BUSCAR</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`
};