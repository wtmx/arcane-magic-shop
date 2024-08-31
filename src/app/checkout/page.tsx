'use client';

import { useSearchParams } from 'next/navigation';
import CheckoutForm from '../../components/CheckoutForm';
import { SuperpowerType } from '../../components/SuperpowerList';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const cartParam = searchParams.get('cart');
  const cart: SuperpowerType[] = cartParam ? JSON.parse(decodeURIComponent(cartParam)) : [];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <CheckoutForm cart={cart} />
    </div>
  );
}

export default function Checkout() {
  return (
    <main className="min-h-screen bg-[#1A1A1A] text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-[#E62429]">Checkout</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <CheckoutContent />
        </Suspense>
      </div>
    </main>
  );
}