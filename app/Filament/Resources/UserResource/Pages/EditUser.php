<?php

namespace App\Filament\Resources\UserResource\Pages;

use App\Filament\Resources\UserResource;
use Filament\Actions;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Facades\Auth;

class EditUser extends EditRecord
{
    protected static string $resource = UserResource::class;
    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
    protected function afterEdit(): void
    {
        // Send notification to the currently logged-in admin
        Notification::make()
            ->title('User Edited')
            ->body('User "' . $this->record->name . '" has been successfully edited.')
            ->success()
            ->sendToDatabase(Auth::user());
    }
}
