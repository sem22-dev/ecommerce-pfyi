
'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { removeFromCart, updateQuantity } from '@/redux/cartSlice';
import { RootState } from '@/redux/store';
import Link from 'next/link';
import Image from 'next/image';

export default function CartContents() {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const [discountEnabled, setDiscountEnabled] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = discountEnabled ? subtotal * 0.1 : 0; // 10% discount
  const total = subtotal - discount;

  const handleCheckout = () => {
    alert('Checkout successful!');
  };

  return (
    <>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <motion.div
              key={item.id}
              className="flex items-center border-b py-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Image width={100} height={100} src={item.image} alt={item.name} className="w-24 h-24 object-contain mr-4" />
              <div className="flex-grow">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
                <div className="flex items-center mt-2">
                  <motion.button
                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                    className="bg-gray-200 px-2 py-1 rounded"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    -
                  </motion.button>
                  <span className="mx-2">{item.quantity}</span>
                  <motion.button
                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                    className="bg-gray-200 px-2 py-1 rounded"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    +
                  </motion.button>
                </div>
              </div>
              <motion.button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-black px-4 py-2 rounded hover:text-red-500"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                REMOVE
              </motion.button>
            </motion.div>
          ))}

          <div className="mt-8">
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="discountCheckbox"
                checked={discountEnabled}
                onChange={() => setDiscountEnabled(!discountEnabled)}
                className="mr-2"
              />
              <label htmlFor="discountCheckbox" className="text-sm">
                Apply 10% Discount
              </label>
            </div>
            <p className="text-sm">Subtotal: ${subtotal.toFixed(2)}</p>
            {discountEnabled && (
              <p className="text-sm text-green-500">Discount: -${discount.toFixed(2)}</p>
            )}
            <p className="text-xl font-semibold mt-2">Total: ${total.toFixed(2)}</p>
            <motion.button
              onClick={handleCheckout}
              className="mt-4 bg-[#FB641B] text-lg font text-white px-8 py-4 rounded"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              CHECKOUT
            </motion.button>
          </div>
        </>
      )}
      <Link href="/" className="mt-8 inline-block text-blue-500 hover:underline">
        Continue Shopping
      </Link>
    </>
  );
}
