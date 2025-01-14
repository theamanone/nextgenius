'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import Script from 'next/script';
import { IProduct } from '@/models/Product';
import FeatureUnavailableWrapper from '@/components/ui/FeatureUnavailableWrapper';
import { AlertTriangle } from 'lucide-react';

// Fallback image
const FALLBACK_IMAGE = '/images/placeholder.jpg';

export default function MarketplacePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black p-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-xl border border-white/20">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="h-6 w-6 text-yellow-500" />
          <h1 className="text-xl font-semibold text-white">
            Marketplace Coming Soon
          </h1>
        </div>
        <p className="text-gray-300">
          Our marketplace is currently under development. We are working on bringing you a seamless experience for discovering and purchasing digital assets. Please check back later.
        </p>
      </div>
    </main>
  );
}

const ProductCard = ({ product }: { product: IProduct }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [purchased, setPurchased] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [productDetails, setProductDetails] = useState<any>(null);
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);

  useEffect(() => {
    // Load Razorpay script and add styles
    const loadRazorpayAndStyles = () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        setIsRazorpayLoaded(true);
        // Add Razorpay modal styles
        const style = document.createElement('style');
        style.textContent = `
          .razorpay-payment-button, .razorpay-backdrop {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            z-index: 999999 !important;
            background: rgba(0, 0, 0, 0.6) !important;
          }
          .razorpay-checkout-frame {
            max-height: 95vh !important;
            max-width: 95vw !important;
            margin: auto !important;
            position: relative !important;
            background: white !important;
            z-index: 1000000 !important;
          }
          @media (max-width: 768px) {
            .razorpay-checkout-frame {
              width: 100% !important;
              height: 100% !important;
              max-height: 100vh !important;
              max-width: 100vw !important;
            }
          }
        `;
        document.head.appendChild(style);
      };
      document.body.appendChild(script);
      return script;
    };

    const script = loadRazorpayAndStyles();
    return () => {
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // Check purchase status only once when component mounts
  useEffect(() => {
    let mounted = true;

    const checkPurchaseStatus = async () => {
      if (session?.user) {
        try {
          const res = await fetch(`/api/download/${product.id}`);
          const data = await res.json();
          
          if (mounted && res.ok && data.success) {
            setPurchased(true);
            setProductDetails(data.product);
          }
        } catch (error) {
          console.error('Failed to check purchase status:', error);
        }
      }
    };

    checkPurchaseStatus();

    return () => {
      mounted = false;
    };
  }, [session?.user?.id, product.id]); // Only depend on user ID and product ID

  const handleDownload = () => {
    setShowDownloadModal(true);
  };

  const DownloadModal = () => {
    if (!showDownloadModal || !productDetails) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <h3 className="text-2xl font-bold mb-4">{productDetails.name}</h3>
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Technologies Used:</h4>
            <div className="flex flex-wrap gap-2">
              {productDetails.technologies.map((tech: string) => (
                <span key={tech} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <a
              href={productDetails.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-[#24292F] hover:bg-[#24292F]/90 text-white px-4 py-2 rounded-lg font-medium"
            >
              Open on GitHub
            </a>
            <button
              onClick={() => setShowDownloadModal(false)}
              className="block w-full text-center border border-gray-300 px-4 py-2 rounded-lg font-medium hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  const handlePurchase = async () => {
    if (!session) {
      router.push(`/auth/signin?callbackUrl=${encodeURIComponent(`/marketplace?product=${product.id}`)}`);
      return;
    }

    if (purchased) {
      handleDownload();
      return;
    }

    if (!isRazorpayLoaded) {
      toast.error('Payment system is initializing. Please try again in a moment.');
      return;
    }

    try {
      setLoading(true);
      toast.loading('Initializing payment...');

      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: product.price,
          productId: product.id
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Payment initialization failed');
      }

      const options:any = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.data.amount,
        currency: data.data.currency,
        name: 'Alfamtrix',
        description: `Purchase ${product.name}`,
        order_id: data.data.orderId,
        prefill: {
          name: session.user?.name || '',
          email: session.user?.email || '',
        },
        theme: {
          color: '#2563eb'
        },
        handler: async function(response: any) {
          try {
            const verifyRes = await fetch('/api/payment', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                productId: product.id
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              toast.success('Payment successful!');
              setPurchased(true);
              // Fetch updated product details
              const downloadRes = await fetch(`/api/download/${product.id}`);
              const downloadData = await downloadRes.json();
              if (downloadData.success) {
                setProductDetails(downloadData.product);
                handleDownload();
              }
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (error) {
            console.error('Verification error:', error);
            toast.error('Payment verification failed');
          } finally {
            setLoading(false);
          }
        },
        modal: {
          confirm_close: true,
          escape: true,
          animation: true,
          backdropClose: false,
          handlebar: true,
          ondismiss: function() {
            setLoading(false);
            toast.dismiss();
            toast.error('Payment cancelled');
          }
        }
      };

      const rzp = new window.Razorpay(options);
      
      rzp.on('payment.failed', function(response: any) {
        console.error('Payment failed:', response.error);
        toast.dismiss();
        toast.error(response.error.description || 'Payment failed');
        setLoading(false);
      });

      rzp.open();
    } catch (error: any) {
      console.error('Payment error:', error);
      toast.dismiss();
      toast.error(error.message || 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative flex flex-col rounded-2xl border border-border bg-background overflow-hidden"
      >
        <div className="relative h-48 w-full">
          <Image
            src={product.image || FALLBACK_IMAGE}
            alt={product.name}
            fill
            className="object-cover"
            onError={(e: any) => {
              e.target.src = FALLBACK_IMAGE;
            }}
          />
        </div>

        <div className="p-6 flex-1">
          <h3 className="text-2xl font-bold text-foreground">{product.name}</h3>
          <p className="mt-2 text-muted-foreground">{product.description}</p>
          
          <div className="mt-4 space-y-4">
            <div className="flex flex-wrap gap-2">
              {product.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2">Features:</h4>
              <ul className="space-y-1">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start text-sm text-muted-foreground">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-foreground">₹{product.price}</span>
                <span className="ml-1 text-sm text-muted-foreground">INR</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 pt-0">
          <button
            onClick={handlePurchase}
            disabled={loading || (!purchased && !isRazorpayLoaded)}
            className={`w-full rounded-lg px-4 py-2 font-medium text-white transition-colors duration-200 ${
              purchased
                ? 'bg-green-600 hover:bg-green-700'
                : loading || !isRazorpayLoaded
                ? 'bg-primary/50 cursor-not-allowed'
                : 'bg-primary hover:bg-primary/90'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing...
              </span>
            ) : purchased ? (
              'Download Project'
            ) : !isRazorpayLoaded ? (
              'Loading...'
            ) : (
              'Purchase Now'
            )}
          </button>
        </div>
      </motion.div>

      <DownloadModal />
    </>
  );
};
