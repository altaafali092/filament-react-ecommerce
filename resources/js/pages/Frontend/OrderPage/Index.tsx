import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
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
