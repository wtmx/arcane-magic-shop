import CheckoutForm from '../../components/CheckoutForm';

export default function Checkout() {
  return (
    <main className="min-h-screen bg-[#1A1A1A] text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-[#E62429]">Checkout</h1>
        <div className="w-full max-w-2xl mx-auto">
          <CheckoutForm />
        </div>
      </div>
    </main>
  );
}