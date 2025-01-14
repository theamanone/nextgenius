"use client";
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { FiBox, FiEdit2, FiTrash2, FiPlus, FiX, FiDollarSign, FiTag, FiLink } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import ProductModal from '../components/ProductModal';
import SkeletonLoader from '../components/SkeletonLoader';
import { FALLBACK_IMAGE } from '@/lib/data';

interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  image: string;
  downloadUrl: string;
  demoUrl?: string;
  category: string;
  features: string[];
  requirements: string[];
  isActive: boolean;
  createdAt: string;
}

interface FormData {
  name: string;
  description: string;
  price: number;
  image: string;
  downloadUrl: string;
  demoUrl: string;
  category: string;
  features: string[];
  requirements: string[];
  isActive: boolean;
}

export default function AdminProducts() {
  const { data: session } = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    price: 0,
    image: '',
    downloadUrl: '',
    demoUrl: '',
    category: '',
    features: [''],
    requirements: [''],
    isActive: true,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayInputChange = (index: number, value: string, field: 'features' | 'requirements') => {
    setFormData(prev => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return { ...prev, [field]: newArray };
    });
  };

  const addArrayItem = (field: 'features' | 'requirements') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (index: number, field: 'features' | 'requirements') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (formData: any) => {
    try {
      const url = editingProduct ? `/api/admin/products/${editingProduct._id}` : '/api/admin/products';
      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: Number(formData.price),
          image: formData.image,
          downloadUrl: formData.downloadUrl,
          demoUrl: formData.demoUrl || '',
          category: formData.category,
          features: formData.features.filter((f: string) => f.trim() !== ''),
          requirements: formData.requirements.filter((r: string) => r.trim() !== ''),
          isActive: Boolean(formData.isActive)
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save product');
      }

      const data = await response.json();
      
      if (editingProduct) {
        setProducts(products.map(p => p._id === data.product._id ? data.product : p));
        toast.success('Product updated successfully!');
      } else {
        setProducts([data.product, ...products]);
        toast.success('Product created successfully!');
      }

      setIsModalOpen(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save product');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('Product deleted successfully');
        setProducts(products.filter(p => p._id !== id));
      } else {
        throw new Error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: 0,
      image: '',
      downloadUrl: '',
      demoUrl: '',
      category: '',
      features: [''],
      requirements: [''],
      isActive: true,
    });
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (res.ok) {
        toast.success('Product status updated');
        fetchProducts();
      } else {
        throw new Error('Failed to update product status');
      }
    } catch (error) {
      console.error('Error updating product status:', error);
      toast.error('Failed to update product status');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 h-full">
      <div className="flex items-center justify-end">
        <button
          onClick={handleAdd}
          className="inline-flex items-center px-4 py-2 bg-primary  rounded-xl hover:bg-primary/90 transition-colors"
        >
          <FiPlus className="w-5 h-5 mr-2" />
          Add Product
        </button>
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <SkeletonLoader count={6} type="card" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(products) && products?.map((product: any) => (
            <div
              key={product._id}
              className="bg-white roundproducts.maped-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <div className="relative h-48">
                <Image
                  src={product.image || FALLBACK_IMAGE}
                  alt={product.name}
                  fill
                  className="object-cover"
                  onError={(e: any) => {
                    e.target.src = FALLBACK_IMAGE;
                  }}
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                  >
                    <FiEdit2 className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                  >
                    <FiTrash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  <span className="text-lg font-bold text-primary">${product.price}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>

                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${product.isActive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                    {product.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <button
                    onClick={() => handleToggleStatus(product._id, product.isActive)}
                    className="text-sm text-primary hover:text-primary/80"
                  >
                    Toggle Status
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product Modal */}
      {isModalOpen && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={() => handleSubmit(formData)}
          initialData={editingProduct || null}
          isEditing={!!editingProduct}
        />
      )}
    </div>
  );
}
