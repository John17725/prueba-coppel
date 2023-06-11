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

    public function comentarios()
    {
        return Denuncia::hasMany(ComentariosDenuncia::class);
    }

    public static function obtenerDenuncias(){
        return Denuncia::all();
    }

    public static function obtenerDenuncia($id){
        $denuncia = Denuncia::find($id); 
        return $denuncia;
    }
    
    public static function generarFolio(){
        $folio = '';
        $digitos = '0123456789';
        for ($i = 0; $i < 5; $i++) {
            $indice = mt_rand(0, strlen($digitos) - 1);
            $folio .= $digitos[$indice];
        }

        return $folio;
    }

    public static function crearDenuncia($data){
        $data['folio'] = Denuncia::generarFolio();
        return Denuncia::create($data);
    }

    public static function actualizarDenuncia($data){
        return Denuncia::where('folio',$data['folio'])
            ->update(['estatus' => $data['estatus']]);
    }

}
