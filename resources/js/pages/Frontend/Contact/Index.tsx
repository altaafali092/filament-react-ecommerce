import { Head } from '@inertiajs/react';
import AuthLayout from '@/pages/layout/AuthLayout';
import ContactForm from '@/components/Forontend/ContactForm';
import ContactAddress from '@/components/Forontend/ContactAddress';

const Index = () => {
    return (
        <AuthLayout>
            <Head title='Contact Us' />
            <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-12 mt-25 dark:text-white">
                        Contact Us
                    </h1>

                    <div className="space-y-6">
                        <div>
                            <h2 className='text-md font-bold'>Reach Us</h2>
                            <h1 className='text-4xl font-extrabold'>Speak with Our Friendly Team</h1>
                            <p className='text-xl text-gray-400'>We'd love to assist you. Fill out the form or drop us an email.</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Contact Address (shows on top in mobile) */}
                            <div>
                                <ContactAddress />
                            </div>

                            {/* Contact Form (moves below on mobile) */}
                            <div>
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
