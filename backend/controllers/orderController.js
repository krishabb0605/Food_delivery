import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import Stripe from 'stripe';
import 'dotenv/config'; // Ensure this is at the top

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing user order from frontend
const placeOrder = async (req, res) => {
  let frontend_url = 'https://fooddelivery-mern.netlify.app';
  if (process.env.ENV !== 'production') {
    frontend_url = 'http://localhost:5173';
  }

  try {
    let itemData;
    let orderId;
    if (req.body._id) {
      const orderData = await orderModel.findById(req.body._id);
      if (orderData) {
        itemData = orderData.items;
        orderId = req.body._id;
      }
    } else {
      const newOrder = new orderModel({
        userId: req.body.userId,
        items: req.body.items,
        amount: req.body.amount,
        address: req.body.address,
        date: Date.now(),
      });

      await newOrder.save();

      await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
      orderId = newOrder._id;
      itemData = req.body.items;
    }

    const line_items = itemData.map((item) => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 80,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: 'inr',
        product_data: {
          name: 'Delivery Charges',
        },
        unit_amount: 2 * 100 * 80,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: 'payment',
      success_url: `${frontend_url}/verify?success=true&orderId=${orderId}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${orderId}`,
    });

    res.json({
      success: true,
      session_url: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: 'Error' });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success, id } = req.body;
  try {
    // Retrieve the Checkout Session
    const session = await stripe.checkout.sessions.retrieve(id);
    const paymentIntentId = session.payment_intent;

    // Retrieve the Payment Intent to get charge details
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    const paymentMethodId = paymentIntent.payment_method;

    // Retrieve payment method data
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);

    const cardholderName = paymentMethod.billing_details.name;
    const cardholderEmail = paymentMethod.billing_details.email;
    let last4, payment_method_type;

    if (paymentMethod.type === 'card') {
      last4 = paymentMethod.card.last4;
    } else {
      payment_method_type = 'Using Link';
    }

    const cardData = last4
      ? { cardholderName, cardholderEmail, last4 }
      : { cardholderName, cardholderEmail, payment_method_type };

    // Update order status based on success flag
    if (success === 'true') {
      await orderModel.findByIdAndUpdate(orderId, {
        payment: true,
        paymentInfo: cardData,
      });
      res.json({ success: true, message: 'paid' });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: 'not paid' });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: 'Error' });
  }
};

// user orders for frontend
const usersOrder = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: 'Error' });
  }
};

// listing orders for admine pannel
const listOrder = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: 'Error' });
  }
};

// api for updating order status

const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.id, {
      status: req.body.status,
    });
    res.json({ success: true, message: 'Status updated' });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: 'Error' });
  }
};

export { placeOrder, verifyOrder, usersOrder, listOrder, updateStatus };
