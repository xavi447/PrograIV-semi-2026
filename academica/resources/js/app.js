/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import './bootstrap';
import { createApp } from 'vue';
import Dexie from 'dexie';
import alumnos from './components/AlumnoComponent.vue';
import buscar_alumnos from './components/BusquedaAlumnoComponent.vue';
import docentes from './components/DocenteComponent.vue';
import buscar_docentes from './components/BusquedaDocenteComponent.vue';
import materias from './components/MateriaComponent.vue';
import buscar_materias from './components/BusquedaMateriaComponent.vue';
import matriculas from './components/MatriculaComponent.vue';
import buscar_matriculas from './components/BusquedaMatriculaComponent.vue';
import inscripciones from './components/InscripcionComponent.vue';
import buscar_inscripciones from './components/BusquedaInscripcionComponent.vue';
import { vDraggable } from './draggable';

window.db = new Dexie('db_academica');

createApp({
    components: {
        alumnos,
        buscar_alumnos,
        docentes,
        buscar_docentes,
        materias,
        buscar_materias,
        matriculas,
        buscar_matriculas,
        inscripciones,
        buscar_inscripciones
    },
    data(){
        return{
            forms:{
                alumnos:{mostrar:false},
                buscar_alumnos:{mostrar:false},

                materias:{mostrar:false},
                buscar_materias:{mostrar:false},

                docentes:{mostrar:false},
                buscar_docentes:{mostrar:false},

                matriculas:{mostrar:false},
                buscar_matriculas:{mostrar:false},

                inscripciones:{mostrar:false},
                buscar_inscripciones:{mostrar:false}
            }
        };
    },
    methods:{
        buscar(ventana, metodo){
            this.$refs[ventana][metodo]();
        },
        abrirVentana(ventana){
            console.log(ventana);
            this.forms[ventana].mostrar = !this.forms[ventana].mostrar;
        },
        modificar(ventana, metodo, data){
            this.$refs[ventana][metodo](data);
        },
        hacerBackup(){
            alertify.alert('Backup', 'Función de backup no implementada aún');
        }
    },
    created(){
        db.version(1).stores({
            alumnos:'idAlumno, codigo, nombre, direccion, email, telefono',
            materias:'idMateria, codigo, nombre, uv',
            docentes:'idDocente, codigo, nombre, direccion, email, telefono, escalafon',
            matriculas:'idMatricula, codigo_alumno, ciclo_periodo',
            inscripciones:'idInscripcion, codigo_alumno, materia, fecha_inscripcion, ciclo_periodo'
        });
    }
}).directive('draggable', vDraggable).mount('#appSistema');
