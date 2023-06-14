<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\ComentariosDenuncia;
use Illuminate\Http\Request;

use App\Http\Resources\V1\ComentariosDenunciaResource;
use App\Http\Requests\PostComentarioDenunciaRequest;

class ComentariosDenunciaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PostComentarioDenunciaRequest $request)
    {
        try {
            $comentario = ComentariosDenuncia::crearComentariosDenuncia($request->all());
            return response()->json([
                "error"=>false,
                "message" => "Comentario creado exitosamente",
                "data" => $comentario
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
     * @param  \App\Models\ComentariosDenuncia  $comentariosDenuncia
     * @return \Illuminate\Http\Response
     */
    public function show($idDenuncia)
    {
        try {
            return response()->json([
                "error"=>false,
                "message" => "Comentarios denuncia",
                "data" => ComentariosDenunciaResource::collection(ComentariosDenuncia::obtenerComentariosDenuncia($idDenuncia))
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ComentariosDenuncia  $comentariosDenuncia
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ComentariosDenuncia $comentariosDenuncia)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ComentariosDenuncia  $comentariosDenuncia
     * @return \Illuminate\Http\Response
     */
    public function destroy(ComentariosDenuncia $comentariosDenuncia)
    {
        //
    }
}
