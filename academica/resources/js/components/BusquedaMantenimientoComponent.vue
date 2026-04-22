<template>
    <div>
        <form id="frmBusquedaMantenimientos" @submit.prevent>
            <div class="card text-bg-dark">
                <div class="card-header">
                    <div class="d-flex justify-content-between">
                        <div class="p-1">BÚSQUEDA DE MANTENIMIENTOS</div>
                        <div>
                            <input
                                placeholder="Buscar..."
                                v-model="busqueda"
                                type="text"
                                class="form-control"
                            />
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-dark table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>FECHA</th>
                                    <th>ENCARGADO</th>
                                    <th>NIVEL FALLA</th>
                                    <th>ESTADO</th>
                                    <th>ACCIONES</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in mantenimientosFiltrados" :key="item.idMantenimiento">
                                    <td>{{ item.idMantenimiento }}</td>
                                    <td>{{ item.fecha }}</td>
                                    <td>{{ item.encargado_mantenimiento }}</td>
                                    <td>
                                        <span :class="getBadgeClass(item.nivel_falla)" class="badge">
                                            {{ item.nivel_falla }}
                                        </span>
                                    </td>
                                    <td>
                                        <span :class="getEstadoBadgeClass(item.estado)" class="badge">
                                            {{ item.estado }}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            type="button"
                                            @click.stop="editarMantenimiento(item)"
                                            class="btn btn-sm btn-warning me-2"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            type="button"
                                            @click.stop="eliminarMantenimiento(item.idMantenimiento)"
                                            class="btn btn-sm btn-danger"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const mantenimientos = ref([]);
const busqueda = ref('');

onMounted(async () => {
    try {
        const response = await axios.get('/mantenimiento');
        mantenimientos.value = response.data;
    } catch (error) {
        console.error('Error al cargar mantenimientos:', error);
    }
});

const mantenimientosFiltrados = computed(() => {
    return mantenimientos.value.filter(item =>
        item.encargado_mantenimiento.toLowerCase().includes(busqueda.value.toLowerCase()) ||
        item.fecha.toLowerCase().includes(busqueda.value.toLowerCase())
    );
});

const getBadgeClass = (nivel) => {
    switch(nivel) {
        case 'leve': return 'bg-success';
        case 'mediana': return 'bg-warning';
        case 'grave': return 'bg-danger';
        default: return 'bg-secondary';
    }
};

const getEstadoBadgeClass = (estado) => {
    switch(estado) {
        case 'realizado': return 'bg-success';
        case 'pendiente': return 'bg-warning';
        default: return 'bg-secondary';
    }
};

const editarMantenimiento = (item) => {
    console.log('Editar FUNCIONA ', item);
};

const eliminarMantenimiento = async (id) => {
    if (confirm('¿Está seguro de que desea eliminar este registro?')) {
        try {
            await axios.delete('/mantenimiento', { data: { idMantenimiento: id } });
            mantenimientos.value = mantenimientos.value.filter(m => m.idMantenimiento !== id);
        } catch (error) {
            console.error('Error al eliminar:', error);
        }
    }
};
</script>