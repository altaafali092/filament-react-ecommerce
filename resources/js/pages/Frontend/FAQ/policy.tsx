import { Head, usePage } from '@inertiajs/react';
import AuthLayout from '@/pages/layout/AuthLayout';
import { IFrontPolicy } from '@/types/frontend';
import { useState } from 'react';

const PolicyPage = () => {
    const { privacyPolicies, termsPolicies } = usePage<{
        privacyPolicies: IFrontPolicy[];
        termsPolicies: IFrontPolicy[];
    }>().props;

    const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>('privacy');

    const activePolicies = activeTab === 'privacy' ? privacyPolicies : termsPolicies;

    return (
        <AuthLayout>
            <Head title="Policy" />
            <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 mt-25 dark:text-white">
                        {activeTab === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
                    </h1>

                    {/* Toggle Buttons */}
                    <div className="flex justify-center mb-8 space-x-4">
                        <button
                            onClick={() => setActiveTab('privacy')}
                            className={`px-4 py-2 rounded-lg font-semibold transition ${
                                activeTab === 'privacy'
                                    ? 'bg-white text-black dark:bg-gray-800 dark:text-white'
                                    : 'bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                            }`}
                        >
                            Privacy Policy
                        </button>
                        <button
                            onClick={() => setActiveTab('terms')}
                            className={`px-4 py-2 rounded-lg font-semibold transition ${
                                activeTab === 'terms'
                                    ? 'bg-white text-black dark:bg-gray-800 dark:text-white'
                                    : 'bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                            }`}
                        >
                            Terms & Conditions
                        </button>
                    </div>

                    {/* Policy Content */}
                    <div className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        {activePolicies.map((policy) => (
                            <div key={policy.id}>
                                <h2 className="text-lg font-bold mb-2 capitalize">{policy.term.replace(/_/g, ' ')}</h2>
                                <div
                                    className="text-md text-gray-700 dark:text-gray-300 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: policy.content }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
};

export default PolicyPage;
