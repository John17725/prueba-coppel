<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
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
            'nombre'=>'required',
            'password'=>'required'

        ];
    }
    
    public function messages(){
        return [
            'nombre.required' => 'Debes ingresar el nombre',
            'password.required' => 'Debes ingresar el password'
        ];
    }
}
