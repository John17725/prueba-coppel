<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDenunciaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'estado_id'=>'required',
            'pais_id'=>'required',
            'empresa_id'=>'required',
            'fecha_incidencia'=>'required|date',
            'detalle_denuncia'=>'required',
            'password_seguimiento'=>'required|required|min:8',
            'numero_centro'=>'required'

        ];
    }
    
    public function messages(){
        return [
            'estado_id.required' => 'Debes seleccionar un estado',
            'pais_id.required' => 'Debes seleccionar un estado',
            'empresa_id.required' => 'Debes seleccionar una empresa',
            'fecha_incidencia.required' => 'Debes indicar la fecha en que sucedieron los hechos',
            'detalle_denuncia.required' => 'Debes escribir detalladamente lo sucedido',
            'password_seguimiento.required' => 'Debes indicar una contraseña para el seguimiento',
            'password_seguimiento.min' => 'La contraseña debe tener minimo 8 caracteres',
            'numero_centro'=>'Debes indicar el numero de centro donde sucedio'
        ];
    }
}
