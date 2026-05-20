<?php

namespace App\Http\Controllers;

use App\Models\Mantenimiento;
use Illuminate\Http\Request;

class MantenimientoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Mantenimiento::get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Mantenimiento::create($request->all());
        return response()->json(['msg'=>'ok'], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        Mantenimiento::where('idMantenimiento', $request->idMantenimiento)->update([
            'fecha' => $request->fecha,
            'encargado_mantenimiento' => $request->encargado_mantenimiento,
            'nivel_falla' => $request->nivel_falla,
            'estado' => $request->estado
        ]);
        return response()->json(['msg'=>'actualizado'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        Mantenimiento::where('idMantenimiento', $request->idMantenimiento)->delete();
        return response()->json(['msg'=>'eliminado'], 200);
    }
}
