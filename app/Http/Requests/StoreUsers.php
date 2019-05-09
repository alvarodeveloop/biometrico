<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUsers extends FormRequest
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
     * @return array
     */
    public function rules()
    {
        return [
            //
            'email' => 'unique:users',
            'cedula' => 'unique:users'
        ];
    }


    public function messages()
    {
        return [
            'email.unique' => 'EL email ya esta en uso',
            'cedula.unique' => 'La cédula ya esta en uso',
        ];
    }
}
