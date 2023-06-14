<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\V1\PaisesResource;
use App\Http\Resources\V1\EstadosResource;
use App\Http\Resources\V1\EmpresasResource;
use App\Http\Resources\V1\ContactoResource;

class DenunciaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id'=>$this->id,
            'folio'=>$this->folio,
            'paisId'=>new PaisesResource($this->pais),
            'estadoId'=>new EstadosResource($this->estado),
            "empresaId"=>new EmpresasResource($this->empresa),
            'contacto' =>new ContactoResource($this->contacto), // Agrega la relación 'contactos'
            'fechaIncidencia'=>$this->fecha_incidencia,
            'detalleDenuncia'=>$this->detalle_denuncia,
            'passwordSeguimiento'=>$this->password_seguimiento,
            'numeroCentro'=>$this->numero_centro,
            'estatus'=>$this->estatus,
            'createdAt'=>$this->created_at,
            'updatedAt'=>$this->updated_at
        ];
    }
}
