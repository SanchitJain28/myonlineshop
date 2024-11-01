import React from 'react'

export default function Footer() {
    return (
        <>
            <div className="flex bg-black text-white justify-center absolute bottom-0	">
                <div className='m-4 p-4 w-1/2'>About Us
                    Welcome to InstaCart, your go-to destination for premium Products designed to meet your needs. We offer an exclusive range of high-quality products, all handpicked to ensure the best shopping experience for our customers. Whether you're looking for Electronics, Clothes, or Descoration, we've got you covered.
                    <div className="mt-4">
                    <i className="fa-2xl fa-brands fa-instagram mr-4"></i>
                    <i className="fa-2xl fa-brands fa-facebook m-4"></i>
                    <i className="fa-2xl fa-brands fa-whatsapp m-4 "></i>
                    <i className="fa-2xl fa-brands fa-x-twitter m-4"></i>
                    <i className="fa-2xl fa-brands fa-reddit m-4"></i>
                    <i className="fa-2xl fa-brands fa-discord m-4"></i>
                    </div>
                </div>
                <div className='flex flex-col mx-20 p-4'>
                    <a className='my-2 font-sans text-lg'>Login</a>
                    <a className='my-2 font-sans text-lg'>About us</a>
                    <a className='my-2 font-sans text-lg'>Contact us</a>
                    <a className='my-2 font-sans text-lg'>Categories</a>
                    <a className='my-2 font-sans text-lg'>Become a seller</a>

                </div>
            </div>
        </>
    )
}
