<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class Vendor extends Model
{
    protected $fillable = [
        'user_id',
        'store_name',
        'store_address',
        'cover_image',
        'store_description',
        'store_registration_no',
        'citizenship_no',
        'store_registration_doc',
        'citizenship_image',
        'other_document',
    ];


    // Automatically get full URL for cover_image


    public function getCoverImageUrlAttribute(): ?string
    {
        return $this->cover_image ? asset('storage/' . $this->cover_image) : null;
    }
    
    public function getStoreRegistrationDocUrlAttribute(): ?string
    {
        return $this->store_registration_doc ? asset('storage/' . $this->store_registration_doc) : null;
    }
    
    public function getCitizenshipImageUrlAttribute(): ?string
    {
        return $this->citizenship_image ? asset('storage/' . $this->citizenship_image) : null;
    }
    
    public function getOtherDocumentUrlAttribute(): ?string
    {
        return $this->other_document ? asset('storage/' . $this->other_document) : null;
    }


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    
}

