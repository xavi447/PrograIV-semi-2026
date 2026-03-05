const { createApp } = Vue,
    Dexie = window.Dexie,
    sha256 = CryptoJS.SHA256;
     window.db = new Dexie("db_USSS006224");
    window.db.version(1).stores({
        autores: "++idAutor,codigo,nombre,pais,telefono,hash",
        libros: "++idLibro,idAutor,isbn,titulo,editorial,edicion,hash",
    });
createApp({
    components:{
        autores,
        busqueda_autores,
        libros,
        busqueda_libros,
    },
    data(){
        return{
            forms:{
                autores:{mostrar:false},
                busqueda_autores:{mostrar:false},
                libros:{mostrar:false},
                busqueda_libros:{mostrar:false},
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
    },
   
}).mount("#app");