import Razorpay from 'razorpay';

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

/**
 * Creates a new order in Razorpay
 * @param amount - Amount in INR (will be converted to paise internally)
 * @returns Object containing success status and either order data or error message
 */
export const createOrder = async (amount: number) => {
  try {
    const order = razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      payment_capture: true,
    });
    return { success: true, data: order };
  } catch (error) {
    console.error('Razorpay order creation failed:', error);
    return { success: false, error: 'Payment initialization failed' };
  }
};

/**
 * Verifies the payment signature from Razorpay
 * @param razorpay_order_id - Order ID received from Razorpay
 * @param razorpay_payment_id - Payment ID received from Razorpay
 * @param razorpay_signature - Signature received from Razorpay
 * @returns boolean indicating whether the signature is valid
 */
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