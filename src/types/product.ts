export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  type: 'template' | 'custom';
  features: string[];
  preview: string;
  demoUrl?: string;
  technologies: string[];
  category: string;
}

export interface Order {
  id: string;
  userId: string;
  productId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  paymentId?: string;
  amount: number;
  deliveryMethod: 'email' | 'download' | 'both';
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
