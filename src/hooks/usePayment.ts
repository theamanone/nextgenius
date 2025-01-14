import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';

interface PaymentOptions {
  amount: number;
  productId: string;
  deliveryMethod: 'email' | 'download' | 'both';
  email: string;
}

export const usePayment = () => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const initializePayment = async ({
    amount,
    productId,
    deliveryMethod,
    email,
  }: PaymentOptions) => {
    try {
      setLoading(true);

      if (!session) {
        toast.error('Please sign in to continue');
        return;
      }

      // Create order on server
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, productId }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount * 100,
        currency: 'INR',
        name: 'WebGeniusCraft',
        description: 'Product Purchase',
        order_id: data.orderId,
        prefill: {
          name: session.user?.name || '',
          email: session.user?.email || '',
        },
        theme: {
          color: '#4F46E5',
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
          },
          // Center modal and add animation
          animation: true,
          backdropClose: true,
          escape: true,
          handleBack: true,
          confirm_close: true,
          position: 'center',
        },
        handler: async function(response: any) {
          try {
            const verificationResponse = await fetch('/api/payment', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                productId,
                deliveryMethod,
                email,
              }),
            });

            const verificationData = await verificationResponse.json();
            if (!verificationResponse.ok) throw new Error(verificationData.error);

            toast.success('Payment successful!');

            // Handle delivery based on method
            if (deliveryMethod.includes('download') && verificationData.downloadUrl) {
              window.location.href = verificationData.downloadUrl;
            }
            if (deliveryMethod.includes('email')) {
              toast.success('Check your email for the product details');
            }

          } catch (error: any) {
            console.error('Payment verification failed:', error);
            toast.error(error.message || 'Payment verification failed');
          } finally {
            setLoading(false);
          }
        },
      };

      // Add custom styles to center the modal
      const style = document.createElement('style');
      style.innerHTML = `
        .razorpay-backdrop {
          background: rgba(0, 0, 0, 0.8) !important;
          backdrop-filter: blur(5px) !important;
        }
        .razorpay-payment-button {
          position: fixed !important;
          top: 50% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) !important;
          z-index: 999999 !important;
        }
        .razorpay-checkout-frame {
          margin: auto !important;
        }
      `;
      document.head.appendChild(style);

      const razorpay = new (window as any).Razorpay(options);
      razorpay.on('payment.failed', function(response: any) {
        toast.error('Payment failed. Please try again.');
        setLoading(false);
      });
      razorpay.open();

    } catch (error: any) {
      console.error('Payment initialization failed:', error);
      toast.error(error.message || 'Payment initialization failed');
      setLoading(false);
    }
  };

  return { initializePayment, loading };
};
