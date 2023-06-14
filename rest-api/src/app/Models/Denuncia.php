<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Contacto;

class Denuncia extends Model
{
    use HasFactory;
    protected $table = 'denuncia';
    protected $fillable = [
        'id',
        'folio',
        'estado_id',
        'pais_id',
        'empresa_id',
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

    public static function obtenerDenunciaSeguimiento($request){
        $denuncia = Denuncia::where('folio', $request['folio'])
        ->where('password_seguimiento', $request['password_seguimiento'])->get();
        return $denuncia;
    }
    
    public static function generarFolio() {
        $folio = '';
        $digitos = '123456789';
        
        for ($i = 0; $i < 4; $i++) {
            $indice = mt_rand(0, strlen($digitos) - 1);
            $folio .= $digitos[$indice];
        }
        
        $folio .= '0';
        
        return $folio;
    }

    public static function crearDenuncia($data){
        $data['folio'] = Denuncia::generarFolio();
        $denuncia = Denuncia::create($data);
        Contacto::createContacto($data['nombre_completo'],$denuncia['id'], $data['telefono'],$data['correo_electronico'],$data['anonimo']);
        return $denuncia;
    }

    public static function actualizarDenuncia($data){
        return Denuncia::where('folio',$data['folio'])
            ->update(['estatus' => $data['estatus']]);
    }

    public function pais()
    {
        return $this->belongsTo(Paises::class, 'pais_id', 'id');
    }
    
    public function estado()
    {
        return $this->belongsTo(Estados::class, 'estado_id', 'id');
    }

    public function empresa()
    {
        return $this->belongsTo(Empresas::class, 'empresa_id', 'id');
    }

     public function contacto()
    {
        return $this->hasOne(Contacto::class, 'denuncia_id');
    }
    

}
