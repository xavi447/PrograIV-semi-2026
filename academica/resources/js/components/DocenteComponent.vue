<template>
    <div v-draggable>
        <form
            id="frmDocentes"
            @submit.prevent="guardarDocente"
            @reset.prevent="limpiarFormulario"
        >
            <div class="card text-bg-dark">
                <div class="card-header">
                    <div class="d-flex justify-content-between">
                        <div class="p-1">REGISTRO DE DOCENTES</div>
                        <div>
                            <button
                                type="button"
                                class="btn-close btn-close-white"
                                aria-label="Close"
                                @click="cerrarFormularioDocente"
                            ></button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row p-1">
                        <div class="col-4">CODIGO:</div>
                        <div class="col-5">
                            <input
                                placeholder="codigo"
                                required
                                v-model="docente.codigo"
                                type="text"
                                class="form-control"
                            />
                        </div>
                    </div>
                    <div class="row p-1">
                        <div class="col-4">NOMBRE:</div>
                        <div class="col-8">
                            <input
                                placeholder="nombre"
                                required
                                v-model="docente.nombre"
                                type="text"
                                class="form-control"
                            />
                        </div>
                    </div>
                    <div class="row p-1">
                        <div class="col-4">DIRECCION:</div>
                        <div class="col-8">
                            <input
                                placeholder="direccion"
                                required
                                v-model="docente.direccion"
                                type="text"
                                class="form-control"
                            />
                        </div>
                    </div>
                    <div class="row p-1">
                        <div class="col-4">EMAIL:</div>
                        <div class="col-8">
                            <input
                                placeholder="email"
                                required
                                v-model="docente.email"
                                type="text"
                                class="form-control"
                            />
                        </div>
                    </div>
                    <div class="row p-1">
                        <div class="col-4">TELEFONO:</div>
                        <div class="col-6">
                            <input
                                placeholder="telefono"
                                required
                                v-model="docente.telefono"
                                type="text"
                                class="form-control"
                            />
                        </div>
                    </div>
                    <div class="row p-1">
                        <div class="col-4">ESCALAFON:</div>
                        <div class="col-8">
                            <input
                                placeholder="escalafon"
                                required
                                v-model="docente.escalafon"
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
                                id="btnGuardarDocente"
                                class="btn btn-primary"
                            >
                                GUARDAR</button
                            ><button
                                type="reset"
                                id="btnCancelarDocente"
                                class="btn btn-warning"
                            >
                                NUEVO</button
                            ><button
                                type="button"
                                @click="buscarDocente"
                                id="btnBuscarDocente"
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
            docente: {
                idDocente: uuidv4(),
                codigo: "",
                nombre: "",
                direccion: "",
                email: "",
                telefono: "",
                escalafon: "",
            },
            accion: "nuevo",
        };
    },
    methods: {
        cerrarFormularioDocente() {
            this.forms.docentes.mostrar = false;
        },
        buscarDocente() {
            this.forms.buscar_docentes.mostrar =
                !this.forms.buscar_docentes.mostrar;
            this.$emit("buscar");
        },
        modificarDocente(docente) {
            this.accion = "modificar";
            this.docente = { ...docente };
        },
        async guardarDocente() {
            let docente = { ...this.docente },
                metodo = "POST";
            db.docentes.put(docente);
            if (this.accion == "modificar") {
                metodo = "PUT";
            }
            axios({
                method: metodo,
                url: "docente",
                data: docente,
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
            this.docente = {
                idDocente: uuidv4(),
                codigo: "",
                nombre: "",
                direccion: "",
                email: "",
                telefono: "",
                escalafon: "",
            };
            this.accion = "nuevo";
        },
    },
};
</script>
