<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ComentariosDenuncia extends Model
{
    use HasFactory;
    protected $table = 'comentarios_denuncia';
    protected $fillable = [
        'id',
        'denuncia_id',
        'comentario_denuncia',
        'created_at',
        'updated_at'
    ];

    public function denuncia()
    {
        return ComentariosDenuncia::belongsTo(Denuncia::class);
    }

    public static function crearComentariosDenuncia($data){
        return ComentariosDenuncia::create($data);
    }

    public static function obtenerComentariosDenuncia($denunciaId){
        return ComentariosDenuncia::where('denuncia_id', $denunciaId)->get();
    }
}
