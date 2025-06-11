import { CircleSmall, Mail, Phone } from 'lucide-react'
import React from 'react'

const ContactAddress = () => {
    return (
        <>
            <div className='mb-4 font-bold'>ContactAddress</div>

            <div className="grid grid-cols-2 gap-4">
                <div className="border border-amber-300 rounded-2xl p-4">
                    <div className='flex flex-col items-center justify-center text-center'>
                        <div className='flex gap-1 items-center justify-center'>
                        <div className='bg-gray-200  px-2 py-2 rounded-md'>
                                <Mail />
                            </div>
                            <p className='font-semibold text-lg'>Email us</p>
                        </div>
                        <p className="text-gray-500">Our team is ready to assist.</p>
                        <p className="font-semibold text-gray-50 dark:text-white">abc@example.com</p>
                    </div>
                </div>
                <div className="border border-amber-300 rounded-2xl p-4">
                    <div className='flex flex-col items-center justify-center text-center'>
                        <div className='flex gap-1 items-center justify-center'>
                            <div className='bg-gray-200  px-2 py-2 rounded-md'>
                                <Phone />
                            </div>
                            <p className='font-medium text-lg'>Call us</p>
                        </div>
                        <p className="text-gray-500">Our team is ready to assist.</p>
                        <p className="font-semibold text-gray-50 dark:text-white">abc@example.com</p>
                    </div>
                </div>
               
               
            </div>
           
        </>

    )
}

export default ContactAddress