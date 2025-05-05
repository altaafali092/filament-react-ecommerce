<?php

namespace App\Filament\Resources\RoleResource\Pages;

use App\Filament\Resources\RoleResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

use Illuminate\Database\Eloquent\Model;

class EditRole extends EditRecord
{
    protected static string $resource = RoleResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];

    }
    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }


    protected function handleRecordUpdate(Model $record, array $data): Model
    {
        // Remove permissions from the update data
        $permissions = $data['permissions'] ?? [];
        unset($data['permissions']);

        // Update the role (excluding permissions)
        $record = parent::handleRecordUpdate($record, $data);

        // Sync the permissions via the relationship
        if (!empty($permissions)) {
            $record->permissions()->sync($permissions);
        }

        return $record;
    }
}
