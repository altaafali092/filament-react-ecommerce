<?php

namespace App\Filament\Resources\OrderResource\Pages;

use App\Filament\Resources\OrderResource;
use Filament\Actions;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\ListRecords;
use Illuminate\Support\Facades\Auth;

class ListOrders extends ListRecords
{
    protected static string $resource = OrderResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
    
    
    protected function afterStatusUpdate(): void
    {
        Notification::make()
            ->title('Status Updated')
            ->body('The order status for Order ID "' . $this->record->id . '" has been updated to "' . ucfirst($this->record->status) . '".')
            ->success()
            ->sendToDatabase(Auth::user());
    }
    
}
