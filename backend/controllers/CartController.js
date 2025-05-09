import CartItem from '../models/CartItem.js';

export const getCart = async (req, res) => {
  const cart = await CartItem.find({ userId: req.user._id }).populate('productId');
  res.json(cart);
};

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const existing = await CartItem.findOneAndUpdate(
    { userId: req.user._id, productId },
    { $set: { quantity } },
    { upsert: true, new: true }
  );
  res.json(existing);
};

export const removeFromCart = async (req, res) => {
  await CartItem.findOneAndDelete({ _id: req.params.itemId, userId: req.user._id });
  res.json({ msg: 'Item removed' });
};

export const clearCart = async (req, res) => {
  await CartItem.deleteMany({ userId: req.user._id });
  res.json({ msg: 'Cart cleared' });
};
