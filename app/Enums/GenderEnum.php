<?php

namespace App\Enums;

enum GenderEnum : string
{
    
    case MEN = 'Mens';
    case WOMEN = 'Womens';
    case KIDS= 'Kids';
    case UNISEX= 'Unisex';
  

    public static function labels()
    {
        return [

            self::MEN->value => __('mens'),
            self::WOMEN->value => __('womens'),
            self::KIDS->value => __('kids'),
            self::UNISEX->value => __('unisex'),
          

        ];
    }
}
