<?php

namespace App\Http\Controllers;

use App\Models\ReporteFalla;
use Illuminate\Http\Request;

class ReporteFallaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ReporteFalla::get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        ReporteFalla::create($request->all());
        return response()->json(['msg'=>'ok'], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        ReporteFalla::where('idReporte', $request->idReporte)->update([
            'falla' => $request->falla,
            'lugar' => $request->lugar,
            'nombre_reportador' => $request->nombre_reportador
        ]);
        return response()->json(['msg'=>'actualizado'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        ReporteFalla::where('idReporte', $request->idReporte)->delete();
        return response()->json(['msg'=>'eliminado'], 200);
    }
}
