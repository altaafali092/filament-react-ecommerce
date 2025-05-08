import AuthLayout from '@/pages/layout/AuthLayout';
import React from 'react';
import { usePage } from '@inertiajs/react';
import { IFrontFAQ } from '@/types/frontend';

const Index = () => {
  const { faqs } = usePage<{ faqs: IFrontFAQ[] }>().props;

  return (
    <AuthLayout>
      <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900  py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-12 mt-20">
            Frequently Asked Questions
          </h1>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white shadow-lg rounded-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  {faq.question}
                </h2>
                <p className="text-gray-600 leading-relaxed"   dangerouslySetInnerHTML={{ __html: faq.answer }}></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Index;