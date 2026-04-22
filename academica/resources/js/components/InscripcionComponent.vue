<template>
    <div v-draggable>
        <form
            id="frmInscripciones"
            @submit.prevent="guardarInscripcion"
            @reset.prevent="limpiarFormulario"
        >
            <div class="card text-bg-dark">
                <div class="card-header">
                    <div class="d-flex justify-content-between">
                        <div class="p-1">REGISTRO DE INSCRIPCIONES</div>
                        <div>
                            <button
                                type="button"
                                class="btn-close btn-close-white"
                                aria-label="Close"
                                @click="cerrarFormularioInscripcion"
                            ></button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row p-1">
                        <div class="col-4">CODIGO ALUMNO:</div>
                        <div class="col-5">
                            <input
                                placeholder="codigo_alumno"
                                required
                                v-model="inscripcion.codigo_alumno"
                                type="text"
                                class="form-control"
                            />
                        </div>
                    </div>
                    <div class="row p-1">
                        <div class="col-4">MATERIA:</div>
                        <div class="col-8">
                            <input
                                placeholder="materia"
                                required
                                v-model="inscripcion.materia"
                                type="text"
                                class="form-control"
                            />
                        </div>
                    </div>
                    <div class="row p-1">
                        <div class="col-4">FECHA INSCRIPCION:</div>
                        <div class="col-8">
                            <input
                                placeholder="fecha_inscripcion"
                                required
                                v-model="inscripcion.fecha_inscripcion"
                                type="date"
                                class="form-control"
                            />
                        </div>
                    </div>
                    <div class="row p-1">
                        <div class="col-4">CICLO/PERIODO:</div>
                        <div class="col-8">
                            <input
                                placeholder="ciclo_periodo"
                                required
                                v-model="inscripcion.ciclo_periodo"
                                type="text"
                                class="form-control"
                            />
                        </div>
                    </div>
                    <div class="row p-1">
                        <div class="col-4">OBSERVACIONES:</div>
                        <div class="col-8">
                            <textarea
                                placeholder="observaciones"
                                v-model="inscripcion.observaciones"
                                class="form-control"
                                rows="3"
                            ></textarea>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="row">
                        <div class="col text-center">
                            <button
                                type="submit"
                                id="btnGuardarInscripcion"
                                class="btn btn-primary"
                            >
                                GUARDAR</button
                            ><button
                                type="reset"
                                id="btnCancelarInscripcion"
                                class="btn btn-warning"
                            >
                                NUEVO</button
                            ><button
                                type="button"
                                @click="buscarInscripcion"
                                id="btnBuscarInscripcion"
                                class="btn btn-success"
                            >
                                BUSCAR
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import alertify from "alertifyjs";

export default {
    props: ["forms"],
    data() {
        return {
            inscripcion: {
                idInscripcion: uuidv4(),
                codigo_alumno: "",
                materia: "",
                fecha_inscripcion: "",
                ciclo_periodo: "",
                observaciones: "",
            },
            accion: "nuevo",
        };
    },
    methods: {
        cerrarFormularioInscripcion() {
            this.forms.inscripciones.mostrar = false;
        },
        buscarInscripcion() {
            this.forms.buscar_inscripciones.mostrar =
                !this.forms.buscar_inscripciones.mostrar;
            this.$emit("buscar");
        },
        modificarInscripcion(inscripcion) {
            this.accion = "modificar";
            this.inscripcion = { ...inscripcion };
        },
        async guardarInscripcion() {
            let inscripcion = { ...this.inscripcion },
                metodo = "POST";
            // Asegurar que observaciones nunca sea null
            if (!inscripcion.observaciones) {
                inscripcion.observaciones = '';
            }
            db.inscripciones.put(inscripcion);
            if (this.accion == "modificar") {
                metodo = "PUT";
            }
            axios({
                method: metodo,
                url: "inscripcion",
                data: inscripcion,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            })
                .then((response) => {
                    if (response.data.msg !== "ok") {
                        alertify.error(
                            `Error al sincronizar con el servidor: ${response.data}`,
                        );
                    } else {
                        this.limpiarFormulario();
                    }
                })
                .catch((error) => {
                    alertify.error(
                        `Error al sincronizar con el servidor: ${error}`,
                    );
                });
        },
        limpiarFormulario() {
            this.inscripcion = {
                idInscripcion: uuidv4(),
                codigo_alumno: "",
                materia: "",
                fecha_inscripcion: "",
                ciclo_periodo: "",
                observaciones: "",
            };
            this.accion = "nuevo";
        },
    },
};
</script>
