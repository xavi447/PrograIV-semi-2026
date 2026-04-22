<template>
    <div v-draggable>
        <form
            id="frmMantenimientos"
            @submit.prevent="guardarMantenimiento"
            @reset.prevent="limpiarFormulario"
        >
            <div class="card text-bg-dark">
                <div class="card-header">
                    <div class="d-flex justify-content-between">
                        <div class="p-1">REGISTRO DE MANTENIMIENTOS</div>
                        <div>
                            <button
                                type="button"
                                class="btn-close btn-close-white"
                                aria-label="Close"
                                @click="cerrarFormularioMantenimiento"
                            ></button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row p-1">
                        <div class="col-4">FECHA:</div>
                        <div class="col-5">
                            <input
                                placeholder="fecha"
                                required
                                v-model="mantenimiento.fecha"
                                type="date"
                                class="form-control"
                            />
                        </div>
                    </div>
                    <div class="row p-1">
                        <div class="col-4">ENCARGADO:</div>
                        <div class="col-8">
                            <input
                                placeholder="encargado de mantenimiento"
                                required
                                v-model="mantenimiento.encargado_mantenimiento"
                                type="text"
                                class="form-control"
                            />
                        </div>
                    </div>
                    <div class="row p-1">
                        <div class="col-4">NIVEL DE FALLA:</div>
                        <div class="col-8">
                            <select
                                required
                                v-model="mantenimiento.nivel_falla"
                                class="form-select"
                            >
                                <option value="">Seleccionar...</option>
                                <option value="leve">Leve</option>
                                <option value="mediana">Mediana</option>
                                <option value="grave">Grave</option>
                            </select>
                        </div>
                    </div>
                    <div class="row p-1">
                        <div class="col-4">ESTADO:</div>
                        <div class="col-8">
                            <select
                                required
                                v-model="mantenimiento.estado"
                                class="form-select"
                            >
                                <option value="">Seleccionar...</option>
                                <option value="realizado">Realizado</option>
                                <option value="pendiente">Pendiente</option>
                            </select>
                        </div>
                    </div>
                    <div class="row p-1">
                        <div class="col-12">
                            <button type="submit" class="btn btn-success me-2">Guardar</button>
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

const mantenimiento = ref({
    idMantenimiento: null,
    fecha: '',
    encargado_mantenimiento: '',
    nivel_falla: '',
    estado: ''
});

const guardarMantenimiento = async () => {
    try {
        if (mantenimiento.value.idMantenimiento) {
            await axios.put('/mantenimiento', mantenimiento.value);
        } else {
            await axios.post('/mantenimiento', mantenimiento.value);
        }
        limpiarFormulario();
        window.location.reload();
    } catch (error) {
        console.error('Error al guardar:', error);
    }
};

const limpiarFormulario = () => {
    mantenimiento.value = {
        idMantenimiento: null,
        fecha: '',
        encargado_mantenimiento: '',
        nivel_falla: '',
        estado: ''
    };
};

const cerrarFormularioMantenimiento = () => {
    limpiarFormulario();
};
</script>
