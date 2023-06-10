<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\DenunciaController as DenunciaV1;
use App\Http\Controllers\Api\V1\EmpresasController as EmpresasV1;
use App\Http\Controllers\Api\V1\EstadosController as EstadosV1;
use App\Http\Controllers\Api\V1\PaisesController as PaisesV1;
use App\Http\Controllers\Api\V1\UserController as UserV1;




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

Route::prefix('v1')->group(function () {
    Route::apiResource('/denuncias',DenunciaV1::class)->only(['index']);
    Route::apiResource('/empresas',EmpresasV1::class)->only(['index']);
    Route::apiResource('/estados',EstadosV1::class)->only(['index']);
    Route::apiResource('/paises',PaisesV1::class)->only(['index']);
    Route::apiResource('/user',UserV1::class)->only(['show']);

});