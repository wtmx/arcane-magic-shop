'use client';

import { useState, useRef, useEffect } from 'react';
import SuperpowerItem from './SuperpowerItem';
import CartPanel from './CartPanel';
import { Button } from "@/components/ui/button"; // Import the Button component

export interface SuperpowerType {
  id: number;
  name: string;
  price: number;
  attribute: string;
  image: string;
  powerLevel: number;
  element: string;
  duration: string;
  energyCost: number;
}

const superpowers: SuperpowerType[] = [
  { id: 1, name: 'Flight', price: 1000, attribute: 'Mobility', image: '/processed-images/flight.jpg', powerLevel: 7, element: 'Air', duration: '1 hour', energyCost: 50 },
  { id: 2, name: 'Telekinesis', price: 1500, attribute: 'Mental', image: '/processed-images/telekinesis.jpg', powerLevel: 8, element: 'Psychic', duration: '30 minutes', energyCost: 75 },
  { id: 3, name: 'Super Strength', price: 2000, attribute: 'Physical', image: '/processed-images/super-strength.jpg', powerLevel: 9, element: 'Earth', duration: '2 hours', energyCost: 100 },
  { id: 4, name: 'Invisibility', price: 1200, attribute: 'Stealth', image: '/processed-images/invisibility.jpg', powerLevel: 6, element: 'Light', duration: '45 minutes', energyCost: 60 },
];

export default function SuperpowerList() {
  const maxPrice = 5000;
  const maxEnergyCost = 100;
  const maxDuration = 120; // 2 hours in minutes
  const [priceFilter, setPriceFilter] = useState<number>(maxPrice);
  const [energyCostFilter, setEnergyCostFilter] = useState<number>(maxEnergyCost);
  const [durationFilter, setDurationFilter] = useState<number>(maxDuration);
  const [elementFilters, setElementFilters] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cart, setCart] = useState<SuperpowerType[]>([]);

  useEffect(() => {
    // Clear the cart when the component mounts
    setCart([]);
  }, []);

  const elements = ['Air', 'Psychic', 'Earth', 'Light'];

  const filteredSuperpowers = superpowers.filter(
    (power) =>
      power.price <= priceFilter &&
      power.energyCost <= energyCostFilter &&
      parseInt(power.duration) <= durationFilter &&
      (elementFilters.length === 0 || elementFilters.includes(power.element))
  );

  const handleElementChange = (element: string) => {
    setElementFilters(prev =>
      prev.includes(element)
        ? prev.filter(e => e !== element)
        : [...prev, element]
    );
  };

  const addToCart = (power: SuperpowerType) => {
    setCart(prevCart => {
      if (!prevCart.some(item => item.id === power.id)) {
        console.log(`Added ${power.name} to cart`);
        return [...prevCart, power];
      }
      console.log(`${power.name} is already in the cart`);
      return prevCart;
    });
  };

  const removeFromCart = (powerId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== powerId));
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const resetFilters = () => {
    setPriceFilter(maxPrice);
    setEnergyCostFilter(maxEnergyCost);
    setDurationFilter(maxDuration);
    setElementFilters([]);
  };

  const handleCheckout = () => {
    localStorage.setItem('purchasedPowers', JSON.stringify(cart));
    window.location.href = '/confirmation';
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-3/4">
        <div className="bg-[#252525] p-6 rounded-lg shadow-lg mb-6">
          <div className="mb-4 space-y-4">
            <div className="flex flex-col">
              <label className="mb-2 text-white">Price: ${priceFilter}</label>
              <input
                type="range"
                min={0}
                max={maxPrice}
                value={priceFilter}
                onChange={(e) => setPriceFilter(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-white">Energy Cost: {energyCostFilter}</label>
              <input
                type="range"
                min={0}
                max={maxEnergyCost}
                value={energyCostFilter}
                onChange={(e) => setEnergyCostFilter(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-white">Duration: {formatDuration(durationFilter)}</label>
              <input
                type="range"
                min={0}
                max={maxDuration}
                value={durationFilter}
                onChange={(e) => setDurationFilter(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="relative inline-block text-left w-full" ref={dropdownRef}>
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-600 shadow-sm px-4 py-2 bg-[#1A1A1A] text-white text-sm font-medium hover:bg-[#252525] focus:outline-none"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                Elements
                <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-[#1A1A1A] ring-1 ring-[#3A3A3A] ring-opacity-5 z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    {elements.map((element) => (
                      <label key={element} className="flex items-center px-4 py-2 text-sm text-white hover:bg-[#252525] cursor-pointer" role="menuitem">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-[#E62429]"
                          checked={elementFilters.includes(element)}
                          onChange={() => handleElementChange(element)}
                        />
                        <span className="ml-2">{element}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Button 
              onClick={resetFilters}
              className="w-full bg-[#3A3A3A] hover:bg-[#4A4A4A] text-white"
            >
              Reset Filters
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSuperpowers.map((power) => (
            <SuperpowerItem 
              key={`${power.id}-${elementFilters.join('-')}-${priceFilter}-${energyCostFilter}-${durationFilter}`}
              power={power} 
              addToCart={addToCart} 
              isInCart={cart.some(item => item.id === power.id)}
            />
          ))}
        </div>
      </div>
      <CartPanel cart={cart} removeFromCart={removeFromCart} onCheckout={handleCheckout} />
    </div>
  );
}