<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Empresas;
use Illuminate\Http\Request;

use App\Http\Resources\V1\EmpresasResource;


class EmpresasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return EmpresasResource::collection(Empresas::obtenerEmpresas());

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
     * @param  \App\Models\Empresas  $empresas
     * @return \Illuminate\Http\Response
     */
    public function show(Empresas $empresas)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Empresas  $empresas
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Empresas $empresas)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Empresas  $empresas
     * @return \Illuminate\Http\Response
     */
    public function destroy(Empresas $empresas)
    {
        //
    }
}
