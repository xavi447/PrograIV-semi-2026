<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>::. Sistema de Mantenimientos ..::</title>

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
            <nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">::.. SISTEMA DE MANTENIMIENTOS ..::</a>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav">
                            <a class="nav-link" href="#" @click="abrirVentana('mantenimientos')">Registro Mantenimientos</a>
                            <a class="nav-link" href="#" @click="abrirVentana('buscar_mantenimientos')">Ver Mantenimientos</a>
                            <a class="nav-link" href="#" @click="abrirVentana('reportes')">Reportar Falla</a>
                            <a class="nav-link" href="#" @click="abrirVentana('buscar_reportes')">Ver Reportes</a>
                        </div>
                    </div>
                </div>
            </nav>
            <div class="container-fluid" style="position: relative; min-height: 80vh; padding-top: 20px;">
                <mantenimientos @buscar='buscar("buscar_mantenimientos","obtenerMantenimientos")' :forms="forms" ref="mantenimientos" v-show="forms.mantenimientos.mostrar"></mantenimientos>
                <buscar_mantenimientos @modificar='modificar("mantenimientos","modificarMantenimiento", $event)' :forms="forms" ref="buscar_mantenimientos" v-show="forms.buscar_mantenimientos.mostrar"></buscar_mantenimientos>

                <reportes @buscar='buscar("buscar_reportes","obtenerReportes")' :forms="forms" ref="reportes" v-show="forms.reportes.mostrar"></reportes>
                <buscar_reportes @modificar='modificar("reportes","modificarReporte", $event)' :forms="forms" ref="buscar_reportes" v-show="forms.buscar_reportes.mostrar"></buscar_reportes>

            </div>
        </div>

        @vite('resources/js/app.js')
    </body>
</html>