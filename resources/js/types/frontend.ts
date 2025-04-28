import { Config, TypeConfig } from 'vendor/tightenco/ziggy/src/js';
import { User } from '.';



export interface FlashProps {
    success?: string; // Optional success message
    error?: string;   // Optional error message
}

export type Image = {
    id: number;
    thumb: string;
    small: string;
    large: string;
};

export type VariationType = {
    id: number;
    name: string;
    type: 'select' | 'radio' | 'image';
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
    flash: FlashProps;
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
        variation_type_ids?: number[];
        quantity: number;
        price: number;
    }>;

}
export type paginationProps<T> = {
    data: Array<T>;
};

export type CartItems = {
    id: number;
    product_id: number;
    title: string;
    slug: string;
    price: number;
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

export type GroupedCartItems = {
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
    minCartItems: CartItems[];
    flash: FlashProps;
};


export type OrderItem ={
    id:number;
    quantity: number;
    price: number;
    variation_type_option_ids: number[];
    product:{
        id: number;
        title:string;
        slug: string;
        description: string;
        image: string;
    }

}
 export type Order={
    id: number;
    total_price:number;
    status: string;
    created_at: string;
    vendorUser:{
        id:string;
        name:string;
        email:string;
        store_name:string;

    };
    orderItems:OrderItem[];
    flash: FlashProps;
 }

 export type Shipping= {
    user?: {
        name: string;
        email: string;
    };
    phone?: string;
    alternative_phone?: string;
    city?: string;
    district?: string;
    province?: string;
    postal_code?: string;
    nearest_landmarks?: string;
}
