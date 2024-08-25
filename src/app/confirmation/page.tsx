'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { SuperpowerType } from '@/components/SuperpowerList';

export default function ConfirmationPage() {
  const router = useRouter();
  const [purchasedPowers, setPurchasedPowers] = useState<SuperpowerType[]>([]);

  useEffect(() => {
    const storedPowers = localStorage.getItem('purchasedPowers');
    if (storedPowers) {
      setPurchasedPowers(JSON.parse(storedPowers));
    }
  }, []);

  const totalPrice = purchasedPowers.reduce((sum, power) => sum + power.price, 0);

  const handleReturnToHome = () => {
    localStorage.removeItem('purchasedPowers');
    router.push('/');
  };

  return (
    <main className="min-h-screen bg-[#1A1A1A] text-white flex items-center justify-center">
      <div className="bg-[#252525] p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-center text-[#E62429]">Congratulations!</h1>
        <p className="text-xl mb-6 text-center">You&apos;ve successfully activated your superpowers!</p>
        
        <h2 className="text-2xl font-semibold mb-4">Your Acquired Powers:</h2>
        <ul className="space-y-2 mb-6">
          {purchasedPowers.map((power) => (
            <li key={power.id} className="flex justify-between items-center">
              <span>{power.name}</span>
              <span className="text-[#E62429]">${power.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
        
        <div className="text-xl font-bold mb-6 flex justify-between items-center">
          <span>Total:</span>
          <span className="text-[#E62429]">${totalPrice.toFixed(2)}</span>
        </div>
        
        <Button 
          onClick={handleReturnToHome}
          className="w-full bg-[#E62429] hover:bg-[#C41E23] text-white font-bold text-lg py-3 rounded-lg transition duration-300"
        >
          Return to Arcane Magic Shop Homepage
        </Button>
      </div>
    </main>
  );
}