import Order from '../models/Order.js'

export const placeOrder = async (req, res) => {
  try {
    const { products, shippingAddress, fullName, pincode, mobileNumber } = req.body;
    const order = new Order({
        userId: req.user._id,
        products,
        shippingAddress,
        fullName,
        pincode,
        mobileNumber
    });
    await order.save();
    res.status(201).json({ message: 'Order placed successfully', order });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to place order' });
}
};

export const getUserOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user._id });
  res.json(orders);
};

export const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id);
  res.json(order);
};

export const getAllOrders = async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
};


export const updateOrderStatus = async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  res.json(order);
};
