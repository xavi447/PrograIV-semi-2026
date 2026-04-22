<template>
    <div v-draggable>
         <div class="card text-bg-dark mb-3">
             <div class="card-header"><div class="d-flex justify-content-between"><div class="p-1">BUSQUEDA DE INSCRIPCIONES</div><div><button type="button" class="btn-close btn-close-white" aria-label="Close" @click="cerrarFormularioBusquedaInscripciones"></button></div></div></div>
             <div class="card-body">
                 <table class="table table-striped table-hover" id="tblInscripciones">
                     <thead>
                         <tr><th colspan="7"><input autocomplete="off" type="search" @keyup="obtenerInscripciones()" v-model="buscar" placeholder="Buscar inscripcion" class="form-control"></th></tr>
                         <tr><th>CODIGO ALUMNO</th><th>MATERIA</th><th>FECHA INSCRIPCION</th><th>CICLO/PERIODO</th><th>OBSERVACIONES</th><th>HASH</th><th></th></tr>
                     </thead>
                     <tbody>
                         <tr v-for="inscripcion in inscripciones" :key="inscripcion.idInscripcion" @click="modificarInscripcion(inscripcion)">
                             <td>{{ inscripcion.codigo_alumno }}</td><td>{{ inscripcion.materia }}</td><td>{{ inscripcion.fecha_inscripcion }}</td><td>{{ inscripcion.ciclo_periodo }}</td><td>{{ inscripcion.observaciones }}</td><td>{{ inscripcion.hash }}</td>
                             <td><button class="btn btn-danger" @click="eliminarInscripcion(inscripcion, $event)">DEL</button></td>
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
                inscripciones:[],
                buscar:''
            }
        },
        methods:{
            modificarInscripcion(inscripcion){
                this.$emit('modificar', inscripcion);
            },
            eliminarInscripcion(inscripcion){
                alertify.confirm('¿Está seguro de eliminar la inscripcion?', async ()=>{ 
                    axios({
                        method:'DELETE',
                        url:'inscripcion',
                        data:inscripcion,
                        headers:{
                            'Content-Type':'application/json',
                            'Accept':'application/json'
                        }
                    }).then(response=>{
                        if(response.data.msg !== 'ok'){
                            alertify.error(`Error al sincronizar con el servidor: ${response.data.msg}`);
                        }else{
                            db.inscripciones.delete(inscripcion.idInscripcion);
                            this.obtenerInscripciones();
                        }
                    }).catch(error=>{
                        alertify.error(`Error al sincronizar con el servidor: ${error}`);
                    });
                });
            },
            async obtenerInscripciones(){
                this.inscripciones = await db.inscripciones.filter(inscripcion=>{
                    return inscripcion.codigo_alumno.toLowerCase().includes(this.buscar.toLowerCase()) || 
                        inscripcion.materia.toLowerCase().includes(this.buscar.toLowerCase());
                }).toArray();
                if( this.inscripciones.length<1 && this.buscar.length<=0 ){
                    axios({
                        method:'GET',
                        url:'inscripcion',
                        headers:{
                            'Content-Type':'application/json',
                            'Accept':'application/json'
                        }
                    }).then(response=>{
                        console.log(response.data);
                        this.inscripciones = response.data;
                        db.inscripciones.bulkAdd(response.data);
                    }).catch(error=>{
                        alertify.error(`Error al sincronizar con el servidor: ${error}`);
                    });
                }
            }
        },
        created(){
            this.obtenerInscripciones();
        }
    }
</script>
