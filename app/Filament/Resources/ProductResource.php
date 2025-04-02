<?php

namespace App\Filament\Resources;

use App\Enums\ProductEnum;
use App\Filament\Resources\ProductResource\Pages;
use App\Filament\Resources\ProductResource\Pages\EditProduct;
use App\Filament\Resources\ProductResource\Pages\ProductImage;
use App\Filament\Resources\ProductResource\Pages\ProductVariationType;
use App\Filament\Resources\ProductResource\RelationManagers;
use App\Models\Product;
use App\Models\ProductVariation;
use Filament\Forms;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\Tabs\Tab;
use Illuminate\Support\Str;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Forms\Set;
use Filament\Pages\SubNavigationPosition;
use Filament\Resources\Pages\Page;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\SpatieMediaLibraryImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static ?string $navigationIcon = 'heroicon-o-queue-list';

    protected static SubNavigationPosition $subNavigationPosition = SubNavigationPosition::End;



    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Grid::make()
                    ->schema([

                        TextInput::make('title')
                            ->live(onBlur: true)
                            ->required()
                            ->afterStateUpdated(fn(Set $set, ?string $state) => $set('slug', Str::slug($state))),
                        TextInput::make('slug')
                            ->required(),
                        Select::make('department_id')
                            ->relationship('department', 'name')
                            ->label(__('Department'))
                            ->preload()
                            ->required()
                            ->searchable()
                            ->reactive()
                            ->afterStateHydrated(function (callable $set) {
                                $set('category_id', null);
                            }),
                        Select::make('category_id')
                            ->relationship(
                                name: 'category',
                                titleAttribute: 'name',
                                modifyQueryUsing: function (Builder $query, callable $get) {
                                    $departmentId = $get('department_id');
                                    if ($departmentId) {
                                        $query->where('department_id', $departmentId);
                                    }
                                }
                            )
                            ->label(__('Category'))
                            ->preload()
                            ->searchable(),
                    ]),

                Forms\Components\RichEditor::make('description')
                    ->required()
                    ->columnSpan(2),

                TextInput::make('price')
                    ->required()
                    ->numeric(),
                TextInput::make('quantity')

                    ->integer(),
                Select::make('status')
                    ->options(ProductEnum::labels())
                    ->default(ProductEnum::Draft->value)


            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                SpatieMediaLibraryImageColumn::make('images')
                    ->collection('images')
                    ->limit(1) // Allow only one image
                    ->conversion('small') // Ensure 'small' conversion exists
                    ->label('Image'),
                TextColumn::make('title')
                    ->sortable()
                    ->words(10)
                    ->searchable(),
                TextColumn::make('status')
                    ->badge()
                    ->colors(ProductEnum::colors()),
                TextColumn::make('department.name')
                    ->label(__('Department')),
                TextColumn::make('category.name'),
                TextColumn::make('department.name'),
                TextColumn::make('created_at')->date(),


            ])
            ->filters([
                SelectFilter::make('status')
                    ->options(ProductEnum::labels()),
                SelectFilter::make('department_id')
                    ->relationship('department', 'name')

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
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
            'images' => Pages\ProductImage::route('/{record}/images'),
            'variation-types' => Pages\ProductVariationType::route('/{record}/variation-types'),
        ];
    }
    public static function getRecordSubNavigation(Page $page): array
    {
        return
            $page->generateNavigationItems([
                EditProduct::class,
                ProductImage::class,
                ProductVariationType::class,
            ]);
    }
}
