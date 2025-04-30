/* eslint-disable react/prop-types */
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import axios from 'axios';

export default function Modal({ cartItems, clearCart }) {  // <- accept props
    let [isOpen, setIsOpen] = useState(false)
    let [formData, setFormData] = useState({
        name: '',
        address: '',
        pincode: '',
        mobileNumber: ''
    });

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleOrderNow = async () => {
        const token = localStorage.getItem('token');

        try {
            const orderData = {
                products: cartItems.map(item => ({
                    productId: item.productId._id,
                    quantity: item.quantity
                })),
                shippingAddress: formData.address,
                fullName: formData.name,
                pincode: formData.pincode,
                mobileNumber: formData.mobileNumber
            };

            const response = await axios.post('http://localhost:5000/api/order', orderData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log('Order placed:', response.data);
            clearCart(); // after order, clear cart
            closeModal();
            window.location.href = '/order'; // Redirect to Orders page
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    return (
        <>
            <div className="text-center rounded-lg text-white font-bold">
                <button
                    type="button"
                    onClick={openModal}
                    className="w-full py-2 text-center rounded-lg text-white font-bold bg-green-600"
                >
                    Buy Now
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl p-2 text-left align-middle shadow-xl transition-all bg-gray-50">
                                    <section>
                                        <div className="flex flex-col items-center justify-center py-8 mx-auto">
                                            <div className="w-full rounded-lg sm:max-w-md">
                                                <div className="p-6 space-y-4">
                                                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                                        <div>
                                                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Enter Full Name</label>
                                                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} id="name" required className="border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 bg-gray-100" />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">Enter Full Address</label>
                                                            <input type="text" name="address" value={formData.address} onChange={handleInputChange} id="address" required className="border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 bg-gray-100" />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="pincode" className="block mb-2 text-sm font-medium text-gray-900">Enter Pincode</label>
                                                            <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} id="pincode" required className="border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 bg-gray-100" />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="mobileNumber" className="block mb-2 text-sm font-medium text-gray-900">Enter Mobile Number</label>
                                                            <input type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} id="mobileNumber" required className="border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 bg-gray-100" />
                                                        </div>
                                                    </form>

                                                    <button
                                                        onClick={handleOrderNow}
                                                        type="button"
                                                        className="focus:outline-none w-full text-white bg-green-600 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5"
                                                    >
                                                        Order Now
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
