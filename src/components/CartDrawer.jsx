import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import menuData from '../data/menu.json';

function SuggestedItem({ item, onAdd }) {
  const { items } = useCart();
  const inCart = items.find(i => i.id === item.id);
  const [imgErr, setImgErr] = useState(false);

  return (
    <div className="flex-shrink-0 w-32 glass rounded-xl overflow-hidden hover:border-orange-primary/30 transition-all cursor-pointer">
      <div className="w-full h-20 bg-dark-600 overflow-hidden">
        {!imgErr ? (
          <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform"
            onError={() => setImgErr(true)} />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl bg-dark-700">{item.fallback || '🍔'}</div>
        )}
      </div>
      <div className="p-2">
        <p className="font-heading text-white text-xs line-clamp-2 leading-tight mb-1.5">{item.name}</p>
        <div className="flex items-center justify-between">
          <span className="text-orange-primary font-display text-sm">₹{item.price}</span>
          {!inCart ? (
            <button onClick={() => onAdd(item)} className="bg-orange-primary text-white text-[10px] font-heading px-2 py-0.5 rounded-full">ADD</button>
          ) : (
            <span className="text-green-400 text-[10px] font-heading">✓ Added</span>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';

export default function CartDrawer() {
  const { isOpen, closeCart, items, total, updateQty, removeItem, clearCart, addItem } = useCart();

  // Get suggested items — from categories not yet in cart
  const cartCategoryIds = new Set(items.map(i => i.id));
  const allItems = Object.values(menuData).flat();
  const suggestions = allItems
    .filter(i => !cartCategoryIds.has(i.id))
    .slice(0, 6);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeCart} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"/>
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[400px] bg-dark-800 border-l border-white/5 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/5">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 bg-orange-primary/20 rounded-full flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-orange-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                </div>
                <h2 className="font-heading font-semibold text-white tracking-wide">Your Cart</h2>
                {items.length > 0 && (
                  <span className="bg-orange-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {items.reduce((s, i) => s + i.quantity, 0)}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                {items.length > 0 && <button onClick={clearCart} className="text-white/30 hover:text-red-400 text-xs font-body transition-colors">Clear all</button>}
                <button onClick={closeCart} className="w-7 h-7 glass rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <AnimatePresence>
                {items.length === 0 ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-48 text-center">
                    <span className="text-5xl mb-3">🛒</span>
                    <p className="text-white/40 font-body text-sm">Your cart is empty</p>
                    <button onClick={closeCart} className="mt-5 bg-orange-primary text-white px-5 py-2 rounded-full text-sm font-heading font-medium hover:bg-orange-light transition-colors">Browse Menu</button>
                  </motion.div>
                ) : (
                  items.map(item => (
                    <motion.div key={item.id} layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="glass rounded-xl p-3 flex gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-dark-600 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover"
                          onError={e => { e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-xl">${item.fallback || '🍔'}</div>`; }}/>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-heading font-medium text-white text-xs truncate">{item.name}</p>
                        <p className="text-orange-primary font-body text-xs mt-0.5">₹{item.price}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <div className="flex items-center gap-1.5 glass rounded-full px-2 py-1">
                            <button onClick={() => updateQty(item.id, item.quantity - 1)} className="w-4 h-4 flex items-center justify-center text-white/60 hover:text-orange-primary font-bold text-sm leading-none">−</button>
                            <span className="text-white text-xs font-heading w-3 text-center">{item.quantity}</span>
                            <button onClick={() => updateQty(item.id, item.quantity + 1)} className="w-4 h-4 flex items-center justify-center text-white/60 hover:text-orange-primary font-bold text-sm leading-none">+</button>
                          </div>
                          <span className="text-white/40 text-xs">₹{item.price * item.quantity}</span>
                        </div>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-white/20 hover:text-red-400 transition-colors self-start">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                      </button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>

              {/* Also Craving section */}
              {items.length > 0 && suggestions.length > 0 && (
                <div className="pt-3">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm">🔥</span>
                    <p className="text-orange-primary text-xs font-heading tracking-widest uppercase font-semibold">Also Craving?</p>
                  </div>
                  <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                    {suggestions.map(item => (
                      <SuggestedItem key={item.id} item={item} onAdd={addItem} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-4 border-t border-white/5 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/50 font-body text-xs">Subtotal</span>
                  <span className="text-white font-body text-sm">₹{total}</span>
                </div>
                <div className="h-px bg-white/5"/>
                <div className="flex justify-between items-center">
                  <span className="text-white font-heading font-semibold">Total</span>
                  <span className="text-orange-primary font-display text-2xl">₹{total}</span>
                </div>
                <Link to="/order" onClick={closeCart}
                  className="flex items-center justify-center gap-2 w-full bg-orange-primary hover:bg-orange-light text-white py-3 rounded-full font-heading font-medium tracking-wide transition-all glow-orange hover:scale-105 text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                  Order Now
                </Link>
                <p className="text-white/20 text-xs font-body text-center">Pre-order & pick up — ready when you arrive 🏍️</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
