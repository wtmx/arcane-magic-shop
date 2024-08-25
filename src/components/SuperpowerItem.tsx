'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Check } from 'lucide-react';

interface SuperpowerItemProps {
  power: {
    name: string;
    image: string;
    powerLevel: number;
    element: string;
    duration: string;
    energyCost: number;
    price: number;
  };
  addToCart: (power: any) => void;
  isInCart: boolean;
}

export default function SuperpowerItem({ power, addToCart, isInCart }: SuperpowerItemProps) {
  const handleAddToCart = () => {
    if (!isInCart) {
      addToCart(power);
    }
  };

  return (
    <Card className="overflow-hidden bg-[#252525] text-white border border-[#3A3A3A] transition-all duration-300 ease-in-out transform hover:scale-105 animate-enter">
      <div className="relative">
        <Image 
          src={power.image} 
          alt={power.name} 
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
        <Badge variant="secondary" className="absolute top-2 right-2 bg-[#E62429] text-white">
          Power Level: {power.powerLevel}/10
        </Badge>
      </div>
      <CardHeader>
        <CardTitle className="text-white">{power.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p><span className="font-semibold text-gray-400">Element:</span> {power.element}</p>
          <p><span className="font-semibold text-gray-400">Duration:</span> {power.duration}</p>
          <p><span className="font-semibold text-gray-400">Energy Cost:</span> {power.energyCost} units/hour</p>
          <p className="text-2xl font-bold text-[#E62429]">${power.price.toFixed(2)}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleAddToCart}
          disabled={isInCart}
          className={`w-full ${
            isInCart
              ? 'bg-gray-600 text-white cursor-default'
              : 'bg-[#E62429] hover:bg-[#C41E23] text-white'
          }`}
        >
          {isInCart ? (
            <>
              <Check className="mr-2 h-4 w-4" /> Power Acquired
            </>
          ) : (
            <>
              <Zap className="mr-2 h-4 w-4" /> Acquire Power
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}