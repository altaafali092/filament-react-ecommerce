<?php

namespace App\Enums;

use Dotenv\Util\Str;
use PhpParser\Node\Expr\Cast\String_;

enum ProductVartiationTypeEnum: string
{
    case Select = 'select';
    case Radio = "radio";
    case Image = "image";

    public static function labels(): array
    {
        return [
            self::Select->value => __('Select'),
            self::Radio->value => __('Radio'),
            self::Image->value => __('Image'),
        ];
    }

}
