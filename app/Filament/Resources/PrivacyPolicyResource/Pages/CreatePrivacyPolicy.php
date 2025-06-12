<?php

namespace App\Filament\Resources\PrivacyPolicyResource\Pages;

use App\Filament\Resources\PrivacyPolicyResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use Psy\CodeCleaner\FunctionContextPass;

class CreatePrivacyPolicy extends CreateRecord
{
    protected static string $resource = PrivacyPolicyResource::class;
  protected function getRedirectUrl(): string
  {
    return $this->getResource()::getUrl('index');
  }   
}

