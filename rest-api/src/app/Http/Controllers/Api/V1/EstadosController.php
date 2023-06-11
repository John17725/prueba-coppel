<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Estados;
use Illuminate\Http\Request;

use App\Http\Resources\V1\EstadosResource;

class EstadosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            return response()->json([
                "error"=>"false",
                "message" => "Estados",
                "data" => EstadosResource::collection(Estados::obtenerEstados())
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                "error"=>"true",
                'message' => "Ha ocurrido un error al consultar informacion"
            ], 500);
        }

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Estados  $estados
     * @return \Illuminate\Http\Response
     */
    public function show(Estados $estados)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Estados  $estados
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Estados $estados)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Estados  $estados
     * @return \Illuminate\Http\Response
     */
    public function destroy(Estados $estados)
    {
        //
    }
}
