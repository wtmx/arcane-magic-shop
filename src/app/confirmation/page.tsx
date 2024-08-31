'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { SuperpowerType } from '../../components/SuperpowerList';

export const dynamic = 'force-dynamic';

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const cartParam = searchParams.get('cart');
  const cart: SuperpowerType[] = cartParam ? JSON.parse(decodeURIComponent(cartParam)) : [];

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <main className="min-h-screen bg-[#1A1A1A] text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-[#E62429]">Congratulations!</h1>
        <p className="text-xl text-center mb-8">You&apos;ve successfully activated your superpowers!</p>
        
        <div className="bg-[#252525] p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Your Acquired Powers:</h2>
          <ul className="space-y-2 mb-4">
            {cart.map(item => (
              <li key={item.id} className="flex justify-between">
                <span>{item.name}</span>
                <span>${item.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-gray-600 pt-4 mt-4">
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <Link href="/" className="bg-[#E62429] text-white px-6 py-2 rounded-md hover:bg-[#C51D23] transition-colors">
            Return to Arcane Magic Shop Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}