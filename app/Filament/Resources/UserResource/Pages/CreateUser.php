<?php

namespace App\Filament\Resources\UserResource\Pages;

use App\Filament\Resources\UserResource;
use App\Notifications\SystemNotification;
use Filament\Actions;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Facades\Auth;

class CreateUser extends CreateRecord
{
    protected static string $resource = UserResource::class;
    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
    protected function afterCreate(): void
    {
        // Send notification to the currently logged-in admin
        Notification::make()
            ->title('User Created')
            ->body('User "' . $this->record->name . '" has been successfully created.')
            ->success()
            ->sendToDatabase(Auth::user());
    }
    
}
