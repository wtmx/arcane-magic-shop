'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SuperpowerType } from './SuperpowerList';

interface CheckoutFormProps {
  cart: SuperpowerType[];
}

export default function CheckoutForm({ cart }: CheckoutFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically process the payment
    // For now, we'll just redirect to a confirmation page with cart data
    const cartData = encodeURIComponent(JSON.stringify(cart));
    router.push(`/confirmation?cart=${cartData}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-1">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 bg-gray-800 rounded-md"
        />
      </div>
      <div>
        <label htmlFor="email" className="block mb-1">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 bg-gray-800 rounded-md"
        />
      </div>
      <div>
        <label htmlFor="cardNumber" className="block mb-1">Card Number</label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 bg-gray-800 rounded-md"
        />
      </div>
      <div className="flex space-x-4">
        <div className="flex-1">
          <label htmlFor="expiryDate" className="block mb-1">Expiry Date</label>
          <input
            type="text"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            required
            placeholder="MM/YY"
            className="w-full px-3 py-2 bg-gray-800 rounded-md"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="cvv" className="block mb-1">CVV</label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-gray-800 rounded-md"
          />
        </div>
      </div>
      <button type="submit" className="w-full bg-[#E62429] text-white px-6 py-2 rounded-md hover:bg-[#C51D23] transition-colors">
        Complete Purchase
      </button>
    </form>
  );
}