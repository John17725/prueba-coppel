<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Denuncia;

class SeguimientoController extends Controller
{
    public function seguimiento(Request $request){
        try {
            $seguimiento = Denuncia::obtenerDenunciaSeguimiento($request->all());
            return response()->json([
                "error"=>"false",
                "message" => "Seguimiento encontrado",
                "data" => $seguimiento
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                "error"=>"true",
                'message' => "No se ha encontrado una denuncia con los parametros enviados"
            ], 500);
        }
    }
}
