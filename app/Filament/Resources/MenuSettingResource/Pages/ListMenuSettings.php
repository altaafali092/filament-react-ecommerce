<?php

namespace App\Filament\Resources\MenuSettingResource\Pages;

use App\Filament\Resources\MenuSettingResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListMenuSettings extends ListRecords
{
    protected static string $resource = MenuSettingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
