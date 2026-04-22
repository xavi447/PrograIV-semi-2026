<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReporteFalla extends Model
{
    use HasFactory;

    protected $table = 'reportes_fallas';
    protected $primaryKey = 'idReporte';

    protected $fillable = [
        'idReporte',
        'falla',
        'lugar',
        'nombre_reportador'
    ];
}
