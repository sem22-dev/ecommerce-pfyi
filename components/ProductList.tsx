
'use client';

import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import { addToCart } from '@/redux/cartSlice';
import Image from 'next/image';

export default function ProductList() {
  const dispatch = useDispatch();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <motion.div
          key={product.id}
          className="border rounded-lg p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          <Image src={product.image} width={100} height={100} alt={product.name} className="w-full h-64 object-contain mb-4" />
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p className="text-gray-600">${product.price.toFixed(2)}</p>
          <motion.button 
            onClick={() => dispatch(addToCart(product))}
            className="mt-4 bg-[#FF9F00] text-white px-4 py-2 rounded hover:bg-[#f19502]"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Add to Cart
          </motion.button>
        </motion.div>
      ))}
    </div>
  );
}