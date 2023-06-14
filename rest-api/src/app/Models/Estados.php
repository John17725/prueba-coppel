<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estados extends Model
{
    use HasFactory;
    protected $table = 'estados';
    protected $fillable = [
        'id',
        'pais_id',
        'nombre'
    ];
    public static function obtenerEstados(){
        return Estados::all();
    }
}
