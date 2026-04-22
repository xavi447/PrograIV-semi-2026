<template>
    <div v-draggable>
         <div class="card text-bg-dark mb-3">
             <div class="card-header"><div class="d-flex justify-content-between"><div class="p-1">BUSQUEDA DE MATRICULAS</div><div><button type="button" class="btn-close btn-close-white" aria-label="Close" @click="cerrarFormularioBusquedaMatriculas"></button></div></div></div>
             <div class="card-body">
                 <table class="table table-striped table-hover" id="tblMatriculas">
                     <thead>
                         <tr><th colspan="4"><input autocomplete="off" type="search" @keyup="obtenerMatriculas()" v-model="buscar" placeholder="Buscar matricula" class="form-control"></th></tr>
                         <tr><th>CODIGO ALUMNO</th><th>CICLO/PERIODO</th><th>HASH</th><th></th></tr>
                     </thead>
                     <tbody>
                         <tr v-for="matricula in matriculas" :key="matricula.idMatricula" @click="modificarMatricula(matricula)">
                             <td>{{ matricula.codigo_alumno }}</td><td>{{ matricula.ciclo_periodo }}</td><td>{{ matricula.hash }}</td>
                             <td><button class="btn btn-danger" @click="eliminarMatricula(matricula, $event)">DEL</button></td>
                         </tr>
                     </tbody>
                 </table>
             </div>
         </div>
    </div>
</template>
<script>
    import axios from 'axios';
    import alertify from 'alertifyjs';

    export default{
        props:['forms'],
        data(){
            return{
                matriculas:[],
                buscar:''
            }
        },
        methods:{
            modificarMatricula(matricula){
                this.$emit('modificar', matricula);
            },
            eliminarMatricula(matricula){
                alertify.confirm('¿Está seguro de eliminar la matricula?', async ()=>{ 
                    axios({
                        method:'DELETE',
                        url:'matricula',
                        data:matricula,
                        headers:{
                            'Content-Type':'application/json',
                            'Accept':'application/json'
                        }
                    }).then(response=>{
                        if(response.data.msg !== 'ok'){
                            alertify.error(`Error al sincronizar con el servidor: ${response.data.msg}`);
                        }else{
                            db.matriculas.delete(matricula.idMatricula);
                            this.obtenerMatriculas();
                        }
                    }).catch(error=>{
                        alertify.error(`Error al sincronizar con el servidor: ${error}`);
                    });
                });
            },
            async obtenerMatriculas(){
                this.matriculas = await db.matriculas.filter(matricula=>{
                    return matricula.codigo_alumno.toLowerCase().includes(this.buscar.toLowerCase()) || 
                        matricula.ciclo_periodo.toLowerCase().includes(this.buscar.toLowerCase());
                }).toArray();
                if( this.matriculas.length<1 && this.buscar.length<=0 ){
                    axios({
                        method:'GET',
                        url:'matricula',
                        headers:{
                            'Content-Type':'application/json',
                            'Accept':'application/json'
                        }
                    }).then(response=>{
                        console.log(response.data);
                        this.matriculas = response.data;
                        db.matriculas.bulkAdd(response.data);
                    }).catch(error=>{
                        alertify.error(`Error al sincronizar con el servidor: ${error}`);
                    });
                }
            }
        },
        created(){
            this.obtenerMatriculas();
        }
    }
</script>
