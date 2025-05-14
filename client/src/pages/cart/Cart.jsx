/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import Modal from '../../components/modal/Modal';
import axios from 'axios';

function Cart() {
  const context = useContext(myContext);
  const { mode } = context;

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token'); 
  
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cart', {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        console.log("this is response", response.data[0].productId)
        setCartItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setLoading(false);
      }
    };
    fetchCartItems();
  }, [token]);

  const handleRemoveItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      setCartItems(cartItems.filter(item => item._id !== itemId));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((acc, item) => acc + (item.quantity * item.productId.price), 0);
    const shipping = 20; 
    return { subtotal, shipping, total: subtotal + shipping };
  };

  const { subtotal, shipping, total } = calculateTotal();

  return (
    <Layout>
      <div className="h-screen bg-gray-100 pt-5" style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '' }}>
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {loading ? (
              <p>Loading cart items...</p>
            ) : (
              cartItems.map(item => (
                <div key={item._id} className="justify-between mb-6 rounded-lg border drop-shadow-xl bg-white p-6 sm:flex sm:justify-start"
                  style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '' }}>
                  <img src={item.productId.thumbnail || 'https://dummyimage.com/400x400'} alt="product-image" className="w-full rounded-lg sm:w-40" />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.productId.title}</h2>
                      <h2 className="text-sm text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.productDesc}</h2>
                      <p className="mt-1 text-xs font-semibold text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{item.productId.price}</p>
                    </div>
                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <button onClick={() => handleRemoveItem(item._id)} className="text-red-600">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3"
            style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '' }}>
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Subtotal</p>
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{subtotal}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Shipping</p>
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{shipping}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between mb-3">
              <p className="text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>Total</p>
              <p className="mb-1 text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{total}</p>
            </div>
            <Modal cartItems={cartItems} clearCart={() => setCartItems([])} />
            </div>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
