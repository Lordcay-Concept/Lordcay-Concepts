import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/lib/models/User';

export async function GET() {
  try {
    await connectToDatabase();
    
    const existingAdmin = await User.findOne({ email: 'admin@lordcay.com' });
    if (!existingAdmin) {
      await User.create({
        email: 'admin@lordcay.com',
        password: 'Admin123!',
        name: 'Admin User',
        role: 'admin'
      });
      return NextResponse.json({ message: 'Admin user created! Email: admin@lordcay.com, Password: Admin123!' });
    }
    
    return NextResponse.json({ message: 'Admin user already exists' });
  } catch (error) {
    return NextResponse.json({ error: 'Setup failed' }, { status: 500 });
  }
}