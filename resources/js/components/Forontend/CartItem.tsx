import React, { useState } from 'react';
import { CartItems as CartItemType } from "@/types/frontend";
import { Link, router, useForm } from '@inertiajs/react';
import { ProductRoute } from '@/helpers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import CurrencyFormatter from '../CurrencyFormatter';

type CartItemProps = {
    item: CartItemType;
};

const CartItem: React.FC<CartItemProps> = ({ item }) => {
    const DeleteFrom = useForm({
        option_ids: item.option_ids,

    });
    const [error, setError] = useState('');

    const onDeleteClick = () => {

        DeleteFrom.delete(route('cart.destroy', item.product_id), {
            preserveScroll: true,
        });
    };


    const handleQuantityChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setError('');
        router.put(
            route('cart.update', item.product_id),
            {
                quantity: ev.target.value,
                option_ids: item.option_ids,
            },
            {
                preserveScroll: true,
                onError: (errors) => {
                    setError(Object.values(errors)[0]);
                },
            }
        );
    };

    return (
        <div className="flex flex-col md:flex-row gap-6 p-6 bg-white/90 backdrop-blur-sm rounded-xl border border-green-500">
            <Link
                href={ProductRoute(item)}
                className="w-40 min-w-40 min-h-40 flex justify-center items-center group"
            >
                <img
                    src={item.image}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    alt={item.title}
                />
            </Link>
            <div className="flex-1 space-y-4">
                <h3 className="text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                    <Link href={ProductRoute(item)} className="hover:underline">
                        {item.title} ✨
                    </Link>
                </h3>
                <div className="text-sm space-y-2">
                    {item.options.map((option) => (
                        <div
                            key={option.id}
                            className="inline-flex items-center gap-2 bg-purple-100/50 px-3 py-1 rounded-full text-purple-600"
                        >
                            <strong className="font-semibold">
                                {option.type.name}
                            </strong>
                            : {option.name}
                            {option.name.toLowerCase() === 'color' && ' 🎨'}
                            {option.name.toLowerCase() === 'size' && ' 📏'}
                        </div>
                    ))}
                </div>
                <div className="text-sm font-semibold text-gray-800">Quantity:</div>
                <TooltipProvider>
                    <Tooltip open={!!error}>
                        <TooltipTrigger asChild>
                            <div className="flex items-center gap-3">
                                <Input
                                    type="number"
                                    defaultValue={item.quantity}
                                    onBlur={handleQuantityChange}
                                    className="w-16 h-9 text-sm border-purple-300 focus:ring-purple-500"
                                    min="1"
                                />
                                <Button
                                    variant="default"
                                    size="sm"
                                    className="bg-gradient-to-r from-red-500 to-pink-500 hover:scale-105 transition-transform"
                                    onClick={onDeleteClick}
                                >
                                    Remove 🗑️
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-purple-300 text-purple-600 hover:bg-purple-100 hover:scale-105 transition-transform"
                                    onClick={() => console.log('Saved for later:', item.title)}
                                >
                                    Save for Later 💾
                                </Button>
                            </div>
                        </TooltipTrigger>
                        {error && (
                            <TooltipContent className="bg-red-500 text-white">
                                Oops! {error} 😅
                            </TooltipContent>
                        )}
                    </Tooltip>
                </TooltipProvider>
                <div className="font-bold text-xl text-gray-900">
                    <CurrencyFormatter amount={item.price * item.quantity} />
                </div>
            </div>
            <Separator className="md:hidden bg-gradient-to-r from-pink-200 to-purple-200" />
        </div>
    );
};

export default CartItem;