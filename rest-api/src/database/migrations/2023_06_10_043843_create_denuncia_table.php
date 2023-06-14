<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('denuncia', function (Blueprint $table) {
            $table->id();
            $table->mediumInteger('folio')->unique();
            $table->unsignedBigInteger('estado_id');
            $table->unsignedBigInteger('pais_id');
            $table->date('fecha_incidencia');
            $table->mediumText('detalle_denuncia');
            $table->string('password_seguimiento');
            $table->mediumInteger('numero_centro');
            $table->string('estatus')->default('Abierto');
            $table->foreign('estado_id')->references('id')->on('estados');
            $table->foreign('pais_id')->references('id')->on('paises');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('denuncia');
    }
};
