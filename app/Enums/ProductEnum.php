<?php

namespace App\Enums;

enum ProductEnum: string
{
    case Draft = "draft";
    case Published = "published";

    public static function labels(): array // 🔥 Make it static
    {
        return [
            self::Draft->value => __('Draft'),
            self::Published->value => __('Published'),
        ];
    }

    public static function colors(): array // 🔥 Make it static
    {
        return [
            self::Draft->value => 'gray',
            self::Published->value => 'success',
        ];
    }

}
