import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface IFrontProduct {
    id: number;
    title: string;
    slug: string;
    price: number;
    quantity: number;
    description: string;
    image: string;
    user:{
        id: number;
        name: string;
    };
    department:{
        id: number;
        name: string;
    }
}
export type paginationProps<T>={
    data:Array<T>;
}
