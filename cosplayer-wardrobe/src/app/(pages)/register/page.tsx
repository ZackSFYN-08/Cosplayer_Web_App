"use client";

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Perbaikan: Menggunakan NEXT_PUBLIC_API_URL dari variabel lingkungan
      // Ini memastikan kode tetap jalan baik di localhost maupun saat sudah di hosting nanti.
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
      
      const res = await fetch(`${apiUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.msg || 'Failed to register');
      }

      const data = await res.json();
      login(data.token); 
      router.push('/'); 

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#2D2D2D] p-8 rounded-2xl max-w-md mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Create Account</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block mb-2 text-lg text-gray-200">Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full bg-[#3C3C3C] text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E94A61]" />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 text-lg text-gray-200">E-mail</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-[#3C3C3C] text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E94A61]" />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-lg text-gray-200">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-[#3C3C3C] text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E94A61]" />
        </div>
        {error && <p className="text-red-400 text-center">{error}</p>}
        <div className="pt-4">
          <button type="submit" disabled={isLoading} className="w-full bg-[#E94A61] hover:bg-red-600 text-white font-bold py-3 px-12 rounded-lg transition-colors text-lg disabled:bg-gray-500">
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </div>
        <p className="text-center text-gray-400">
          Already have an account? <Link href="/login" className="text-[#E94A61] hover:underline">Login here</Link>
        </p>
      </form>
    </div>
  );
}