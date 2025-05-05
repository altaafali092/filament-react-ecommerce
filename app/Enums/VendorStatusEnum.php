<?php

namespace App\Enums;

enum VendorStatusEnum: string
{
    case Pending = "pending";
    case Approved = "approved";
    case Rejected = "rejected";


    public static function labels(): array // 🔥 Make it static
    {
        return [
            self::Pending->value => __('Pending'),
            self::Approved->value => __('Published'),
            self::Rejected->value => __('Rejected')
        ];
    }

    public static function colors(): array // 🔥 Make it static
    {
        return [
            self::Pending->value => 'gray',
            self::Approved->value => 'success',
            self::Rejected->value => 'danger',

        ];
    }
}
