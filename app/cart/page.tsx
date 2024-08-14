
import CartContents from '@/components/CartContents';
import ClientOnly from '@/components/client-only';

export default function Cart() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-8">Shopping Cart</h1>
   <ClientOnly>
    <CartContents />
   </ClientOnly>
    </div>
  );
}