import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';

const Order = () => {
  const context = useContext(myContext);
  const { mode } = context;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('User not authenticated');
          return;
        }
        const response = await axios.get(`http://localhost:5000/api/order`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="h-screen flex items-center justify-center">
          <div className="text-xl font-semibold">Loading orders...</div>
        </div>
      </Layout>
    );
  }

  if (orders.length === 0) {
    return (
      <Layout>
        <div className="h-screen flex items-center justify-center">
          <div className="text-xl font-semibold">No orders found.</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div
        className="min-h-screen pt-5"
        style={{
          backgroundColor: mode === 'dark' ? '#282c34' : '#f3f4f6',
          color: mode === 'dark' ? 'white' : '',
        }}
      >
        <h1 className="mb-10 text-center text-2xl font-bold">Your Orders</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 xl:px-0">
          {orders.map((order) => (
            <div
              key={order._id}
              className="mb-6 rounded-lg border drop-shadow-xl p-6 bg-white"
              style={{
                backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : 'white',
                color: mode === 'dark' ? 'white' : '',
              }}
            >
              <h2 className="text-lg font-bold mb-2">Order ID: {order._id}</h2>
              <p><strong>Name:</strong> {order.fullName}</p>
              <p><strong>Address:</strong> {order.shippingAddress}</p>
              <p><strong>Mobile:</strong> {order.mobileNumber}</p>
              <p><strong>Pincode:</strong> {order.pincode}</p>
              <p><strong>Status:</strong> {order.status || 'Pending'}</p>
              <p><strong>Ordered on:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              <h3 className="font-semibold mt-4 mb-2">Products:</h3>
              <ul className="list-disc ml-6">
                {order.products.map((product, index) => (
                  <li key={index}>
                    Product ID: {product.productId}, Quantity: {product.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Order;
