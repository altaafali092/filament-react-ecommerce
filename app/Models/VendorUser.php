<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VendorUser extends Model
{
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'status',
        'role'
    ];
}
