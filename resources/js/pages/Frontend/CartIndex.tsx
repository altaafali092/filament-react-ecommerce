import { GroupedCartItem, GroupedCartItems, PageProps } from '@/types/frontend'
import React from 'react'
import AuthLayout from '../layout/AuthLayout'

function CartIndex (
{
    csrf_token,
    totalPrice,
    totalQuantity,
    cartItems
}:PageProps<{cartItems:Record<number,GroupedCartItem>}>){
  return (
    <>
    <AuthLayout>
        <div className='mt-40'>
            heloo
        </div>
    </AuthLayout>
    </>
  )
}

export default CartIndex