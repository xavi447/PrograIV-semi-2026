const { createApp } = Vue,
    Dexie = window.Dexie,
    db = new Dexie("db_academica"),
    sha256 = CryptoJS.SHA256,
    uuid = window.uuid;


db.version(1).stores({
    alumnos: "idAlumno, codigo, nombre, direccion, email, telefono",
    materias: "idMateria, codigo, nombre, uv",
    docentes: "idDocente, codigo, nombre, direccion, email, telefono, escalafon",
    matriculas: "idMatricula, codigo_alumno, ciclo_periodo",
    inscripciones: "idInscripcion, codigo_alumno, materia, fecha_inscripcion, ciclo_periodo, observaciones"

});

createApp({
    components:{
        alumnos,
        busqueda_alumnos,
        materias,
        busqueda_materias,
        docentes,
        busqueda_docentes,
        matriculas,
        busqueda_matriculas,
        inscripciones,
        busqueda_inscripciones
    },
    data(){
        return{
            forms:{
                alumnos:{mostrar:false},
                busqueda_alumnos:{mostrar:false},
                materias:{mostrar:false},
                busqueda_materias:{mostrar:false},
                docentes:{mostrar:false},
                busqueda_docentes:{mostrar:false},
                matriculas:{mostrar:false},
                busqueda_matriculas:{mostrar:false},
                inscripciones:{mostrar:false},
                busqueda_inscripciones:{mostrar:false},
            }
        }
    },
    methods:{
        buscar(ventana, metodo){
            this.$refs[ventana][metodo]();
        },
        abrirVentana(ventana){
    const estadoActual = this.forms[ventana].mostrar;
    Object.keys(this.forms).forEach(key => {
        this.forms[key].mostrar = false;
    });
    this.forms[ventana].mostrar = !estadoActual;
},
        modificar(ventana, metodo, data){
            this.$refs[ventana][metodo](data);
        }
    }
  
}).mount("#app");