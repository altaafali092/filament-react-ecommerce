import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';


export type Image={
    id: number;
    thumb:string;
    small:string;
    large: string;
}

export type VariationType={
    id: number;
    name: string;
    type: 'Select' | 'Radio' |'Image';
    options: VariationTypeOption[],
}
export type VariationTypeOption={
    id: number;
    name: string;
    images:Image[];
    type:VariationType;
}

export interface IFrontProduct {
    id: number;
    title: string;
    slug: string;
    price: number;
    quantity: number;
    short_description: string;
    description: string;
    image: string;
    images: Image[];
    user:{
        id: number;
        name: string;
    };
    department:{
        id: number;
        name: string;
    };
    variationTypes: VariationType[], // safe default: []
    variations: Array<{
        id: number;
        variation_type_option_ids: string[];
        quantity:number;
        price: number;
      }> // safe default: []
}
export type paginationProps<T>={
    data:Array<T>;
}

