
import { Head, usePage } from '@inertiajs/react';
import { IFrontFAQ } from '@/types/frontend';
import AuthLayout from '@/pages/layout/AuthLayout';
import ContactForm from '@/components/Forontend/ContactForm';
import ContactAddress from '@/components/Forontend/ContactAddress';

const Index = () => {
    //   const { faqs } = usePage<{ faqs: IFrontFAQ[] }>().props;

    return (
        <AuthLayout>
            <Head title='Contact Us' />
            <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900  py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-12 mt-25 dark:text-white">
                        Contact Us
                    </h1>
                    <div className="space-y-6">
                        <div>
                            <h1 className='text-md font-bold'>Reach Us</h1>
                            <h1 className='text-4xl font-extrabold'>Speak with Our Friendly Team</h1>
                            <h1 className='text-xl text-gray-400'>We'd love to assist you. Fill out the form or drop us an email.</h1>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="..."> <ContactAddress /> </div>
                            <div className="col-span-1">
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
};

export default Index;
