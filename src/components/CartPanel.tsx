import React from 'react';
import { SuperpowerType } from './SuperpowerList';
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';
import Link from 'next/link';

interface CartPanelProps {
  cart: SuperpowerType[];
  removeFromCart: (powerId: number) => void;
  onCheckout: () => void;
}

export default function CartPanel({ cart, removeFromCart, onCheckout }: CartPanelProps) {
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="w-full lg:w-1/4 bg-[#252525] p-6 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-4 text-white">Your Power Arsenal</h2>
      {cart.length === 0 ? (
        <p className="text-gray-400">Your arsenal is empty. Acquire some powers!</p>
      ) : (
        <>
          <ul className="space-y-3 mb-4">
            {cart.map(item => (
              <li key={item.id} className="flex justify-between items-center bg-[#1A1A1A] p-2 rounded">
                <span className="font-medium">{item.name}</span>
                <div className="flex items-center">
                  <span className="mr-2 text-white">${item.price.toFixed(2)}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-white hover:bg-[#3A3A3A]"
                  >
                    <X size={16} />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mb-4 pb-4 border-b border-[#3A3A3A]">
            <div className="flex justify-between items-center font-bold text-lg">
              <span>Total Power:</span>
              <span className="text-[#E62429]">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <Link href="/checkout" className="bg-[#E62429] text-white px-6 py-2 rounded-md hover:bg-[#C51D23] transition-colors">
            Activate Powers
          </Link>
        </>
      )}
    </div>
  );
}