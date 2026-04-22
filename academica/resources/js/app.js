/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import './bootstrap';
import { createApp } from 'vue';
import Dexie from 'dexie';
import mantenimientos from './components/MantenimientoComponent.vue';
import buscar_mantenimientos from './components/BusquedaMantenimientoComponent.vue';
import reportes from './components/ReporteFallaComponent.vue';
import buscar_reportes from './components/BusquedaReporteFallaComponent.vue';
import { vDraggable } from './draggable';

window.db = new Dexie('db_mantenimientos');

createApp({
    components: {
        mantenimientos,
        buscar_mantenimientos,
        reportes,
        buscar_reportes
    },
    data(){
        return{
            forms:{
                mantenimientos:{mostrar:false},
                buscar_mantenimientos:{mostrar:false},
                reportes:{mostrar:false},
                buscar_reportes:{mostrar:false}
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
        }
    },
    created(){
        db.version(1).stores({
            mantenimientos:'idMantenimiento, fecha, encargado_mantenimiento, nivel_falla, estado',
            reportes_fallas:'idReporte, falla, lugar, nombre_reportador'
        });
    }
}).directive('draggable', vDraggable).mount('#appSistema');

