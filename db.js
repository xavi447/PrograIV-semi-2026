// SQLite WASM + OPFS Database Module - SQL PURO

class SQLiteDB {
    constructor() {
        this.db = null;
        this.SQL = null;
        this.fileHandle = null;
        this.initialized = false;
    }

    async init() {
        try {
            let attempts = 0;
            while (!window.initSqlJs && attempts < 200) {
                await new Promise(resolve => setTimeout(resolve, 25));
                attempts++;
            }
            
            if (!window.initSqlJs) {
                throw new Error('sql.js no cargó correctamente');
            }

            const wasmResponse = await fetch('./sql-wasm.wasm');
            if (!wasmResponse.ok) {
                throw new Error(`WASM no encontrado: ${wasmResponse.status}`);
            }

            const wasmBinary = await wasmResponse.arrayBuffer();
            this.SQL = await window.initSqlJs({ wasmBinary });
            
            const data = await this.loadFromOPFS();
            if (data) {
                this.db = new this.SQL.Database(data);
                // Verificar que las tablas existan
                const tables = this.select(`SELECT name FROM sqlite_master WHERE type='table'`);
                if (tables.length === 0) {
                    // BD corrupta o vacía, eliminar y crear nuevas
                    await this.deleteFromOPFS();
                    this.db = new this.SQL.Database();
                    await this.createTables();
                }
            } else {
                this.db = new this.SQL.Database();
                await this.createTables();
            }
            
            this.initialized = true;
            console.log('✓ BD SQLite inicializada');
            return true;
        } catch (error) {
            console.error('Error inicializando BD:', error);
            throw error;
        }
    }

    async loadFromOPFS() {
        try {
            const root = await navigator.storage.getDirectory();
            this.fileHandle = await root.getFileHandle('db_academica.sqlite', { create: false });
            const file = await this.fileHandle.getFile();
            return await file.arrayBuffer();
        } catch (error) {
            return null;
        }
    }

    async deleteFromOPFS() {
        try {
            const root = await navigator.storage.getDirectory();
            await root.removeEntry('db_academica.sqlite');
            console.log('BD anterior eliminada de OPFS');
        } catch (error) {
            // No existe el archivo, nada que hacer
        }
    }

    async saveToOPFS() {
        try {
            const root = await navigator.storage.getDirectory();
            this.fileHandle = await root.getFileHandle('db_academica.sqlite', { create: true });
            
            const data = this.db.export();
            const blob = new Blob([data], { type: 'application/octet-stream' });
            
            const writable = await this.fileHandle.createWritable();
            await writable.write(blob);
            await writable.close();
            
            return true;
        } catch (error) {
            console.error('Error guardando en OPFS:', error);
            throw error;
        }
    }

    async createTables() {
        const queries = [
            `CREATE TABLE IF NOT EXISTS alumnos (
                idAlumno TEXT PRIMARY KEY,
                codigo TEXT NOT NULL UNIQUE,
                nombre TEXT NOT NULL,
                direccion TEXT,
                email TEXT,
                telefono TEXT
            )`,
            `CREATE TABLE IF NOT EXISTS materias (
                idMateria TEXT PRIMARY KEY,
                codigo TEXT NOT NULL UNIQUE,
                nombre TEXT NOT NULL,
                uv INTEGER
            )`,
            `CREATE TABLE IF NOT EXISTS docentes (
                idDocente TEXT PRIMARY KEY,
                codigo TEXT NOT NULL UNIQUE,
                nombre TEXT NOT NULL,
                direccion TEXT,
                email TEXT,
                telefono TEXT,
                escalafon TEXT
            )`,
            `CREATE TABLE IF NOT EXISTS matriculas (
                idMatricula TEXT PRIMARY KEY,
                codigo_alumno TEXT NOT NULL,
                ciclo_periodo TEXT NOT NULL
            )`,
            `CREATE TABLE IF NOT EXISTS inscripciones (
                idInscripcion TEXT PRIMARY KEY,
                codigo_alumno TEXT NOT NULL,
                materia TEXT NOT NULL,
                fecha_inscripcion TEXT,
                ciclo_periodo TEXT,
                observaciones TEXT
            )`
        ];

        for (const query of queries) {
            try {
                const stmt = this.db.prepare(query);
                stmt.step();
                stmt.free();
            } catch (error) {
                console.error('Error creando tabla:', error);
            }
        }
        
        await this.saveToOPFS();
    }

    select(sql, params = []) {
        try {
            const stmt = this.db.prepare(sql);
            if (params.length > 0) stmt.bind(params);
            const results = [];
            while (stmt.step()) {
                results.push(stmt.getAsObject());
            }
            stmt.free();
            return results;
        } catch (error) {
            console.error('Error en select:', error);
            return [];
        }
    }

    async execute(sql, params = []) {
        try {
            const stmt = this.db.prepare(sql);
            if (params.length > 0) stmt.bind(params);
            stmt.step();
            stmt.free();
            await this.saveToOPFS();
            return true;
        } catch (error) {
            console.error('Error ejecutando query:', error);
            throw error;
        }
    }

    async backup() {
        const data = this.db.export();
        const blob = new Blob([data], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `db_academica_backup_${new Date().getTime()}.sqlite`;
        a.click();
        
        URL.revokeObjectURL(url);
    }

    async import(file) {
        const buffer = await file.arrayBuffer();
        this.db = new this.SQL.Database(new Uint8Array(buffer));
        await this.saveToOPFS();
    }
}

const db = new SQLiteDB();

const dbReady = (async () => {
    try {
        await db.init();
    } catch (error) {
        console.error('Fallo al inicializar BD:', error);
        throw error;
    }
})();
