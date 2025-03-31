import React from 'react'

const PrivacyPolicy = () => {
  return (
    <div className="h-screen min-h-[725px] text-center">
            <div className='bg-[#4f2412] p-6 max-w-3xl mx-auto my-12 rounded-lg shadow-white shadow-sm'>
                <h1 className="text-3xl font-bold mb-4 bg-[#bba487] rounded-lg p-2">Privacy Policy</h1>
                <div className='bg-[#bba487] p-4 rounded-lg h-96'>
                    <p className="text-lg">
                    Your privacy is important to us. This policy explains how we collect, use, and protect your data when you use RecipeNest.
                    </p>
                    <h2 className="text-2xl font-semibold mt-4">Data Collection</h2>
                    <p>We collect information such as your name, email, and recipes you save to enhance your experience.</p>
                    <h2 className="text-2xl font-semibold mt-4">Your Rights</h2>
                    <p>You can request data deletion or modifications at any time.</p>
                </div>
            </div>
        </div> 
  )
}

export default PrivacyPolicy
