<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Denuncia;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Http\Resources\V1\DenunciaResource;
use App\Http\Requests\StoreDenunciaRequest;
use App\Http\Requests\UpdateDenunciaRequest;

class DenunciaController extends Controller
{
    // public function __construct()
    // {
    //     // Assign only to specific methods in this Controller
    //     $this->middleware('auth')->only(['index', 'update']);
    // }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            return response()->json([
                "error"=>false,
                "message" => "Denuncias",
                "data" => DenunciaResource::collection(Denuncia::obtenerDenuncias())
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                "error"=>true,
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
    public function store(StoreDenunciaRequest $request)
    {
        try {
            $denuncia = Denuncia::crearDenuncia($request->all());
            return response()->json([
                "error"=>false,
                "message" => "Denuncia creada exitosamente",
                "data" => $denuncia
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                "error"=>true,
                'message' => "Ha ocurrido un error al consultar informacion"
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Denuncia  $denuncia
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $denuncia = Denuncia::obtenerDenuncia($id);
            if(is_null($denuncia)){
                return response()->json([
                    'error'=> true,
                    'message'=> "Denuncia no encontrada." 
                ], Response::HTTP_NOT_FOUND);
            }
            return response()->json([
                "error"=>false,
                'message' => "Denuncia encontrada",
                "data" => new DenunciaResource($denuncia)
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                "error"=>true,
                'message' => "Ha ocurrido un error al consultar informacion"
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Denuncia  $denuncia
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateDenunciaRequest $request, Denuncia $denuncia)
    {
        try {
            Denuncia::actualizarDenuncia($request->all());
            return response()->json([
                "error"=>false,
                "message" => "Denuncia actualizada exitosamente"
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Ha ocurrido un error al consultar informacion"
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Denuncia  $denuncia
     * @return \Illuminate\Http\Response
     */
    public function destroy(Denuncia $denuncia)
    {
        //
    }
}
