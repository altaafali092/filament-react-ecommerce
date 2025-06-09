<?php

namespace App\Filament\Resources\MenuSettingResource\Pages;

use App\Filament\Resources\MenuSettingResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditMenuSetting extends EditRecord
{
    protected static string $resource = MenuSettingResource::class;

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
}
