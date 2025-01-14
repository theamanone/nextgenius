import mongoose, { Schema } from 'mongoose';

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  technologies: string[];
  features: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  demoUrl: String,
  githubUrl: String,
  technologies: [{ type: String }],
  features: [{ type: String }],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Add middleware to update the updatedAt field
productSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);
