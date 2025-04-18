import { Config, TypeConfig } from 'vendor/tightenco/ziggy/src/js';
import { User } from '.';

export type Image = {
    id: number;
    thumb: string;
    small: string;
    large: string;
};

export type VariationType = {
    id: number;
    name: string;
    type: 'Select' | 'Radio' | 'Image';
    options: VariationTypeOption[];
};
export type VariationTypeOption = {
    id: number;
    name: string;
    images: Image[];
    type: VariationType;
};

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
    user: {
        id: number;
        name: string;
    };
    department: {
        id: number;
        name: string;
    };
    variationTypes: VariationType[]; // safe default: []
    variations: Array<{
        id: number;
        variation_type_option_ids: string[];
        quantity: number;
        price: number;
    }>; // safe default: []
}
export type paginationProps<T> = {
    data: Array<T>;
};

export type CartItems = {
    id: number;
    product_id: number;
    title: string;
    slug: string;
    price: string;
    quantity: number;
    image: string;
    option_ids: Record<string, number>;
    options: VariationTypeOption[];
};
export type NavbarProp = {
    auth: any;
    totalPrice: number;
    totalQuantity: number;
    cartItems: CartItems[];
};

export type GroupedCartItem = {
    user: User;
    items: CartItems[];
    totalPrice: number;
    totalQuantity: number;
};

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    csrf_token?: string;
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
    totalQuantity: number;
    totalPrice: number;
    cartItems: CartItems[];
};
