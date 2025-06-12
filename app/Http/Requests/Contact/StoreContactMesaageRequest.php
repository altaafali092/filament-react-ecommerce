<?php

namespace App\Http\Requests\Contact;

use Illuminate\Foundation\Http\FormRequest;

class StoreContactMesaageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name'=>['required','string','max:255'],
            'last_name'=>['required','string','max:255'],
            'email'=>['required','email','max:255'],
            'phone'=>['nullable','string','max:255'],
            'message'=>['required','string'],
        ];
    }
}
