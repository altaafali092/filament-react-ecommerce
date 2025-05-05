<?php

namespace App\Filament\Resources\RoleResource\Pages;

use App\Filament\Resources\RoleResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateRole extends CreateRecord
{
    protected static string $resource = RoleResource::class;
    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }

    protected function handleRecordCreation(array $data): \Illuminate\Database\Eloquent\Model
    {
        // Remove permissions from data before saving the role
        $permissions = $data['permissions'] ?? [];
        unset($data['permissions']);

        // Create the role
        $role = static::getModel()::create($data);

        // Sync permissions after role creation
        if (!empty($permissions)) {
            $role->permissions()->sync($permissions);
        }

        return $role;
    }

}
