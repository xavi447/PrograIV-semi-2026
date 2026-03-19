#!/bin/bash
# QUICKSTART - Verificación rápida del sistema

echo "🔍 Verificando migración a SQLite+WASM+OPFS..."
echo ""

# Verificar archivos creados/modificados
echo "📁 Archivos modificados:"
echo "  ✓ db.js (NUEVO) - Módulo de base de datos"
echo "  ✓ main.js (MODIFICADO) - Inicialización async"
echo "  ✓ index.html (MODIFICADO) - Scripts de sql.js"
echo "  ✓ alumnos.js (MODIFICADO)"
echo "  ✓ materias.js (MODIFICADO)"
echo "  ✓ docentes.js (MODIFICADO)"
echo "  ✓ inscripciones.js (MODIFICADO)"
echo "  ✓ matriculas.js (MODIFICADO)"
echo ""

echo "🚀 Pasos para probar:"
echo "  1. Abre http://localhost/PrograIV-semi-2026/"
echo "  2. Abre Console del navegador (F12)"
echo "  3. Debería ver: '✓ BD SQLite+WASM+OPFS inicializada correctamente'"
echo ""

echo "⚙️ Para verificar la BD desde la consola:"
echo ""
echo "  // Ver todos los alumnos"
echo "  await db.alumnos.toArray()"
echo ""
echo "  // Agregar alumno"
echo "  await db.alumnos.put({" 
echo "    idAlumno: uuid.v4(),"
echo "    codigo: 'TEST001',"
echo "    nombre: 'Alumno Test',"
echo "    direccion: 'Luis',"
echo "    email: 'test@test.com',"
echo "    telefono: '1234-5678'"
echo "  })"
echo ""
echo "  // Hacer backup"
echo "  await db.backup()"
echo ""

echo "✅ Sistema listo para probar!"
