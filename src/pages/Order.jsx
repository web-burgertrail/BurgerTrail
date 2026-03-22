import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Order() {
  const { items, total, updateQty, removeItem, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [locError, setLocError] = useState(false);
  const [manualAddress, setManualAddress] = useState('');
  const [ordered, setOrdered] = useState(false);

  const buildMessage = (locationLine = '') => {
    const lines = items.map(i => `  • ${i.quantity}x ${i.name}  —  ₹${i.price * i.quantity}`).join('\n');
    return `Hello Burger Trails! 👋\n\nI want to place an order:\n\n${lines}\n\n──────────────\nTotal: ₹${total}\n──────────────\n\n${locationLine}`;
  };

  const sendToWhatsApp = (message) => {
    window.open(`https://wa.me/919281410305?text=${encodeURIComponent(message)}`, '_blank');
    clearCart(); // ← cart cleared after order
    setOrdered(true);
  };

  const handleOrder = () => {
    if (!items.length) return;
    setLoading(true); setLocError(false);
    if (!navigator.geolocation) { setLoading(false); setLocError(true); return; }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const link = `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`;
        sendToWhatsApp(buildMessage(`📍 My Location:\n${link}`));
        setLoading(false);
      },
      () => { setLoading(false); setLocError(true); },
      { timeout: 10000 }
    );
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="min-h-screen pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <p className="text-orange-primary font-heading tracking-widest text-sm uppercase mb-3">Ready to Order?</p>
          <h1 className="font-display text-6xl sm:text-7xl tracking-widest text-white">YOUR <span className="text-orange-primary">CART</span></h1>
        </motion.div>

        {/* Empty */}
        {items.length === 0 && !ordered && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-24">
            <span className="text-8xl">🛒</span>
            <p className="text-white/40 font-body mt-6 text-lg">Your cart is empty</p>
            <p className="text-white/20 font-body text-sm mt-2 mb-8">Add some items from our menu!</p>
            <Link to="/menu" className="inline-flex items-center gap-2 bg-orange-primary hover:bg-orange-light text-white px-8 py-3.5 rounded-full font-heading font-medium tracking-wide transition-all glow-orange hover:scale-105">
              Browse Menu <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            </Link>
          </motion.div>
        )}

        {/* Order Sent */}
        {ordered && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
            <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-5xl">✅</span>
            </div>
            <h2 className="font-display text-4xl text-white tracking-wider mb-3">ORDER SENT!</h2>
            <p className="text-white/50 font-body text-sm mb-8">Your order has been sent to WhatsApp. We'll confirm shortly and have it ready for you!</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => setOrdered(false)} className="glass px-8 py-3.5 rounded-full font-heading font-medium tracking-wide text-sm hover:border-orange-primary/40 hover:text-orange-primary transition-all">New Order</button>
              <Link to="/menu" className="bg-orange-primary hover:bg-orange-light text-white px-8 py-3.5 rounded-full font-heading font-medium tracking-wide text-sm transition-all glow-orange hover:scale-105">Browse More</Link>
            </div>
          </motion.div>
        )}

        {/* Cart Items + Summary */}
        {items.length > 0 && !ordered && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-white/40 text-sm font-body">{items.reduce((s, i) => s + i.quantity, 0)} item(s) in cart</p>
                <button onClick={clearCart} className="text-white/30 hover:text-red-400 text-xs font-body transition-colors">Clear all</button>
              </div>
              <AnimatePresence>
                {items.map(item => (
                  <motion.div key={item.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 40 }} className="glass rounded-2xl p-4 flex gap-4 hover:border-orange-primary/20 transition-all">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-dark-600 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover"
                        onError={e => { e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-3xl">🍔</div>'; }}/>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-semibold text-white text-sm truncate">{item.name}</h3>
                      <p className="text-orange-primary font-body text-xs mt-0.5">₹{item.price} each</p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-2 glass rounded-full px-2.5 py-1">
                          <button onClick={() => updateQty(item.id, item.quantity - 1)} className="w-5 h-5 flex items-center justify-center text-white/60 hover:text-orange-primary font-bold text-base leading-none">−</button>
                          <span className="text-white font-heading text-xs w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQty(item.id, item.quantity + 1)} className="w-5 h-5 flex items-center justify-center text-white/60 hover:text-orange-primary font-bold text-base leading-none">+</button>
                        </div>
                        <span className="text-white/50 font-body text-xs">= ₹{item.price * item.quantity}</span>
                      </div>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-white/20 hover:text-red-400 transition-colors self-start flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary */}
            <div>
              <div className="glass-orange rounded-2xl p-6 sticky top-24 space-y-4">
                <h3 className="font-heading font-semibold text-white text-lg">Order Summary</h3>
                <div className="space-y-2">
                  {items.map(i => (
                    <div key={i.id} className="flex justify-between text-xs font-body">
                      <span className="text-white/50 truncate flex-1 pr-2">{i.quantity}× {i.name}</span>
                      <span className="text-white/70 flex-shrink-0">₹{i.price * i.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="h-px bg-white/10"/>
                <div className="flex justify-between items-center">
                  <span className="text-white font-heading font-semibold text-lg">Total</span>
                  <span className="text-orange-primary font-display text-3xl">₹{total}</span>
                </div>
                <p className="text-white/30 text-xs font-body">Pre-order & pick up when ready 🏍️</p>

                {/* Order Now Button */}
                <motion.button
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={handleOrder} disabled={loading}
                  className="w-full bg-orange-primary hover:bg-orange-light text-white py-4 rounded-full font-heading font-medium tracking-wide transition-all glow-orange flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading ? (
                    <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Getting Location...</>
                  ) : (
                    <><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>Order Now</>
                  )}
                </motion.button>

                {/* Manual fallback */}
                <AnimatePresence>
                  {locError && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-2 overflow-hidden">
                      <p className="text-orange-primary text-xs font-body">📍 Location denied. Enter your address:</p>
                      <input type="text" value={manualAddress} onChange={e => setManualAddress(e.target.value)} placeholder="Area, landmark, street..." className="w-full bg-dark-700 border border-white/10 rounded-lg px-3 py-2 text-white text-xs font-body placeholder-white/30 focus:outline-none focus:border-orange-primary"/>
                      <button onClick={() => sendToWhatsApp(buildMessage(`📍 My Address:\n${manualAddress || 'Not provided'}`))}
                        className="w-full glass py-3 rounded-full font-heading font-medium tracking-wide hover:border-green-500/40 hover:text-green-400 transition-all text-xs flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                        Send on WhatsApp
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
