<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostComentarioDenunciaRequest extends FormRequest
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
            'denuncia_id'=>'required',
            'comentario_denuncia'=>'required'

        ];
    }
    
    public function messages(){
        return [
            'denuncia_id.required' => 'Debes indicar la denuncia',
            'comentario_denuncia.required' => 'Debes enviar brevemente un comentario relacionado a la denuncia'
        ];
    }
}
