import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export const createOrder = async (amount: number) => {
  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      payment_capture: 1,
    });
    return { success: true, data: order };
  } catch (error) {
    console.error('Razorpay order creation failed:', error);
    return { success: false, error: 'Payment initialization failed' };
  }
};

export const verifyPayment = (
  razorpay_order_id: string,
  razorpay_payment_id: string,
  razorpay_signature: string
) => {
  const hmac = require('crypto').createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!);
  const generated_signature = hmac
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');
  
  return generated_signature === razorpay_signature;
};
