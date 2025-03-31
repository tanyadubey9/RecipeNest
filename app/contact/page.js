import React from 'react'
import Image from 'next/image'

const Contact = () => {
    return (
        <div className="h-screen min-h-[725px] text-center">
            <div className='bg-[#4f2412] p-6 max-w-3xl mx-auto my-12 rounded-lg shadow-white shadow-sm'>
            <h1 className="text-3xl font-bold mb-4 bg-[#bba487] rounded-lg p-2">Contact Us</h1>
            <div className='bg-[#bba487] p-4 rounded-lg h-96'>
                <p className="text-lg font-semibold">Have questions or feedback? We&apos;d love to hear from you!</p>
                <h2 className="text-2xl font-semibold mt-4">Email</h2>
                <p>📩 support@recipenest.com</p>
                <h2 className="text-2xl font-semibold mt-4">Social Media</h2>
                <p>📍 Follow us on Instagram, Twitter, and Facebook for updates.</p>
                <div className='flex justify-center items-center gap-3 my-5'>
                    <Image src="/instagram.png" alt="instagram" width={25} height={25} />
                    <Image src="/facebook.png" alt="facebook" width={25} height={25} />
                    <Image src="/twitter.png" alt="twitter" width={25} height={25} />
                </div>
            </div>
            </div>
        </div>
    )
}

export default Contact
