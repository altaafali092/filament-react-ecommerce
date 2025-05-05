<?php

namespace App\Http\Requests\Vendor\Register;


use App\Models\VendorUser;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;

class StoreVendorRegisterRequest extends FormRequest
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
            'name' => ['required','string','max:255'],
            'email' => 'required|string|lowercase|email|max:255|unique:'.VendorUser::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'phone' => ['required', 'regex:/^(98|97)\d{8}$/'],
        ];
    }
}
