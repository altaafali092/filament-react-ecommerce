import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Profile settings', href: '/settings/profile' },
];

type vendorDetail = {
    store_name: string;
    store_address: string;
    store_phone: string;
    cover_image: string;
    cover_image_url?: string;
    store_description: string;
    store_registration_no: string;
    citizenship_no: string;
    store_registration_doc: string;
    store_registration_doc_url?: string;
    citizenship_image: string;
    citizenship_image_url?: string;
    other_document: string;
    other_document_url?: string;
};


export default function BecomeVendor() {
    const { vendorDetail } = usePage<SharedData & { vendorDetail: Partial<vendorDetail> }>().props;

    const { data, setData, errors, processing, recentlySuccessful } = useForm<vendorDetail>({
        store_name: vendorDetail?.store_name || '',
        store_address: vendorDetail?.store_address || '',
        store_phone: vendorDetail?.store_phone || '',
        cover_image: vendorDetail?.cover_image || '',  // Ensure this is the existing value or empty string
        store_description: vendorDetail?.store_description || '',
        store_registration_no: vendorDetail?.store_registration_no || '',
        citizenship_no: vendorDetail?.citizenship_no || '',
        store_registration_doc: vendorDetail?.store_registration_doc || '',
        citizenship_image: vendorDetail?.citizenship_image || '',
        other_document: vendorDetail?.other_document || '',
    });
    


    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        console.log("Submitting form with data:", data); // Debug

        router.post(route('vedorDetail.update'), data, {
            preserveScroll: true,
            // onSuccess: () => {
            //     console.log("Vendor detail updated successfully");
            // },
            // onError: (errors) => {
            //     console.error("Validation errors:", errors);
            // },
            // onFinish: () => {
            //     console.log("Finished submitting form");
            // },
        });
    };




    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />
            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Store  Information"
                        description="Update your Store Information"
                    />

                    <form onSubmit={submit} className="space-y-6" encType="multipart/form-data">
                        <div className="flex gap-4">
                            <div className="grid gap-2 flex-1">
                                <Label htmlFor="phone">Store Name</Label>
                                <Input
                                    id="phone"
                                    value={data.store_name}
                                    onChange={(e) => setData('store_name', e.target.value)}

                                    placeholder="Enter your store name"
                                />
                                <InputError message={errors.store_name} />
                            </div>
                            <div className="grid gap-2 flex-1">
                                <Label htmlFor="store_address">Full Address Of Store </Label>
                                <Input
                                    id="store_address"
                                    value={data.store_address}
                                    onChange={(e) => setData('store_address', e.target.value)}
                                    placeholder="Eg munipalty-1,villagename,district,province"
                                />
                                <InputError message={errors.store_address} />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="grid gap-2 flex-1">
                                <Label htmlFor="full_address">Store Mobile No.</Label>
                                <Input
                                    id="store_phone"
                                    value={data.store_phone}
                                    onChange={(e) => setData('store_phone', e.target.value)}

                                    placeholder="980123456789"
                                />
                                <InputError message={errors.store_phone} />
                            </div>

                        </div>

                        <div className="flex gap-4">
                            <div className="grid gap-2 flex-1">
                                <Label htmlFor="full_address">Store Registration No.</Label>
                                <Input
                                    id="store_registration_no"
                                    value={data.store_registration_no}
                                    onChange={(e) => setData('store_registration_no', e.target.value)}

                                    placeholder="345.55-234"
                                />
                                <InputError message={errors.store_registration_no} />
                            </div>

                            <div className="grid gap-2 flex-1">
                                <Label htmlFor="citizenship_no">Cititzenship no</Label>
                                <Input
                                    id="citizenship_no"
                                    value={data.citizenship_no}
                                    onChange={(e) => setData('citizenship_no', e.target.value)}

                                    placeholder="66-01-44-9766"
                                />
                                <InputError message={errors.citizenship_no} />
                            </div>
                        </div>



                        <div className="flex gap-4">
                            <div className="grid gap-2 flex-1">
                                <Label htmlFor="cover_image">Store Image</Label>
                                {vendorDetail?.cover_image && (
                                    <img
                                        src={vendorDetail.cover_image}
                                        alt="Store Cover"
                                        className="w-32 h-32 rounded object-cover border"
                                    />
                                )}
                                <Input
                                    id="cover_image"
                                    type="file"
                                    accept="image/*"
                                    onChange={e => {
                                        if (e.target.files?.[0]) {
                                            setData('cover_image', e.target.files[0]); 
                                        }
                                    }}
                                    className="cursor-pointer"
                                />
                                <InputError message={errors.cover_image} />
                            </div>

                            <div className="grid gap-2 flex-1">
                                <Label htmlFor="citizenship_image">Citizenship Image</Label>
                                {vendorDetail?.citizenship_image && (
                                    <img
                                        src={vendorDetail.citizenship_image}
                                        alt="Citizenship"
                                        className="w-32 h-32 rounded object-cover border"
                                    />
                                )}
                                <Input
                                    id="citizenship_image"
                                    type="file"
                                    onChange={e => {
                                        if (e.target.files?.[0]) {
                                            setData('citizenship_image', e.target.files[0]);
                                        }
                                    }}
                                    className="cursor-pointer"
                                />
                                <InputError message={errors.citizenship_image} />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="grid gap-2 flex-1">
                                <Label htmlFor="store_registration_doc">Store Registration Doc. Image</Label>
                                {vendorDetail?.store_registration_doc && (
                                    <img
                                        src={vendorDetail.store_registration_doc}
                                        alt="Store Cover"
                                        className="w-32 h-32 rounded object-cover border"
                                    />
                                )}
                                <Input
                                    id="store_registration_doc"
                                    type="file"
                                    onChange={e => {
                                        if (e.target.files?.[0]) {
                                            setData('store_registration_doc', e.target.files[0]);
                                        }
                                    }}
                                    className="cursor-pointer"
                                />
                                <InputError message={errors.store_registration_doc} />
                            </div>
                            <div className="grid gap-2 flex-1">
                                <Label htmlFor="other_document">Other Doc. Image</Label>
                                {vendorDetail?.other_document && (
                                    <img
                                        src={vendorDetail.other_document}
                                        alt="Store Cover"
                                        className="w-32 h-32 rounded object-cover border"
                                    />
                                )}
                                <Input
                                    id="other_document"
                                    type="file"
                                    onChange={e => {
                                        if (e.target.files?.[0]) {
                                            setData('other_document', e.target.files[0]);
                                        }
                                    }}
                                    className="cursor-pointer"
                                />
                                <InputError message={errors.other_document} />
                            </div>
                        </div>




                        <div className="grid gap-2">
                            <Label htmlFor="store_description">Store Description</Label>
                            <textarea
                                id="store_description"
                                value={data.store_description}
                                onChange={(e) => setData('store_description', e.target.value)}
                                placeholder="Enter your store description"
                                className="w-full rounded-md border border-gray-300 bg-white p-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            <InputError message={errors.store_description} />
                        </div>



                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Save</Button>
                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Saved</p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
