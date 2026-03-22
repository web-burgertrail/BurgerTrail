import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
  const { isOpen, closeCart, items, total, updateQty, removeItem, clearCart } = useCart();

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
            <div className="flex items-center justify-between p-5 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-primary/20 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-orange-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                </div>
                <h2 className="font-heading font-semibold text-white text-lg tracking-wide">Your Cart</h2>
                {items.length > 0 && (
                  <span className="bg-orange-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {items.reduce((s, i) => s + i.quantity, 0)}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                {items.length > 0 && <button onClick={clearCart} className="text-white/30 hover:text-red-400 text-xs font-body transition-colors">Clear all</button>}
                <button onClick={closeCart} className="w-8 h-8 glass rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              <AnimatePresence>
                {items.length === 0 ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-64 text-center">
                    <div className="w-20 h-20 bg-dark-700 rounded-full flex items-center justify-center mb-4"><span className="text-4xl">🛒</span></div>
                    <p className="text-white/40 font-body text-sm">Your cart is empty</p>
                    <p className="text-white/20 font-body text-xs mt-1">Add some delicious items!</p>
                    <button onClick={closeCart} className="mt-6 bg-orange-primary text-white px-6 py-2.5 rounded-full text-sm font-heading font-medium tracking-wide hover:bg-orange-light transition-colors">Browse Menu</button>
                  </motion.div>
                ) : (
                  items.map(item => (
                    <motion.div key={item.id} layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="glass rounded-xl p-3.5 flex gap-3">
                      <div className="w-14 h-14 rounded-lg overflow-hidden bg-dark-600 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" onError={e => { e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-2xl">🍔</div>'; }}/>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-heading font-medium text-white text-sm truncate">{item.name}</p>
                        <p className="text-orange-primary font-body text-xs mt-0.5">₹{item.price}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center gap-2 glass rounded-full px-2 py-1">
                            <button onClick={() => updateQty(item.id, item.quantity - 1)} className="w-5 h-5 flex items-center justify-center text-white/60 hover:text-orange-primary font-bold text-base leading-none">−</button>
                            <span className="text-white text-xs font-heading w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateQty(item.id, item.quantity + 1)} className="w-5 h-5 flex items-center justify-center text-white/60 hover:text-orange-primary font-bold text-base leading-none">+</button>
                          </div>
                          <span className="text-white/40 text-xs font-body">= ₹{item.price * item.quantity}</span>
                        </div>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-white/20 hover:text-red-400 transition-colors flex-shrink-0 self-start mt-0.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                      </button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-5 border-t border-white/5 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/50 font-body text-sm">Subtotal</span>
                  <span className="text-white font-body text-sm">₹{total}</span>
                </div>
                <div className="h-px bg-white/5"/>
                <div className="flex justify-between items-center">
                  <span className="text-white font-heading font-semibold text-lg">Total</span>
                  <span className="text-orange-primary font-display text-2xl">₹{total}</span>
                </div>
                <Link
                  to="/order" onClick={closeCart}
                  className="flex items-center justify-center gap-2 w-full bg-orange-primary hover:bg-orange-light text-white py-3.5 rounded-full font-heading font-medium tracking-wide transition-all duration-300 glow-orange hover:scale-105"
                >
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
