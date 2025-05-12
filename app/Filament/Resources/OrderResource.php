<?php

namespace App\Filament\Resources;

use App\Models\Order;
use Filament\Facades\Filament;
use Filament\Tables;
use Filament\Resources\Resource;
use Filament\Tables\Table;
use Filament\Forms\Form;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Actions\ViewAction;
use Filament\Tables\Actions\BulkActionGroup;
use Filament\Tables\Actions\DeleteBulkAction;

use Filament\Infolists\Infolist;
use Filament\Infolists\Components\Section;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Components\Grid;
use Filament\Infolists\Components\ImageEntry;

class OrderResource extends Resource
{
    protected static ?string $model = Order::class;

    protected static ?string $navigationIcon = 'heroicon-o-shopping-bag';
  

    public static function getNavigationBadge(): ?string
    {
        $user = Filament::auth()->user();
    
        if ($user->hasRole('vendor')) {
            return static::getModel()::whereHas('orderItems.product', function ($query) use ($user) {
                $query->where('created_by', $user->id);
            })->count();
        }
    
        return static::getModel()::count(); // Admin sees all
    }
    

    public static function getEloquentQuery(): Builder
    {
        $user = Filament::auth()->user();
    
        if ($user->hasRole('vendor')) {
            return parent::getEloquentQuery()
                ->whereHas('orderItems.product', function ($query) use ($user) {
                    $query->where('created_by', $user->id);
                });
        }
    
        return parent::getEloquentQuery();
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            // Add form fields if needed later
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
        
            ->columns([
                TextColumn::make('id')->label('Order ID')->sortable(),

                TextColumn::make('user.name')
                    ->label('Customer')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('vendor.store_name')
                    ->label('Vendor')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('total_price')
                    ->money('NPR')
                    ->label('Total')
                    ->sortable(),

                BadgeColumn::make('status')
                    ->colors([
                        'success' => 'completed',
                        'warning' => 'processing',
                        'danger' => 'cancelled',
                        'gray' => 'pending',
                    ]),

                TextColumn::make('payment_method')
                    ->label('Payment Method')
                    ->formatStateUsing(fn(string $state): string => ucwords(str_replace('_', ' ', $state))),

                TextColumn::make('created_at')
                    ->dateTime('d M Y H:i')
                    ->label('Date')
                    ->sortable(),

                // Optional: Show order items as a comma-separated list
                TextColumn::make('products')
                    ->label('Products')
                    ->getStateUsing(
                        fn(Order $record) => $record->orderItems
                            ->pluck('product.title')
                            ->join(', ')
                    )
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'processing' => 'Processing',
                        'completed' => 'Completed',
                        'cancelled' => 'Cancelled',
                    ]),

                Tables\Filters\Filter::make('created_at')
                    ->form([
                        \Filament\Forms\Components\DatePicker::make('from'),
                        \Filament\Forms\Components\DatePicker::make('to'),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query
                            ->when($data['from'], fn(Builder $q) => $q->whereDate('created_at', '>=', $data['from']))
                            ->when($data['to'], fn(Builder $q) => $q->whereDate('created_at', '<=', $data['to']));
                    }),
            ])
            ->actions([
                ViewAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            // You can add relation managers here like OrderItemsRelationManager::class
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => \App\Filament\Resources\OrderResource\Pages\ListOrders::route('/'),
            'view' => \App\Filament\Resources\OrderResource\Pages\ViewOrder::route('/{record}'),
            'edit' => \App\Filament\Resources\OrderResource\Pages\EditOrder::route('/{record}/edit'),
        ];
    }

    public static function canCreate(): bool
    {
        return false; // Disables create globally
    }



    public static function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                Section::make('Order Summary')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextEntry::make('id')->label('Order ID'),
                                TextEntry::make('created_at')->dateTime('d M Y H:i')->label('Order Date'),
                                TextEntry::make('user.name')->label('Customer Name'),
                                TextEntry::make('user.email')->label('Customer Email'),
                                TextEntry::make('vendor.store_name')->label('Vendor'),
                                TextEntry::make('status')
                                    ->badge()
                                    ->color(fn(string $state): string => match ($state) {
                                        'pending' => 'gray',
                                        'processing' => 'warning',
                                        'completed' => 'success',
                                        'cancelled' => 'danger',
                                        default => 'gray',
                                    }),
                                TextEntry::make('payment_method')
                                    ->formatStateUsing(fn($state) => ucwords(str_replace('_', ' ', $state))),
                                TextEntry::make('total_price')->money('NPR')->label('Total Price'),
                            ]),
                    ]),


                    Section::make('Ordered Products')
                    ->schema(function (Order $record) {
                        return $record->orderItems->map(function ($item) {
                            return Grid::make()
                                ->schema([
                                    ImageEntry::make('product_image')
                                        ->label('')
                                        ->getStateUsing(fn() => $item->product->getFirstMediaUrl('images', 'large'))
                                        ->extraAttributes(['class' => 'w-20 h-20 object-cover rounded']),
    
                                    TextEntry::make('title')
                                        ->getStateUsing(fn() => $item->product->title)
                                        ->weight(\Filament\Support\Enums\FontWeight::Bold),
    
                                    TextEntry::make('quantity')
                                        ->getStateUsing(fn() => "Qty: {$item->quantity}")
                                        ->color('gray'),
    
                                    TextEntry::make('unit_price')
                                        ->getStateUsing(fn() => "Unit Price: NPR " . number_format($item->price, 2))
                                        ->color('success'),
    
                                    TextEntry::make('total_price')
                                        ->getStateUsing(fn() => "Total: NPR " . number_format($item->price * $item->quantity, 2))
                                        ->weight(\Filament\Support\Enums\FontWeight::Bold),
    
                                    TextEntry::make('variations')
                                        ->getStateUsing(function () use ($item) {
                                            if (empty($item->variation_type_options_ids)) {
                                                return null;
                                            }
    
                                            $optionIds = is_string($item->variation_type_options_ids)
                                                ? json_decode($item->variation_type_options_ids, true)
                                                : $item->variation_type_options_ids;
    
                                            $options = \App\Models\VariationTypeOption::whereIn('id', $optionIds)->get();
    
                                            if ($options->isEmpty()) {
                                                return null;
                                            }
    
                                            return "Variations: " . $options->pluck('name')->join(', ');
                                        })
                                        ->hiddenLabel()
                                        ->color('secondary'),
                                ])
                                ->columns(6);
                        })->toArray(); // <-- This toArray() is fine because it's on Laravel Collection
                    }),


                Section::make('Shipping Address')
                    ->schema([
                        TextEntry::make('shipping_address.full_address')
                            ->label('Full Address')
                            ->getStateUsing(fn(Order $record) => $record->user?->shippingAddress?->full_address ?? '-'),

                        TextEntry::make('shipping_address.city')
                            ->label('City')
                            ->getStateUsing(fn(Order $record) => $record->user?->shippingAddress?->city ?? '-'),

                        TextEntry::make('shipping_address.district')
                            ->label('District')
                            ->getStateUsing(fn(Order $record) => $record->user?->shippingAddress?->district ?? '-'),

                        TextEntry::make('shipping_address.province')
                            ->label('Province')
                            ->getStateUsing(fn(Order $record) => $record->user?->shippingAddress?->province ?? '-'),

                        TextEntry::make('shipping_address.postal_code')
                            ->label('Postal Code')
                            ->getStateUsing(fn(Order $record) => $record->user?->shippingAddress?->postal_code ?? '-'),

                        TextEntry::make('shipping_address.phone')
                            ->label('Phone')
                            ->getStateUsing(fn(Order $record) => $record->user?->shippingAddress?->phone ?? '-'),

                        TextEntry::make('shipping_address.alternative_phone')
                            ->label('Alternative Phone')
                            ->getStateUsing(fn(Order $record) => $record->user?->shippingAddress?->alternative_phone ?? '-'),
                    ])
                    ->columns(2),
            ]);
    }
}
