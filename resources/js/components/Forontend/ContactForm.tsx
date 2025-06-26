import { useForm, usePage } from '@inertiajs/react';
import  { useEffect } from 'react';
import InputError from '../input-error';
import { PageProps } from '@/types/frontend';
import toast from 'react-hot-toast';



const ContactForm = () => {

  const { flash } = usePage<PageProps>().props;
  useEffect(() => {
    if (flash.success) {
      toast.success(flash.success);
    }
    if (flash.error) {
      toast.error(flash.error);
    }
  }, [flash]);

  const { data, setData, post, errors, reset } = useForm({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    message: '',
  })
 const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  post(route('contactMessage'), {
    onSuccess: () => {
      reset();
    },
  });
};

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white/30 backdrop-blur-md rounded-lg shadow-md">

      <h2 className="text-2xl font-bold text-gray-800 mb-6 dark:text-white">Send Us a Message</h2>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* First Name & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">
              First Name *
            </label>
            <input
              id="first_name"
              name="first_name"
              type="text"
              required
              value={data.first_name}
              onChange={(e) => setData('first_name', e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="John"

            />
            <InputError message={errors.first_name} className='mt-2' />
          </div>

          <div>
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">
              Last Name *
            </label>
            <input
              id="last_name"
              name="last_name"
              type="text"
              required
              value={data.last_name}
              onChange={(e) => setData('last_name', e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Doe"
            />
            <InputError message={errors.last_name} className='mt-2' />
          </div>
        </div>

        {/* Email Address */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">
            Email Address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="you@example.com"
          />
          <InputError message={errors.email} className='mt-2' />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">
            Contact Number *
          </label>
          <input
            id="phone"
            name="phone"
            type="phone"
            required
            value={data.phone}
            onChange={(e) => setData('phone', e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="+977 9824598470"
          />
          <InputError message={errors.phone} className='mt-2' />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">
            Your Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            value={data.message}
            onChange={(e) => setData('message', e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Write your message..."
          />
          <InputError message={errors.message} className='mt-2' />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;