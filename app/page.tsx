import ProductList from "@/components/ProductList";
import Image from "next/image";

export default function Home() {
  return (
    <main className="container mx-auto px-4 pb-12">
      <h1 className="text-3xl font-bold my-8">Product Listing</h1>
      <ProductList />
    </main>
  );
}
