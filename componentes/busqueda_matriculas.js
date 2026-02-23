const busqueda_matriculas = {
    props:['forms'],
    data(){
        return{
            buscar:'',
            matriculas:[]
        }
    },
    methods:{
        modificarMatricula(matricula){
            this.$emit('modificar', matricula);
        },
   
    async obtenerMatriculas(){
        this.matriculas = await db.matriculas.filter(
                matricula => matricula.idAlumno.toString().includes(this.buscar) || 
                    matricula.idMateria.toString().includes(this.buscar) ||
                    matricula.idDocente.toString().includes(this.buscar) ||
                    matricula.fecha_matricula.toString().includes(this.buscar) ||
                    matricula.nombre_materia.toLowerCase().includes(this.buscar.toLowerCase())
            ).toArray();
        },

    async eliminarMatricula(matricula, e){
            e.stopPropagation();
            alertify.confirm('Elimanar matricula', `¿Está seguro de eliminar la matricula ${matricula.nombre_materia}?`, async e=>{
                await db.matriculas.delete(matricula.idMatricula);
                this.obtenerMatriculas();
                alertify.success(`Matricula ${matricula.nombre_materia} eliminada correctamente`);
            }, () => {
                //No hacer nada
            });
        },
    },
    template:  
        `<div>
            <div class="row">  
                <div class="col-6"> 
                    <input v-model="buscar" type="text" class="form-control" placeholder="Buscar matricula">
                </div>            
                <div class="col-6">
                    <button @click="obtenerMatriculas" class="btn btn-primary">Buscar</button>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>ALUMNO</th>
                                <th>MATERIA</th>
                                <th>DOCENTE</th>
                                <th>FECHA DE MATRICULA</th>
                                <th>HASH</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="matricula in matriculas" :key="matricula.idMatricula" @click="modificarMatricula(matricula)">
                                <td>{{ matricula.idAlumno }} - {{ matricula.nombre_alumno }}</td>
                                <td>{{ matricula.idMateria }} - {{ matricula.nombre_materia }}</td>
                                <td>{{ matricula.idDocente }} - {{ matricula.nombre_docente }}</td>
                                <td>{{ matricula.fecha_matricula }}</td>
                                <td>{{ matricula.hash }}</td>
                                <td>
                                    <button class="btn btn-danger" @click.stop="eliminarMatricula(matricula, $event)">DEL</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>`
};