import { Config } from 'vendor/tightenco/ziggy/src/js';
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
    price: number;
};

export interface IFrontProduct {
    id: number;
    title: string;
    sale_price: number | null;
    is_featured: boolean;
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
    auth: Record<string, unknown>;
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


export type OrderItem = {
    id: number;
    quantity: number;
    price: number;
    variation_type_option_ids: Record<number, number>;
    variation_details: VariationTypeOption[];
    product: {
        id: number;
        title: string;
        slug: string;
        description: string;
        image: string;
    }
}

export type Order = {
    id: number;
    total_price: number;
    status: string;
    created_at: string;
    payment_method: string
    vendorUser: {
        id: string;
        name: string;
        email: string;
        store_name: string;

    };
    orderItems: OrderItem[];
    flash: FlashProps;
    user: User;

}

export type Shipping = {
    user?: {
        name: string;
        email: string;
    };
    phone?: string;
    alternative_phone?: string;
    full_address?: string;
    city?: string;
    district?: string;
    province?: string;
    postal_code?: string;
    nearest_landmarks?: string;
}


export type IFrontBlogs = {
    id: number;
    title: string;
    slug: string;
    description: string;
    image: string
    published_by: string
    created_at: string;
}
export type IFrontSlider = {
    id: number;
    title: string;
    description: string;
    image: string;
    link: string;
}

export type IFrontFAQ = {
    id: number;
    answer: string;
    question: string;
}

export type IfrontBanner = {
    id: number;
    title: string;
    data: string;
}
export type IfrontCategory = {
    id: number;
    name: string;
    image: string;
    is_featured: boolean;
    description: string;
    product: IFrontProduct[]
}

export type IFrontOfficeSetting = {
    id: number;
    office_logo: string;
    office_name: string;
    office_address: string;
    office_phone: string;
    office_email: string;
    office_facebook: string;
    office_youtube: string;
    office_instagram: string;
    office_tiktok: string;
    office_whatsapp: string;
}
export interface PaginationLinks {
    url: string | null;
    label: string;
    active: boolean;
}
export interface PaginatedProducts {
    data: IFrontProduct[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLinks[];
}
export interface CategoryWithProducts {
    id: number;
    name: string;
    description: string;
    image: string;
    products: PaginatedProducts;
}



export type IFrontPolicy = {
    id: number;
    term: string,
    content: string;
}

export interface IFrontMenu {
    id: number;
    menu_id: number | null; // Could be null depending on structure
    title: string;
    slug: string;
    menu_type: string;
    menuable_id: number | null; // Can vary based on polymorphic relation
    menuable_key: string | null;
    menu_url: string | null;
    position: number;
    is_active: boolean;
    children: {
        data: Array<{
            id: number;
            title: string;
            slug: string;
            menu_type: string;
            menu_url: string | null;
        }>;
    }

}