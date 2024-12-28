import { Schema, model, models } from 'mongoose';

const contactSchema = new Schema({
  name: String,
  email: String,
  message: String,
  status: {
    type: String,
    enum: ['unread', 'read'],
    default: 'unread'
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  ip: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    required: true
  }
});

export const Contact = models.Contact || model('Contact', contactSchema);
