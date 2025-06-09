<?php

namespace App\Enums;



enum MenuTypeEnum: string
{

    case CATEGORY = 'category';
    case STATIC = 'static';
  

    public static function labels()
    {
        return [

            self::CATEGORY->value => __('Category'),
            self::STATIC->value => __('Static'),
          

        ];
    }
}
