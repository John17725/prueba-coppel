<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Resources\Json\JsonResource;

class ContactoResource extends JsonResource
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
            'nombre_completo'=>$this->nombre_completo,
            'telefono'=>$this->telefono,
            'correo_electronico'=>$this->correo_electronico,
            'anonimo'=>$this->anonimo,
            'denuncia_id'=>$this->denuncia_id,
        ];
    }
}
