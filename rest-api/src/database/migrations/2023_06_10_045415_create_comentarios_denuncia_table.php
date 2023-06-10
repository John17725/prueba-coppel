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
        Schema::create('comentarios_denuncia', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('denuncia_id');
            $table->mediumText('comentario_denuncia');
            $table->foreign('denuncia_id')->references('id')->on('denuncia');
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
        Schema::dropIfExists('comentarios_denuncia');
    }
};
