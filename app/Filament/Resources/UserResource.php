<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserResource\Pages;
use App\Filament\Resources\UserResource\RelationManagers;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Spatie\Permission\Models\Role;
use Filament\Notifications\Notification;
use Filament\Tables\Columns\ToggleColumn;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class UserResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'heroicon-s-user-group';
    protected static ?string $activeNavigationIcon = 'heroicon-o-check-badge';
    protected static ?string $navigationGroup = 'Settings';
    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::count();
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('name')->required(),
                TextInput::make('email')->email()->required(),
                Select::make('roles')
                    ->multiple()
                    ->relationship('roles', 'name')
                    ->options(Role::pluck('name', 'id'))
                    ->searchable()
                    ->preload(),
                    Select::make('status')
                    ->options([
                        1 => 'Active',
                        0 => 'Inactive',
                    ])
                    ->default(1)
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name'),
                TextColumn::make('email'),
                TextColumn::make('roles.name')->badge(),
                ToggleColumn::make('status')
                ->label('Active')
                ->beforeStateUpdated(function ($record, $state) {
                    if ($record->hasRole('superadmin')) {
                        Notification::make()
                            ->title('Error')
                            ->body('Cannot change Super Admin status.')
                            ->danger()
                            ->send();
                        return false;
                    }
                })
                ->updateStateUsing(fn (User $user, bool $state) => $user->update(['status' => $state])),
                TextColumn::make('created_at')->date(),
                TextColumn::make('updated_at')->date(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                // Custom Delete action to prevent Super Admin deletion
                Tables\Actions\DeleteAction::make()
                    ->hidden(function ($record) {
                        // If the user has the 'superadmin' role, hide the delete action
                        return $record->hasRole('superadmin');
                    })
                    ->before(function ($record) {
                        // Check if the user has the 'superadmin' role
                        if ($record->hasRole('superadmin')) {
                            // Prevent deletion and show a notification
                            Notification::make()
                                ->title('Error')
                                ->body('Cannot delete Super Admin user.')
                                ->danger()
                                ->send();

                            return false; // Return false to prevent deletion
                        }
                    }),
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
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
        ];
    }
}
