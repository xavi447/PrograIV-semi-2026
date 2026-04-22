<template>
    <div v-draggable>
        <form
            id="frmMatriculas"
            @submit.prevent="guardarMatricula"
            @reset.prevent="limpiarFormulario"
        >
            <div class="card text-bg-dark">
                <div class="card-header">
                    <div class="d-flex justify-content-between">
                        <div class="p-1">REGISTRO DE MATRICULAS</div>
                        <div>
                            <button
                                type="button"
                                class="btn-close btn-close-white"
                                aria-label="Close"
                                @click="cerrarFormularioMatricula"
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
                                v-model="matricula.codigo_alumno"
                                type="text"
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
                                v-model="matricula.ciclo_periodo"
                                type="text"
                                class="form-control"
                            />
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="row">
                        <div class="col text-center">
                            <button
                                type="submit"
                                id="btnGuardarMatricula"
                                class="btn btn-primary"
                            >
                                GUARDAR</button
                            ><button
                                type="reset"
                                id="btnCancelarMatricula"
                                class="btn btn-warning"
                            >
                                NUEVO</button
                            ><button
                                type="button"
                                @click="buscarMatricula"
                                id="btnBuscarMatricula"
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
            matricula: {
                idMatricula: uuidv4(),
                codigo_alumno: "",
                ciclo_periodo: "",
            },
            accion: "nuevo",
        };
    },
    methods: {
        cerrarFormularioMatricula() {
            this.forms.matriculas.mostrar = false;
        },
        buscarMatricula() {
            this.forms.buscar_matriculas.mostrar =
                !this.forms.buscar_matriculas.mostrar;
            this.$emit("buscar");
        },
        modificarMatricula(matricula) {
            this.accion = "modificar";
            this.matricula = { ...matricula };
        },
        async guardarMatricula() {
            let matricula = { ...this.matricula },
                metodo = "POST";
            db.matriculas.put(matricula);
            if (this.accion == "modificar") {
                metodo = "PUT";
            }
            axios({
                method: metodo,
                url: "matricula",
                data: matricula,
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
            this.matricula = {
                idMatricula: uuidv4(),
                codigo_alumno: "",
                ciclo_periodo: "",
            };
            this.accion = "nuevo";
        },
    },
};
</script>
