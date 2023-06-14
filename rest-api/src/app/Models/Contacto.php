<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contacto extends Model
{
    use HasFactory;
    protected $table = 'contacto';
    protected $fillable = [
        'nombre_completo',
        'telefono',
        'correo_electronico',
        'anonimo',
        'denuncia_id'
    ];

    public static function createContacto($nombre, $denuncia_id, $telefono, $email, $anonimo) {
        return Contacto::create([
            'nombre_completo' => empty($nombre)?"Anonimo":$nombre,
            'telefono' =>empty($telefono)?"N/A": $telefono,
            'correo_electronico' =>empty($email)?'N/A': $email,
            'anonimo' => $anonimo,
            'denuncia_id' => $denuncia_id
        ]);
    }

    public static function obtenerContacto($id){
        $contacto = Contacto::where('denuncia_id',$id)->get(); 
        return $contacto;
    }
}
