import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import {  type BreadcrumbItem } from '@/types';
import OrderList from '@/components/Forontend/Order/OrderList';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Order Lists',

        href: route('orderPage'),
    },
];

export default function Index() {
  
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Order Lists" />
            <div className=" min-h-[80vh] px-4 py-10">
              <OrderList/>
            </div>
        </AppLayout>
    );
}
