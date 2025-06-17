<?php

namespace App\Filament\Resources;

use App\Enums\MenuType;
use App\Enums\MenuTypeEnum;
use App\Filament\Resources\MenuSettingResource\Pages;
use App\Filament\Resources\MenuSettingResource\RelationManagers;
use App\Models\Category;
use App\Models\MenuSetting;
use Filament\Forms;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;


class MenuSettingResource extends Resource
{
    protected static ?string $model = MenuSetting::class;

    protected static ?string $navigationIcon = 'heroicon-o-bars-4';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Select::make('menu_id')
                    ->label('Parent Menu')
                    ->relationship('parent', 'title')
                    ->searchable()
                    ->preload()
                    ->nullable(),

                TextInput::make('title')
                    ->required(),


                TextInput::make('slug')
                    ->required(),
                Select::make('menu_type')
                    ->options(MenuTypeEnum::labels())
                    ->required()
                    ->reactive(),

                Select::make('menuable_id')
                    ->label('Linked Category')
                    ->options(fn(callable $get) => $get('menu_type') === 'category'
                        ? Category::pluck('name', 'id')->toArray()
                        : [])
                    ->visible(fn(Forms\Get $get) => $get('menu_type') === 'category')
                    ->searchable()
                    ->preload(),

                Select::make('menuable_key')
                    ->label('Static Page')
                    ->options(config('MenuFile.static_pages'))
                    ->visible(fn(Forms\Get $get) => $get('menu_type') === 'static')
                    ->searchable()
                    ->preload(),
                Forms\Components\TextInput::make('menu_url')
                    ->visible(fn(Forms\Get $get) => $get('menu_type') === 'url'),

                Forms\Components\TextInput::make('position')
                    ->nullable(),

                Forms\Components\Toggle::make('is_active')
                    ->label('Active')
                    ->default(true),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('parent.title')->label('Parent Title'),
                Tables\Columns\TextColumn::make('title')->sortable()->searchable(),
                Tables\Columns\TextColumn::make('menu_type')->badge(),
                Tables\Columns\TextColumn::make('url')->label('Link'),
                Tables\Columns\ToggleColumn::make('is_active'),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListMenuSettings::route('/'),
            'create' => Pages\CreateMenuSetting::route('/create'),
            'edit' => Pages\EditMenuSetting::route('/{record}/edit'),
        ];
    }
}
