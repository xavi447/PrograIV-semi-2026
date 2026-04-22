<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('mantenimientos', function (Blueprint $table) {
            $table->id('idMantenimiento');
            $table->date('fecha');
            $table->string('encargado_mantenimiento');
            $table->enum('nivel_falla', ['leve', 'mediana', 'grave']);
            $table->enum('estado', ['realizado', 'pendiente']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mantenimientos');
    }
};
