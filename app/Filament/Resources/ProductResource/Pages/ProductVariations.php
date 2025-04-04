<?php

namespace App\Filament\Resources\ProductResource\Pages;

use App\Filament\Resources\ProductResource;
use Filament\Actions;
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

    public function form(Form $form): Form
    {
        $type = $this->record->variationTypes;
        $fields = [];

        foreach ($type as $i => $variationType) {
            $fields[] = TextInput::make("variation_type_{$variationType->id}.id")
                ->hidden();
            $fields[] = TextInput::make("variation_type_{$variationType->id}.name")
                ->label($variationType->name);
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
                        ->label('Quantity')
                        ->numeric(),
                    TextInput::make('price')
                        ->label('Price')
                        ->numeric(),
                ])
                ->columns(2)
                ->columnSpan(2)
        ]);
    }

    protected function getHeaderActions(): array
    {
        return [Actions\DeleteAction::make()];
    }

    protected function mutateFormDataBeforeFill(array $data): array
    {
        $variations = $this->record->variations->toArray();
        $data['variations'] = $this->mergeCartesianWithExisting($this->record->variationTypes, $variations);
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
                ->map(fn($option) => $option['id'] ?? null) // Prevent "Undefined array key 'id'"
                ->filter() // Remove null values
                ->values()
                ->toArray();

            $match = array_filter($existingData, function ($existingOption) use ($optionIds) {
                return isset($existingOption['variation_types_option_ids'])
                    && is_array($existingOption['variation_types_option_ids'])
                    && $existingOption['variation_types_option_ids'] === $optionIds;
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
                        'variation_type_' . $variationType->id => [
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
                $value = $option['variation_type_' . $variationType->id] ?? null;

                if (is_array($value)) {
                    $value = json_encode($value);
                }

                $variationTypeOptionIds[] = (string) $value;
            }

            $formattedData[] = [
                'id' => $option['id'] ?? null,
                'variation_types_option_ids' => $variationTypeOptionIds,
                'quantity' => $option['quantity'] ?? 0,
                'price' => $option['price'] ?? 0.0,
            ];
        }

        $data['variations'] = $formattedData;
        return $data;
    }

    protected function handleRecordUpdate(Model $record, array $data): Model
    {
        $variations = $data['variations'];
        unset($data['variations']);

        $variations = collect($variations)->map(function ($variation) {
            return [
                'id' => $variation['id'] ?? null,
                'variation_types_option_ids' => json_encode($variation['variation_types_option_ids'] ?? []), // Ensure it's JSON encoded
                'quantity' => $variation['quantity'] ?? 0,
                'price' => $variation['price'] ?? 0.0,
            ];
        })->toArray();

        $record->variations()->delete();
        $record->variations()->upsert($variations, ['id'], ['variation_types_option_ids', 'quantity', 'price']);

        return $record;
    }
}
