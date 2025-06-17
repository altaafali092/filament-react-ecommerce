<?php

namespace App\Filament\Resources\DepartmentResource\RelationManagers;

use App\Models\Category;
use Illuminate\Support\Str;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Forms\Set;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Table;


class CategoriesRelationManager extends RelationManager
{
    protected static string $relationship = 'categories';

    public function form(Form $form): Form
    {
        $department = $this->getOwnerRecord();
        return $form
            ->schema([

                FileUpload::make('image')
                    ->label('Image')
                    ->disk('public') // or 's3' if you are using S3
                    ->directory('category') // folder inside storage/app/public
                    ->visibility('public')
                    ->image()
                    ->required()
                    ->maxSize(1024) // 5MB
                    ->helperText('Upload a JPG/PNG image (max: 5MB).'),

                TextInput::make('name')
                    ->required()
                    ->label('Category Name')
                    ->maxLength(255)
                    ->afterStateUpdated(fn(Set $set, ?string $state) => $set('slug', Str::slug($state))),

                TextInput::make('slug')
                    ->required(),

                TextInput::make('description')
                    ->label('Short Description'),

                Select::make('parent_id')
                    ->options(function () use ($department) {
                        return Category::query()
                            ->where('department_id', $department->id)
                            ->pluck('name', 'id')
                            ->toArray();
                    })
                    ->label('Parent Category')
                    ->preload()
                    ->searchable(),
                Forms\Components\Checkbox::make('active'),
                Forms\Components\Checkbox::make('is_featured')


            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('name')
            ->columns([
                Tables\Columns\ImageColumn::make('image')
                    ->rounded()
                    ->circular(),
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('parent.name')
                    ->sortable()
                    ->searchable(),
                IconColumn::make('active')->boolean(),
                IconColumn::make('is_featured')->boolean(),

            ])
            ->filters([
                //
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make(),
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
}
