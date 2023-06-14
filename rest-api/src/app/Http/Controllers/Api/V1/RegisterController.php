<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;
use App\Http\Requests\RegisterRequest;



class RegisterController extends Controller
{
    public function register(RegisterRequest $request) {
         try {
            $usuario = User::createUser($request->all());
            return response()->json([
                "error"=>false,
                "message" => "Usuario creado exitosamente",
                "data" => $usuario 
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                "error"=>true,
                'message' => "Ha ocurrido un error al consultar informacion"
            ], 500);
        }
    }
}
