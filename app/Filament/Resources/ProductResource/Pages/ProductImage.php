<?php

namespace App\Filament\Resources\ProductResource\Pages;

use App\Filament\Resources\ProductResource;
use Filament\Actions;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Form;
use Filament\Resources\Pages\EditRecord;

class ProductImage extends EditRecord
{
    protected static string $resource = ProductResource::class;
    protected static ?string $navigationIcon = 'heroicon-o-photo';
    protected static ?string $title = 'Product Images';
    public function form(Form $form): Form
    {
        return $form
        ->schema([
            SpatieMediaLibraryFileUpload::make('images')
               // Make sure this matches the collection name in the model
                ->image()
                ->multiple()
                ->openable()
                ->panelLayout('grid')
                ->collection('images')
                ->reorderable()
                ->appendFiles()
                ->preserveFilenames()
                ->columnSpan(2),
        ]);
    }

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
   
}
