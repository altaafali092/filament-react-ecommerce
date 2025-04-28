<?php

namespace App\Http\Requests\Settings;

use Illuminate\Foundation\Http\FormRequest;

class ShippingAddressUpdateRequest extends FormRequest
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

            'phone'=> ['required', 'regex:/^(98|97)[0-9]{8}$/'],
            'alternative_phone'=> ['nullable', 'regex:/^(98|97)[0-9]{8}$/'],
            'full_address'=> ['required', 'string'],
            'city'=> ['required', 'string'],
            'district'=> ['required', 'string'],
            'province'=> ['required', 'string'],
            'nearest_landmarks'=> ['required', 'string'],
            'postal_code'=> ['nullable', 'string'],
        ];
    }
}
