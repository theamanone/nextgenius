import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function getJwtToken(req: NextRequest) {
  try {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    return token;
  } catch (error) {
    console.error('Error getting JWT token:', error);
    return null;
  }
}
