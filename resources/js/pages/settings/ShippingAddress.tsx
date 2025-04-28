import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm, usePage } from '@inertiajs/react';
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

type ShippingAddress = {
    phone: string;
    alternative_phone: string;
    full_address: string;
    city: string;
    district: string;
    province: string;
    nearest_landmarks: string;
    postal_code: string;
};

export default function Profile() {
    const { shippingAddress } = usePage<SharedData & { shippingAddress: Partial<ShippingAddress> }>().props;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<ShippingAddress>({
        phone: shippingAddress?.phone || '',
        alternative_phone: shippingAddress?.alternative_phone || '',
        full_address: shippingAddress?.full_address || '',
        city: shippingAddress?.city || '',
        district: shippingAddress?.district || '',
        province: shippingAddress?.province || '',
        nearest_landmarks: shippingAddress?.nearest_landmarks || '',
        postal_code: shippingAddress?.postal_code || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('shippingAddress.update'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />
            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Shipping Address Information"
                        description="Update your shipping address"
                    />

                    <form onSubmit={submit} className="space-y-6">
                        <div className="flex gap-4">
                            <div className="grid gap-2 flex-1">
                                <Label htmlFor="phone">Contact No.</Label>
                                <Input
                                    id="phone"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    required
                                    placeholder="Primary phone number"
                                />
                                <InputError message={errors.phone} />
                            </div>
                            <div className="grid gap-2 flex-1">
                                <Label htmlFor="alternative_phone">Alternative Contact No.</Label>
                                <Input
                                    id="alternative_phone"
                                    value={data.alternative_phone}
                                    onChange={(e) => setData('alternative_phone', e.target.value)}
                                    placeholder="Alternative phone number"
                                />
                                <InputError message={errors.alternative_phone} />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="grid gap-2 flex-1">
                                <Label htmlFor="full_address">Full Address</Label>
                                <Input
                                    id="full_address"
                                    value={data.full_address}
                                    onChange={(e) => setData('full_address', e.target.value)}
                                    required
                                    placeholder="Full address"
                                />
                                <InputError message={errors.full_address} />
                            </div>
                            <div className="grid gap-2 flex-1">
                                <Label htmlFor="city">City</Label>
                                <Input
                                    id="city"
                                    value={data.city}
                                    onChange={(e) => setData('city', e.target.value)}
                                    required
                                    placeholder="City"
                                />
                                <InputError message={errors.city} />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="grid gap-2 flex-1">
                                <Label htmlFor="district">District</Label>
                                <Input
                                    id="district"
                                    value={data.district}
                                    onChange={(e) => setData('district', e.target.value)}
                                    required
                                    placeholder="District"
                                />
                                <InputError message={errors.district} />
                            </div>
                            <div className="grid gap-2 flex-1">
                                <Label htmlFor="province">Province</Label>
                                <Input
                                    id="province"
                                    value={data.province}
                                    onChange={(e) => setData('province', e.target.value)}
                                    required
                                    placeholder="Province"
                                />
                                <InputError message={errors.province} />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="grid gap-2 flex-1">
                                <Label htmlFor="nearest_landmarks">Nearest Landmarks</Label>
                                <Input
                                    id="nearest_landmarks"
                                    value={data.nearest_landmarks}
                                    onChange={(e) => setData('nearest_landmarks', e.target.value)}
                                    required
                                    placeholder="e.g., Near city hall"
                                />
                                <InputError message={errors.nearest_landmarks} />
                            </div>
                            <div className="grid gap-2 flex-1">
                                <Label htmlFor="postal_code">Postal Code (Optional)</Label>
                                <Input
                                    id="postal_code"
                                    value={data.postal_code}
                                    onChange={(e) => setData('postal_code', e.target.value)}
                                    placeholder="e.g., 44600"
                                />
                                <InputError message={errors.postal_code} />
                            </div>
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
