<?php

namespace App\Http\Controllers;

use App\Models\Inscripcion;
use Illuminate\Http\Request;

class InscripcionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inscripcion::get();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Inscripcion::create($request->all());
        return response()->json(['msg'=>'ok'], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Inscripcion $inscripcion)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Inscripcion $inscripcion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Inscripcion $inscripcion)
    {
        $inscripcion::where('idInscripcion', $request->idInscripcion)->update([
            'codigo_alumno' => $request->codigo_alumno,
            'materia' => $request->materia,
            'fecha_inscripcion' => $request->fecha_inscripcion,
            'ciclo_periodo' => $request->ciclo_periodo,
            'observaciones' => $request->observaciones
        ]);
        return response()->json(['msg'=>'ok', 'idInscripcion'=>$request->idInscripcion], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Inscripcion $inscripcion)
    {
        $inscripcion::where('idInscripcion', $request['idInscripcion'])->delete();
        return response()->json(['msg'=> 'ok', 'idInscripcion'=>$request['idInscripcion']], 200);
    }
}
