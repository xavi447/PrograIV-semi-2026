<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
Route::get('/Bienvenida/{nombre}', function ($nombre) {
    return '<h1>Bienvenido a mi pagina, hola '.$nombre.', como estas? </h1>';
});