const busqueda_matriculas = {
    props: ['forms'],
    data() {
        return {
            buscar: '',
            matriculas: []
        }
    },
    methods: {
        modificarMatricula(matricula) {
            this.$emit('modificar', matricula);
        },
        async obtenerMatriculas() {
            this.matriculas = await db.matriculas
                .filter(matricula =>
                    matricula.codigo_alumno?.toString().includes(this.buscar) ||
                    matricula.ciclo_periodo?.toLowerCase().includes(this.buscar.toLowerCase())
                )
                .toArray();

            if(this.matriculas.length<1 && this.buscar.length<=0){
                fetch(`private/modulos/matriculas/matricula.php?accion=consultar`)
                    .then(response=>response.json())
                    .then(data=>{
                        this.matriculas = data;
                        db.matriculas.bulkAdd(data);
                    });
            }
        },
        async eliminarMatricula(matricula, e) {
            e.stopPropagation();
            alertify.confirm('Eliminar matrículas', `¿Está seguro de eliminar la matrícula?`, async e=>{
                await db.matriculas.delete(matricula.idMatricula);

                fetch(`private/modulos/matriculas/matricula.php?accion=eliminar&matriculas=${JSON.stringify(matricula)}`)
                    .then(response=>response.json())
                    .then(data=>{
                        if(data!=true) alertify.error(`Error al sincronizar con el servidor: ${data}`);
                    });

                this.obtenerMatriculas();
                alertify.success("Matrícula eliminada correctamente");
            }, () => {});
        }
    },
    template: `
        <div class="row">
            <div class="col-12">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th colspan="4">
                                <input 
                                    autocomplete="off" 
                                    type="search" 
                                    @keyup="obtenerMatriculas()" 
                                    v-model="buscar" 
                                    placeholder="Buscar matrícula por alumno o ciclo" 
                                    class="form-control">
                            </th>
                        </tr>
                        <tr>
                            <th>ALUMNO</th>
                            <th>CICLO</th>
                            
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="matricula in matriculas" 
                            :key="matricula.idMatricula" 
                            @click="modificarMatricula(matricula)"
                            style="cursor:pointer">
                            <td>{{ matricula.codigo_alumno }}</td>
                            <td>{{ matricula.ciclo_periodo }}</td>
                            
                            <td>
                                <button 
                                    class="btn btn-danger btn-sm" 
                                    @click.stop="eliminarMatricula(matricula, $event)">
                                    DEL
                                </button>
                            </td>
                        </tr>
                        <tr v-if="matriculas.length === 0">
                            <td colspan="4" class="text-center text-muted">
                                No se encontraron matrículas
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `
};