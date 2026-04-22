<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inscripcion extends Model
{
    use HasFactory;

    protected $table = 'inscripciones';

    protected $fillable = [
        'idInscripcion',
        'codigo_alumno',
        'materia',
        'fecha_inscripcion',
        'ciclo_periodo',
        'observaciones'
    ];
}
