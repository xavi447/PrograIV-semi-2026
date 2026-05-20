<template>
    <div>
        <form id="frmBusquedaReporteFallas" @submit.prevent>
            <div class="card text-bg-dark">
                <div class="card-header">
                    <div class="d-flex justify-content-between">
                        <div class="p-1">BÚSQUEDA DE REPORTES DE FALLAS</div>
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
                                    <th>FALLA</th>
                                    <th>LUGAR</th>
                                    <th>REPORTADOR</th>
                                    <th>FECHA REPORTE</th>
                                    <th>ACCIONES</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="item in reportesFiltrados" :key="item.idReporte">
                                    <td>{{ item.idReporte }}</td>
                                    <td>{{ item.falla }}</td>
                                    <td>{{ item.lugar }}</td>
                                    <td>{{ item.nombre_reportador }}</td>
                                    <td>{{ formatDate(item.created_at) }}</td>
                                    <td>
                                        <button
                                            type="button"
                                            @click="editarReporte(item)"
                                            class="btn btn-sm btn-warning me-2"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            type="button"
                                            @click="eliminarReporte(item.idReporte)"
                                            class="btn btn-sm btn-danger"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>

                                <!-- mensaje cuando no hay resultados -->
                                <tr v-if="reportesFiltrados.length === 0">
                                    <td colspan="6" class="text-center">
                                        No se encontraron resultados
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

const reportes = ref([]);
const busqueda = ref('');

// cargar datos
onMounted(async () => {
    try {
        const response = await axios.get('/reporte-falla');
        reportes.value = response.data;
    } catch (error) {
        console.error('Error al cargar reportes:', error);
    }
});

// 🔥 BÚSQUEDA ROBUSTA
const reportesFiltrados = computed(() => {
    const texto = busqueda.value.toLowerCase().trim();

    return reportes.value.filter(item =>
        (item.falla ?? '').toLowerCase().includes(texto) ||
        (item.lugar ?? '').toLowerCase().includes(texto) ||
        (item.nombre_reportador ?? '').toLowerCase().includes(texto) ||
        String(item.idReporte).includes(texto)
    );
});

// formato fecha
const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
};

// editar
const editarReporte = (item) => {
    console.log('Editar FUNCIONA 🔥', item);
};

// eliminar
const eliminarReporte = async (id) => {
    if (confirm('¿Está seguro de que desea eliminar este reporte?')) {
        try {
            await axios.delete('/reporte-falla', { data: { idReporte: id } });
            reportes.value = reportes.value.filter(r => r.idReporte !== id);
        } catch (error) {
            console.error('Error al eliminar:', error);
        }
    }
};
</script>