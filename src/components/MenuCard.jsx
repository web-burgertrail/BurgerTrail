import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const BADGE_COLORS = {
  'Bestseller': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  "Chef's Pick": 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'Hot 🔥': 'bg-red-500/20 text-red-400 border-red-500/30',
  'Veg': 'bg-green-500/20 text-green-400 border-green-500/30',
  'Signature': 'bg-orange-primary/20 text-orange-primary border-orange-primary/30',
  'Fan Fav': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  'Must Try': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Summer 🍉': 'bg-green-600/20 text-green-300 border-green-600/30',
};

export default function MenuCard({ item, compact = false }) {
  const { addItem, items } = useCart();
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const inCart = items.find(i => i.id === item.id);
  const badgeClass = BADGE_COLORS[item.badge] || 'bg-white/10 text-white/70 border-white/20';

  const handleAdd = () => {
    addItem(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (compact) {
    // Compact card for featured picks — smaller, no description
    return (
      <motion.div
        layout
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25 }}
        className="group glass rounded-xl overflow-hidden hover:border-orange-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-orange-primary/10 flex flex-col"
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-dark-600">
          {!imgError ? (
            <img src={item.image} alt={item.name} loading="lazy"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-dark-700">
              <span className="text-3xl sm:text-4xl">🍔</span>
            </div>
          )}
          {item.badge && (
            <span className={`absolute top-1.5 left-1.5 text-[9px] sm:text-xs font-heading px-1.5 py-0.5 rounded-full border ${badgeClass} leading-tight`}>
              {item.badge}
            </span>
          )}
          {inCart && (
            <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-orange-primary rounded-full flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">{inCart.quantity}</span>
            </div>
          )}
        </div>
        {/* Info */}
        <div className="p-2 sm:p-3 flex flex-col gap-2">
          <h3 className="font-heading font-semibold text-white text-xs sm:text-sm leading-tight line-clamp-2 group-hover:text-orange-primary transition-colors">
            {item.name}
          </h3>
          <div className="flex items-center justify-between gap-1">
            <span className="font-display text-base sm:text-lg text-orange-primary">₹{item.price}</span>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleAdd}
              className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] sm:text-xs font-heading font-medium transition-all duration-300 flex-shrink-0 ${
                added ? 'bg-green-500 text-white' : 'bg-orange-primary hover:bg-orange-light text-white'
              }`}
            >
              {added ? '✓' : '+'} {added ? 'Added' : 'Add'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Full card for menu page
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group glass rounded-2xl overflow-hidden hover:border-orange-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-orange-primary/10 flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-dark-600">
        {!imgError ? (
          <img src={item.image} alt={item.name} loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-dark-700">
            <span className="text-4xl">🍔</span>
            <p className="text-white/30 text-xs mt-1 font-body">Photo coming soon</p>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
        {item.badge && (
          <span className={`absolute top-2.5 left-2.5 text-xs font-heading px-2.5 py-1 rounded-full border ${badgeClass}`}>
            {item.badge}
          </span>
        )}
        {inCart && (
          <div className="absolute top-2.5 right-2.5 w-6 h-6 bg-orange-primary rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">{inCart.quantity}</span>
          </div>
        )}
      </div>
      {/* Content */}
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <h3 className="font-heading font-semibold text-white text-sm sm:text-base mb-1 line-clamp-1 group-hover:text-orange-primary transition-colors">
          {item.name}
        </h3>
        {item.description && (
          <p className="text-white/40 text-xs font-body leading-relaxed mb-3 line-clamp-2 flex-1">{item.description}</p>
        )}
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="font-display text-xl sm:text-2xl text-orange-primary">₹{item.price}</span>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleAdd}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-heading font-medium tracking-wide transition-all duration-300 flex-shrink-0 ${
              added ? 'bg-green-500 text-white' : 'bg-orange-primary hover:bg-orange-light text-white glow-orange-sm'
            }`}
          >
            {added ? (
              <><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>Added!</>
            ) : (
              <><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>Add</>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
