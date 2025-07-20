<?php

namespace App\Filament\Resources\ProductResource\Pages;

use App\Filament\Resources\ProductResource;
use App\Models\Product;
use Filament\Actions;
use Filament\Actions\Action;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Database\Eloquent\Model;

class ProductVariations extends EditRecord
{
    protected static string $resource = ProductResource::class;

    protected static ?string $title = 'Variations';

    public function form(\Filament\Forms\Form $form): \Filament\Forms\Form
    {
        $types = $this->record->variationTypes;
        $fields = [];

        foreach ($types as $type) {
            $fields[] = TextInput::make("variation_type_{$type->id}.id")->hidden();
            $fields[] = TextInput::make("variation_type_{$type->id}.name")->label($type->name);
        }

        return $form->schema([
            Repeater::make('variations')
                ->label(false)
                ->collapsible()
                ->addable(false)
                ->defaultItems(1)
                ->schema([
                    Section::make()
                        ->schema($fields)
                        ->columns(3),

                    TextInput::make('quantity')
                        ->label('Stock')
                        ->numeric()
                        ->required(),

                    TextInput::make('price')
                        ->label('Price')
                        ->numeric()
                        ->required(),

                    TextInput::make('in_stock')
                        ->label('Status')
                        ->default(fn(array $state): string => $state['quantity'] > 0 ? 'In Stock' : 'Out of Stock')
                        ->dehydrated(false),
                ])
                ->columns(2)
                ->columnSpan(2),
        ]);
    }

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
            $this->getRestockAction(),
        ];
    }

    protected function getRestockAction(): Action
    {
        return Action::make('restock')
            ->label('Restock All')
            ->icon('heroicon-o-plus-circle')
            ->form([
                TextInput::make('quantity')
                    ->label('Add to Stock')
                    ->numeric()
                    ->default(10)
                    ->required(),
            ])
            ->action(function (array $data, Product $record) {
                $quantity = $data['quantity'];

                foreach ($record->variations as $variation) {
                    $variation->restock($quantity);
                }
            });
    }

    protected function mutateFormDataBeforeFill(array $data): array
    {
        $variations = $this->record->variations
            ? $this->record->variations->toArray()
            : [];

        $data['variations'] = $this->mergeCartesianWithExisting(
            $this->record->variationTypes,
            $variations
        );

        return $data;
    }

    private function mergeCartesianWithExisting($variationTypes, $existingData): array
    {
        $defaultQuantity = $this->record->quantity;
        $defaultPrice = $this->record->price;
        $cartesianProduct = $this->cartesianProduct($variationTypes, $defaultQuantity, $defaultPrice);

        $mergedResult = [];

        foreach ($cartesianProduct as $product) {
            $optionIds = collect($product)
                ->filter(fn($value, $key) => str_starts_with($key, 'variation_type_'))
                ->map(fn($option) => $option['id'])
                ->filter()
                ->values()
                ->toArray();

            $match = array_filter($existingData, function ($existingOption) use ($optionIds) {
                return $existingOption['variation_types_option_ids'] === $optionIds;
            });

            if (!empty($match)) {
                $existingEntry = reset($match);
                $product['id'] = $existingEntry['id'] ?? null;
                $product['quantity'] = $existingEntry['quantity'];
                $product['price'] = $existingEntry['price'];
            } else {
                $product['quantity'] = $defaultQuantity;
                $product['price'] = $defaultPrice;
            }

            $mergedResult[] = $product;
        }

        return $mergedResult;
    }

    private function cartesianProduct($variationTypes, $defaultQuantity = null, $defaultPrice = null): array
    {
        $result = [[]];

        foreach ($variationTypes as $variationType) {
            $temp = [];

            foreach ($variationType->options as $option) {
                foreach ($result as $combination) {
                    $newCombination = $combination + [
                        "variation_type_{$variationType->id}" => [
                            'id'    => $option->id ?? null,
                            'name'  => $option->name,
                            'label' => $variationType->name,
                        ],
                    ];
                    $temp[] = $newCombination;
                }
            }

            $result = $temp;
        }

        foreach ($result as &$combination) {
            if (count($combination) === count($variationTypes)) {
                $combination['quantity'] = $defaultQuantity;
                $combination['price'] = $defaultPrice;
            }
        }

        return $result;
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        $formattedData = [];

        foreach ($data['variations'] as $option) {
            $variationTypeOptionIds = [];

            foreach ($this->record->variationTypes as $variationType) {
                $variationTypeOptionIds[] = $option["variation_type_{$variationType->id}"]['id'];
            }

            $quantity = $option['quantity'];
            $price = $option['price'];

            $formattedData[] = [
                'variation_types_option_ids' => $variationTypeOptionIds,
                'quantity' => $quantity,
                'price' => $price,
            ];
        }

        $data['variations'] = $formattedData;
        return $data;
    }

    protected function handleRecordUpdate(Model $record, array $data): Model
    {
        $variations = collect($data['variations'])->map(function ($variation) {
            return [
                'variation_types_option_ids' => json_encode($variation['variation_types_option_ids']),
                'quantity' => $variation['quantity'],
                'price' => $variation['price'],
            ];
        })->all();

        $record->variations()->delete();

        $record->variations()->upsert(
            $variations,
            ['variation_types_option_ids'],
            ['quantity', 'price']
        );

        return $record;
    }
}