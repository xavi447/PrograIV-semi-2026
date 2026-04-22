<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MantenimientoController;
use App\Http\Controllers\ReporteFallaController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::controller(MantenimientoController::class)->group(function () {
   Route::get('/mantenimiento', [MantenimientoController::class, 'index']);
Route::post('/mantenimiento', [MantenimientoController::class, 'store']);
Route::put('/mantenimiento/{id}', [MantenimientoController::class, 'update']);
Route::delete('/mantenimiento', [MantenimientoController::class, 'destroy']);
});

Route::controller(ReporteFallaController::class)->group(function () {
    Route::get('/reporte-falla', 'index');
    Route::post('/reporte-falla', 'store');
    Route::put('/reporte-falla', 'update');
    Route::delete('/reporte-falla', 'destroy');
});
Route::get('/prueba', function () {
    return "ESTE ES EL PROYECTO CORRECTO 🔥";
});