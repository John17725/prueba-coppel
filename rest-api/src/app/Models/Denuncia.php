<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Denuncia extends Model
{
    use HasFactory;
    protected $table = 'denuncia';
    protected $fillable = [
        'id',
        'folio',
        'estado_id',
        'pais_id',
        'fecha_incidencia',
        'detalle_denuncia',
        'password_seguimiento',
        'numero_centro',
        'estatus',
        'created_at',
        'updated_at'
    ];

    public static function obtenerDenuncias(){
        return Denuncia::all();
    }
}
