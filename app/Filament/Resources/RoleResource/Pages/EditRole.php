<?php

namespace App\Filament\Resources\RoleResource\Pages;

use App\Filament\Resources\RoleResource;
use Filament\Actions;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Contracts\Auth\Authenticatable;

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

    public function authorizeAccess(): void
    {
        if (! auth()->user()->can('edit role')) {
            Notification::make()
                ->title('Unauthorized')
                ->body('You are not allowed to access this page.')
                ->danger()
                ->send();

            $this->redirect('/admin'); // Or wherever appropriate
        }
    }
}
