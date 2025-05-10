<?php

namespace App\Filament\Pages;

use App\Models\OfficeSetting;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Pages\Page;
use Illuminate\Support\Facades\Auth;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Notifications\Notification;

class OfficeSettings extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-building-office';
    protected static string $view = 'filament.pages.office-settings';
    protected static ?string $title = 'Office Settings';

    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill(
            OfficeSetting::first()?->toArray() ?? []
        );
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema($this->getFormSchema())
            ->statePath('data')
            ->model(OfficeSetting::class);
    }

    protected function getFormSchema(): array
    {
        return [
            Section::make('General Information')
                ->description('Basic office details')
                ->schema([
                    FileUpload::make('office_logo')
                    ->disk('public') // this must match a valid disk in filesystems.php
                    ->directory('office-logos')
                    ->visibility('public')
                    ->image()
                    ->required()
                    ->imageEditor(),
                

                    Grid::make(2)->schema([
                        TextInput::make('office_name')->required()->label('Office Name'),
                        TextInput::make('office_address')->required()->label('Address'),
                        TextInput::make('office_phone')->required()->label('Phone'),
                        TextInput::make('office_email')->email()->required()->label('Email'),
                    ]),
                ]),

            Section::make('Social Media')
                ->description('Optional links for social platforms')
                ->collapsible()
                ->schema([
                    Grid::make(2)->schema([
                        TextInput::make('office_facebook')->label('Facebook URL')->nullable(),
                        TextInput::make('office_tiktok')->label('TikTok URL')->nullable(),
                        TextInput::make('office_youtube')->label('YouTube URL')->nullable(),
                        TextInput::make('office_instagram')->label('Instagram URL')->nullable(),
                        TextInput::make('office_whatsapp')->label('WhatsApp Link')->nullable(),
                    ]),
                ]),
        ];
    }

    public function save(): void
    {
        try {
            $validated = $this->form->getState(); // prefer this over $this->validate()

            OfficeSetting::query()->delete();

            OfficeSetting::create(array_merge(
                $validated,
                ['created_by' => Auth::id()]
            ));

            Notification::make()
            ->title('Office settings saved successfully.')
            ->success()
            ->send();
        } catch (\Throwable $e) {
            Notification::make()
            ->title('Error saving settings: ' . $e->getMessage())
            ->danger()
            ->send();
            throw $e; // optional: remove in production
        }
    }
}
