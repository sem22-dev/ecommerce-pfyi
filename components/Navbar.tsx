
'use client';

import Link from 'next/link';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { RootState } from '@/redux/store';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const cartItems = useSelector((state: RootState) => state.cart);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    setItemCount(cartItems.reduce((total, item) => total + item.quantity, 0));
  }, [cartItems]);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          🛍️ E-Shop
        </Link>
        <Link href="/cart">
          <motion.div
            className="relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            🛒
            {itemCount > 0 && (
              <motion.span
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                {itemCount}
              </motion.span>
            )}
          </motion.div>
        </Link>
      </div>
    </nav>
  );
}