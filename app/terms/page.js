import React from 'react'

const TermsOfUse = () => {
    return (
        <div className="h-screen min-h-[725px] text-center">
            <div className='bg-[#4f2412] p-6 max-w-3xl mx-auto my-12 rounded-lg shadow-white shadow-sm'>
                <h1 className="text-3xl font-bold mb-4 bg-[#bba487] rounded-lg p-2">Terms of Use</h1>
                <div className='bg-[#bba487] p-4 rounded-lg h-96'>
                    <p className="text-lg">
                        Welcome to RecipeNest! By using our website, you agree to the following terms and conditions.
                    </p>
                    <h2 className="text-2xl font-semibold mt-4">Usage Guidelines</h2>
                    <p>Users must provide accurate information and follow our content policies when submitting recipes.</p>
                    <h2 className="text-2xl font-semibold mt-4">Limitations</h2>
                    <p>We are not responsible for any inaccurate or harmful recipe content shared by users.</p>
                </div>
            </div>
        </div>
    )
}

export default TermsOfUse
