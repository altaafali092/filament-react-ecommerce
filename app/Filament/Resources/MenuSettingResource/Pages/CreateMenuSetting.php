<?php

namespace App\Filament\Resources\MenuSettingResource\Pages;

use App\Filament\Resources\MenuSettingResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateMenuSetting extends CreateRecord
{
    protected static string $resource = MenuSettingResource::class;
    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
