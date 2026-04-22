<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>::. Sistema Academico ..::</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
       <!-- CSS -->
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.14.0/build/css/alertify.min.css"/>
        <!-- Default theme -->
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.14.0/build/css/themes/default.min.css"/>
        <!-- Semantic UI theme -->
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.14.0/build/css/themes/semantic.min.css"/>
        <!-- Bootstrap theme -->
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.14.0/build/css/themes/bootstrap.min.css"/>
        <link rel="stylesheet"href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"/>
    </head>
    <body class="antialiased">
        <div id="appSistema">
            <nav class="navbar navbar-expand-lg bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">::.. SISTEMA ACADEMICO ..::</a>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav">
                            <a class="nav-link" href="#" @click="abrirVentana('alumnos')">Alumnos</a>
                            <a class="nav-link" href="#" @click="abrirVentana('materias')">Materias</a>
                            <a class="nav-link" href="#" @click="abrirVentana('docentes')">Docentes</a>
                            <a class="nav-link" href="#" @click="abrirVentana('matriculas')">Matriculas</a>
                            <a class="nav-link" href="#" @click="abrirVentana('inscripciones')">Inscripciones</a>
                            <a class="nav-link" href="#" @click="hacerBackup()">Backup</a>
                        </div>
                    </div>
                </div>
            </nav>
            <div class="container-fluid" style="position: absolute; min-height: 80vh;">
                <alumnos @buscar='buscar("buscar_alumnos","obtenerAlumnos")' :forms="forms" ref="alumnos" v-show="forms.alumnos.mostrar"></alumnos>
                <buscar_alumnos @modificar='modificar("alumnos","modificarAlumno", $event)' :forms="forms" ref="buscar_alumnos" v-show="forms.buscar_alumnos.mostrar"></buscar_alumnos>

                <docentes @buscar='buscar("buscar_docentes","obtenerDocentes")' :forms="forms" ref="docentes" v-show="forms.docentes.mostrar"></docentes>
                <buscar_docentes @modificar='modificar("docentes","modificarDocente", $event)' :forms="forms" ref="buscar_docentes" v-show="forms.buscar_docentes.mostrar"></buscar_docentes>

                <materias @buscar='buscar("buscar_materias","obtenerMaterias")' :forms="forms" ref="materias" v-show="forms.materias.mostrar"></materias>
                <buscar_materias @modificar='modificar("materias","modificarMateria", $event)' :forms="forms" ref="buscar_materias" v-show="forms.buscar_materias.mostrar"></buscar_materias>

                <matriculas @buscar='buscar("buscar_matriculas","obtenerMatriculas")' :forms="forms" ref="matriculas" v-show="forms.matriculas.mostrar"></matriculas>
                <buscar_matriculas @modificar='modificar("matriculas","modificarMatricula", $event)' :forms="forms" ref="buscar_matriculas" v-show="forms.buscar_matriculas.mostrar"></buscar_matriculas>

                <inscripciones @buscar='buscar("buscar_inscripciones","obtenerInscripciones")' :forms="forms" ref="inscripciones" v-show="forms.inscripciones.mostrar"></inscripciones>
                <buscar_inscripciones @modificar='modificar("inscripciones","modificarInscripcion", $event)' :forms="forms" ref="buscar_inscripciones" v-show="forms.buscar_inscripciones.mostrar"></buscar_inscripciones>

            </div>
        </div>

        @vite('resources/js/app.js')
    </body>
</html>