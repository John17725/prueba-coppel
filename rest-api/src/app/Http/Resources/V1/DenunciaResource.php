<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Resources\Json\JsonResource;

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
        'estadoId'=>$this->estado_id,
        'paisId'=>$this->pais_id,
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
