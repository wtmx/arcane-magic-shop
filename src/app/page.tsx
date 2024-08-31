import SuperpowerList from '../components/SuperpowerList';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1A1A1A] text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold mb-8 text-center text-[#E62429]">Arcane Magic Shop</h1>
        <div className="w-full max-w-7xl mx-auto">
          <SuperpowerList />
        </div>
      </div>
    </main>
  );
}

// main page