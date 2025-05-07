<?php

namespace App\Http\Requests\Settings;

use Illuminate\Foundation\Http\FormRequest;

class VendorDetailUpdateRequest extends FormRequest
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
            'store_name' => ['required', 'string', 'max:255'],
            'store_description' => ['required', 'string', 'max:255'],
            'store_address' => ['required', 'string', 'max:255'],
            'store_phone' =>   ['required', 'regex:/^(98|97)[0-9]{8}$/'],
            'store_registration_no' => ['required', 'string', 'max:255'],
            'citizenship_no' => ['required', 'string', 'max:255'],
            'store_registration_doc' => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
            'citizenship_image' => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
            'other_document' => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
            'cover_image' => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
        ];
    }
}
