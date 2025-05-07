import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;
    const isVendor = auth.user.role?.toLowerCase() === 'vendor';
    const isActive = auth.user.status === 1;
    const [showForm, setShowForm] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);


    const submit = (e: any) => {
        e.preventDefault();
        (route('profile.becomeVendor'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User Profile" />
            <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-10">
                <div className="bg-white dark:bg-neutral-900 border border-border shadow-lg rounded-3xl p-8 w-full max-w-md text-center">
                    <div className="w-20 h-20 mx-auto rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-4">
                        {auth.user.name
                            .split(' ')
                            .map((n: string) => n[0])
                            .join('')
                            .slice(0, 2)}
                    </div>
                    <h2 className="text-xl font-bold">{auth.user.name}</h2>
                    <p className="text-muted-foreground text-sm mb-6">{auth.user.email}</p>

                    <div className="grid grid-cols-2 gap-6 text-sm text-left mb-6">
                        <div>
                            <p className="text-muted-foreground">Role</p>
                            <p className="font-medium capitalize">{auth.user.role}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Joined</p>
                            <p className="font-medium">{new Date(auth.user.created_at).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Phone</p>
                            <p className="font-medium">+977-{auth.user.phone}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Status</p>
                            <span
                                className={clsx(
                                    'inline-block px-3 py-1 rounded-full text-xs font-semibold',
                                    isActive
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-red-100 text-red-700'
                                )}
                            >
                                {isActive ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                    </div>

                    {!isVendor && (
                        <Button className="w-full" onClick={() => setConfirmOpen(true)}>
                            Become a Vendor
                        </Button>
                    )}

                    {/* Confirm Modal */}
                    <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Become a Vendor</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to become a vendor?
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="gap-2">
                                <Button variant="outline" onClick={() => setConfirmOpen(false)}>
                                    No
                                </Button>
                                <Button
                                    onClick={() => {
                                        setConfirmOpen(false);
                                        setShowForm(true);
                                        router.visit(route('profile.becomeVendor'));
                                    }}
                                >
                                    Yes
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </AppLayout>
    );
}
