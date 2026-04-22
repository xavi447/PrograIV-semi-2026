<?php

namespace App\Http\Controllers;

use App\Models\Mantenimiento;
use Illuminate\Http\Request;

class MantenimientoController extends Controller
{
    public function index()
    {
        return Mantenimiento::get();
    }

    public function store(Request $request)
    {
        Mantenimiento::create($request->all());
        return response()->json(['msg'=>'ok'], 200);
    }

    public function update(Request $request, $id)
    {
        Mantenimiento::where('idMantenimiento', $id)->update([
            'fecha' => $request->fecha,
            'encargado_mantenimiento' => $request->encargado_mantenimiento,
            'nivel_falla' => $request->nivel_falla,
            'estado' => $request->estado
        ]);

        return response()->json(['msg'=>'actualizado'], 200);
    }

    public function destroy(Request $request)
    {
        Mantenimiento::where('idMantenimiento', $request->idMantenimiento)->delete();
        return response()->json(['msg'=>'eliminado'], 200);
    }
}