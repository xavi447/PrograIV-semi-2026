<template>
    <div v-draggable>
        <form
            id="frmReporteFallas"
            @submit.prevent="guardarReporteFalla"
            @reset.prevent="limpiarFormulario"
        >
            <div class="card text-bg-dark">
                <div class="card-header">
                    <div class="d-flex justify-content-between">
                        <div class="p-1">REPORTE DE FALLAS</div>
                        <div>
                            <button
                                type="button"
                                class="btn-close btn-close-white"
                                aria-label="Close"
                                @click="cerrarFormularioReporte"
                            ></button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row p-1">
                        <div class="col-4">FALLA:</div>
                        <div class="col-8">
                            <input
                                placeholder="descripción de la falla"
                                required
                                v-model="reporteFalla.falla"
                                type="text"
                                class="form-control"
                            />
                        </div>
                    </div>
                    <div class="row p-1">
                        <div class="col-4">LUGAR:</div>
                        <div class="col-8">
                            <input
                                placeholder="lugar donde ocurrió la falla"
                                required
                                v-model="reporteFalla.lugar"
                                type="text"
                                class="form-control"
                            />
                        </div>
                    </div>
                    <div class="row p-1">
                        <div class="col-4">NOMBRE REPORTADOR:</div>
                        <div class="col-8">
                            <input
                                placeholder="nombre de quien reporta"
                                required
                                v-model="reporteFalla.nombre_reportador"
                                type="text"
                                class="form-control"
                            />
                        </div>
                    </div>
                    <div class="row p-1">
                        <div class="col-12">
                            <button type="submit" class="btn btn-success me-2">Enviar Reporte</button>
                            <button type="reset" class="btn btn-secondary">Limpiar</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const reporteFalla = ref({
    idReporte: null,
    falla: '',
    lugar: '',
    nombre_reportador: ''
});

const guardarReporteFalla = async () => {
    try {
        if (reporteFalla.value.idReporte) {
            await axios.put('/reporte-falla', reporteFalla.value);
        } else {
            await axios.post('/reporte-falla', reporteFalla.value);
        }
        limpiarFormulario();
        window.location.reload();
    } catch (error) {
        console.error('Error al guardar:', error);
    }
};

const limpiarFormulario = () => {
    reporteFalla.value = {
        idReporte: null,
        falla: '',
        lugar: '',
        nombre_reportador: ''
    };
};

const cerrarFormularioReporte = () => {
    limpiarFormulario();
};
</script>
