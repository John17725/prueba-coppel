<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDenunciaRequest extends FormRequest
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
            'folio'=>'required',
            'estatus'=>'required|string'
        ];
    }
    
    public function messages(){
        return [
            'folio.required' => 'Debes indicar el folio de denuncia',
            'estatus.required' => 'Debes el estatus nuevo de la denuncia'
        ];
    }
}
