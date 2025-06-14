<?php

namespace App\Enums;

enum PrivacyTermEnum: string
{
    case PrivacyPolicy = 'privacy_policy';
    case TermsAndCondition = 'term_and_Condition';

    public function label(): string
    {
        return match($this){
            self::PrivacyPolicy => 'Privacy Policy',
            self::TermsAndCondition => 'Terms & Condition',
        };
    }
}
