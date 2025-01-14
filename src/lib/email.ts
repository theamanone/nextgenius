import { siteConfig } from '@/config/site.config';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'amankirmara143@gmail.com',
    pass: 'hayc bind hsil inmp'
  }
});

const WEBSITE_URL = `${siteConfig.url}`;

const userEmailTemplate = (name: string) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
    <div style="text-align: center; margin-bottom: 30px;">
      <img src="${WEBSITE_URL}/logo.png" alt="WebGeniusCraft" style="max-width: 200px;">
    </div>
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <h2 style="color: #2c3e50; margin-bottom: 20px;">Thank You for Reaching Out!</h2>
      <p style="color: #34495e; line-height: 1.6;">Hello ${name},</p>
      <p style="color: #34495e; line-height: 1.6;">We've received your message and want to thank you for writing to us. We'll get back to you very soon.</p>
      <p style="color: #34495e; line-height: 1.6;">In the meantime, feel free to:</p>
      <ul style="color: #34495e; line-height: 1.6;">
        <li>Visit our <a href="${WEBSITE_URL}" style="color: #3498db;">website</a></li>
        <li>Check out our latest projects</li>
        <li>Follow us on social media</li>
      </ul>
    </div>
    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
      <p style="color: #7f8c8d; font-size: 14px;">${new Date().getFullYear()} WebGeniusCraft. All rights reserved.</p>
      <div style="margin-top: 10px;">
        <a href="${WEBSITE_URL}/contact" style="color: #3498db; text-decoration: none; margin: 0 10px;">Contact</a>
        <a href="${WEBSITE_URL}/privacy" style="color: #3498db; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
      </div>
    </div>
  </div>
`;

const adminEmailTemplate = (name: string, email: string, message: string, ip: string, userAgent: string) => `
  <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
    <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">New Contact Form Submission</h2>
    
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="color: #2c3e50; margin-bottom: 15px;">Contact Details</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee; color: #7f8c8d;">Name:</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; color: #2c3e50;"><strong>${name}</strong></td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee; color: #7f8c8d;">Email:</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; color: #2c3e50;">
            <a href="mailto:${email}" style="color: #3498db; text-decoration: none;">${email}</a>
          </td>
        </tr>
      </table>
    </div>

    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="color: #2c3e50; margin-bottom: 15px;">Message</h3>
      <p style="color: #34495e; line-height: 1.6; white-space: pre-wrap;">${message}</p>
    </div>

    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="color: #2c3e50; margin-bottom: 15px;">Technical Details</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee; color: #7f8c8d;">IP Address:</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; font-family: monospace;">${ip}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee; color: #7f8c8d;">User Agent:</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; font-family: monospace;">${userAgent}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee; color: #7f8c8d;">Timestamp:</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; font-family: monospace;">${new Date().toISOString()}</td>
        </tr>
      </table>
    </div>

    <div style="text-align: center; margin-top: 30px;">
      <a href="${WEBSITE_URL}/admin/messages" 
         style="background-color: #3498db; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; display: inline-block;">
        View in Admin Panel
      </a>
    </div>
  </div>
`;

export const sendEmail = async (to: string, subject: string, name: string, isAdmin = false, details?: { email?: string; message?: string; ip?: string; userAgent?: string }) => {
  try {
    const html = isAdmin && details 
      ? adminEmailTemplate(name, details.email!, details.message!, details.ip!, details.userAgent!)
      : userEmailTemplate(name);

    await transporter.sendMail({
      from: 'amankirmara143@gmail.com',
      to,
      subject,
      html
    });
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};
