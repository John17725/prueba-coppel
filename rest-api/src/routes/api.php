<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\DenunciaController as DenunciaV1;
use App\Http\Controllers\Api\V1\ComentariosDenunciaController as ComentariosDenunciaV1;
use App\Http\Controllers\Api\V1\RegisterController as RegisterUserControllerV1;
use App\Http\Controllers\Api\V1\AuthController as AuthControllerV1;
use App\Http\Controllers\Api\V1\EmpresasController as EmpresasV1;
use App\Http\Controllers\Api\V1\EstadosController as EstadosV1;
use App\Http\Controllers\Api\V1\PaisesController as PaisesV1;
use App\Http\Controllers\Api\V1\UserController as UserV1;
use App\Http\Controllers\Api\V1\SeguimientoController as SeguimientoV1;
use App\Http\Controllers\Api\V1\ContactoController as ContactoV1;


use App\Http\Resources\UserResource;




/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/registro',[RegisterUserControllerV1::class, 'register']);
Route::post('/login',[AuthControllerV1::class, 'login']);

Route::prefix('v1')->group(function () {
   Route::group(['middleware' => 'auth:api'], function(){
        Route::resource('/denuncias', DenunciaV1::class)->only(['index','update']);
        Route::resource('/comentarios-denuncia',ComentariosDenunciaV1::class)->only(['store']);
    });
    Route::resource('/denuncias', DenunciaV1::class)->only(['store','show']);
    Route::resource('/comentarios-denuncia',ComentariosDenunciaV1::class)->only(['show']);
    Route::apiResource('/empresas',EmpresasV1::class)->only(['index']);
    Route::apiResource('/estados',EstadosV1::class)->only(['index']);
    Route::apiResource('/paises',PaisesV1::class)->only(['index']);
    Route::apiResource('/contacto',ContactoV1::class)->only(['show']);
    Route::post('/obtener-seguimiento', [SeguimientoV1::class, 'seguimiento']);

});

Route::get('/', function () {
    return response()->json([
        'message' => 'This is a simple example of item returned by your APIs. Everyone can see it.'
    ]);
});