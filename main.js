const { createApp } = Vue,
    sha256 = CryptoJS.SHA256,
    uuid = window.uuid;

// Esperar a que la BD esté lista
async function initApp() {
    try {
        // Mostrar estado en la página
        const statusDiv = document.createElement('div');
        statusDiv.id = 'db-status';
        statusDiv.style.cssText = 'position: fixed; top: 10px; right: 10px; background: #ffc107; padding: 10px; border-radius: 5px; z-index: 9999;';
        statusDiv.textContent = '⏳ Inicializando BD...';
        document.body.appendChild(statusDiv);
        
        console.log('⏳ Esperando BD...');
        await dbReady;
        console.log('BD lista, inicializando aplicación');
    } catch (error) {
        console.error('Error al esperar BD:', error);
        const statusDiv = document.getElementById('db-status');
        if (statusDiv) {
            statusDiv.textContent = `✗ Error: ${error.message}`;
            statusDiv.style.background = '#dc3545';
            statusDiv.style.color = 'white';
        }
    }

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
}

// Iniciar la aplicación
initApp();