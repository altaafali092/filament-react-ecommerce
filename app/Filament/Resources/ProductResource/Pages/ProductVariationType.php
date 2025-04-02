<?php

namespace App\Filament\Resources\ProductResource\Pages;

use App\Enums\ProductVartiationTypeEnum;
use App\Filament\Resources\ProductResource;
use Filament\Actions;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Pages\EditRecord;

class ProductVariationType extends EditRecord
{
    protected static string $resource = ProductResource::class;
    protected static ?string $navigationIcon = 'heroicon-m-numbered-list';
    protected static ?string $title = 'Product Variant Types';
    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Repeater::make('variationTypes')
                    ->label('Variation Type')
                    ->relationship()
                    ->collapsible()
                    ->defaultItems(1)
                    ->label('Variation Types')
                    ->addActionLabel('Add New Variation Type')
                    ->columnSpan(2)
                    ->schema([

                        TextInput::make('name')
                            ->required(),
                        Select::make('type')
                            ->Options(ProductVartiationTypeEnum::labels())
                            ->required(),
                        Repeater::make('options')
                            ->relationship()
                            ->collapsible()
                            ->schema([
                                TextInput::make('name')
                                    ->columnSpan(2)
                                    ->required(),
                                SpatieMediaLibraryFileUpload::make('images')
                                    ->image()
                                    ->multiple()
                                    ->openable()
                                    ->panelLayout('grid')
                                    ->collection('images')
                                    ->reorderable()
                                    ->preserveFilenames(),
                            ])
                            ->columnSpan(2)
                    ])
            ]);
    }

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
    // protected function getRedirectUrl(): string
    // {
    //     return $this->getResource()::getUrl('index');
    // }
}
