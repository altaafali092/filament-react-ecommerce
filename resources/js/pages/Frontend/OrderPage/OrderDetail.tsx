

import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { SharedData, type BreadcrumbItem } from '@/types';
import Detail from '@/components/Forontend/Order/Detail';



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Order Detail',

        href: route('orderPage'),
    },
];

export default function OrderDetail() {
    
  
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Order Lists" />
            <div className=" min-h-[80vh] px-4 py-10">
              <Detail/>
            </div>
        </AppLayout>
    );
}
