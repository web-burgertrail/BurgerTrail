import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import menuData from '../data/menu.json';
import MenuCard from '../components/MenuCard';
import { useCart } from '../context/CartContext';

const CATEGORIES = Object.keys(menuData);

const CATEGORY_META = {
  burgers:   { icon: '🍔', label: 'Burgers', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=80&q=60' },
  wraps:     { icon: '🌯', label: 'Wraps', img: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=80&q=60' },
  pizza:     { icon: '🍕', label: 'Pizza', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=80&q=60' },
  pasta:     { icon: '🍝', label: 'Pasta', img: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=80&q=60' },
  beverages: { icon: '🥤', label: 'Beverages', img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=80&q=60' },
  desserts:  { icon: '🍩', label: 'Desserts', img: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=80&q=60' },
};

function useIsMobile() {
  const [mobile, setMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  useEffect(() => {
    const h = () => setMobile(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return mobile;
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const isMobile = useIsMobile();
  const { count, openCart, total } = useCart();

  const allItems = Object.values(menuData).flat();
  const isSearching = search.trim().length > 0;
  const items = isSearching
    ? allItems.filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
    : (activeCategory === 'all' ? allItems : menuData[activeCategory] || []);

  const currentMeta = activeCategory === 'all'
    ? { icon: '🍽️', label: 'All Items' }
    : CATEGORY_META[activeCategory];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
      className="min-h-screen pt-14" style={{ paddingBottom: isMobile ? '5rem' : '2rem' }}>

      {/* Page header */}
      <div className="bg-dark-800/80 border-b border-white/5 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-orange-primary font-heading tracking-widest text-xs uppercase mb-0.5">What are you craving?</p>
          <h1 className="font-display text-3xl sm:text-5xl tracking-widest text-white">OUR <span className="text-orange-primary">MENU</span></h1>
        </div>
      </div>

      {/* Sticky search */}
      <div className="sticky top-14 z-30 bg-dark-900/97 backdrop-blur-xl border-b border-white/5 px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="max-w-7xl mx-auto">
          <div className="relative max-w-lg">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search for dishes..."
              className="w-full bg-dark-700 border border-white/10 rounded-full pl-9 pr-8 py-2.5 text-white text-sm font-body placeholder-white/30 focus:outline-none focus:border-orange-primary transition-colors"/>
            {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white text-sm">✕</button>}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex">

        {/* Desktop left sidebar */}
        {!isMobile && (
          <div className="w-52 flex-shrink-0 sticky top-28 self-start h-[calc(100vh-7rem)] overflow-y-auto border-r border-white/5 py-3 hidden md:block">
            {/* ALL filter */}
            <button
              onClick={() => { setActiveCategory('all'); setSearch(''); }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all ${
                activeCategory === 'all' && !isSearching
                  ? 'bg-orange-primary/10 border-r-2 border-orange-primary text-orange-primary'
                  : 'text-white/50 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="text-xl flex-shrink-0">🍽️</span>
              <span className="font-heading font-medium text-sm tracking-wide">All Items</span>
              <span className="ml-auto text-xs text-white/20">{allItems.length}</span>
            </button>

            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => { setActiveCategory(cat); setSearch(''); }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all ${
                  activeCategory === cat && !isSearching
                    ? 'bg-orange-primary/10 border-r-2 border-orange-primary text-orange-primary'
                    : 'text-white/50 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="w-7 h-7 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={CATEGORY_META[cat]?.img} alt={cat} className="w-full h-full object-cover"
                    onError={e => { e.target.parentElement.innerHTML = `<span class="text-xl flex items-center justify-center w-full h-full">${CATEGORY_META[cat]?.icon}</span>`; }}/>
                </div>
                <span className="font-heading font-medium text-sm tracking-wide">{CATEGORY_META[cat]?.label}</span>
                <span className="ml-auto text-xs text-white/20">{menuData[cat].length}</span>
              </button>
            ))}
          </div>
        )}

        {/* Mobile bottom tab bar for categories */}
        {isMobile && (
          <div className="fixed bottom-0 left-0 right-0 z-40 bg-dark-900/98 backdrop-blur-xl border-t border-white/8 overflow-x-auto scrollbar-hide">
            <div className="flex whitespace-nowrap py-1 px-1 gap-0.5">
              {/* All tab */}
              <button
                onClick={() => { setActiveCategory('all'); setSearch(''); }}
                className={`flex-shrink-0 flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg transition-all ${
                  activeCategory === 'all' && !isSearching ? 'text-orange-primary border-t-2 border-orange-primary bg-orange-primary/5' : 'text-white/40'
                }`}
              >
                <span className="text-base">🍽️</span>
                <span className="text-[9px] font-heading tracking-wide">All</span>
              </button>
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => { setActiveCategory(cat); setSearch(''); }}
                  className={`flex-shrink-0 flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg transition-all ${
                    activeCategory === cat && !isSearching ? 'text-orange-primary border-t-2 border-orange-primary bg-orange-primary/5' : 'text-white/40'
                  }`}
                >
                  <span className="text-base">{CATEGORY_META[cat]?.icon}</span>
                  <span className="text-[9px] font-heading tracking-wide capitalize">{cat === 'beverages' ? 'Drinks' : cat}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Items list */}
        <div className="flex-1 min-w-0" style={{ paddingBottom: isMobile ? '4rem' : '0' }}>
          {/* Section heading */}
          {!isSearching && (
            <div className="px-4 sm:px-6 py-3 border-b border-white/5 flex items-center gap-3">
              <span className="text-xl">{currentMeta?.icon}</span>
              <div>
                <h2 className="font-heading font-bold text-white text-base">{currentMeta?.label}</h2>
                <p className="text-white/30 text-xs font-body">{items.length} items</p>
              </div>
            </div>
          )}
          {isSearching && (
            <div className="px-4 sm:px-6 py-3 border-b border-white/5">
              <p className="text-white/40 text-sm font-body">
                {items.length} result{items.length !== 1 ? 's' : ''} for "<span className="text-orange-primary">{search}</span>"
              </p>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div key={activeCategory + search} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {items.length > 0 ? (
                <div>
                  {items.map(item => (
                    <div key={item.id} className="px-2 sm:px-4">
                      <MenuCard item={item} mobile={isMobile}/>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 px-4">
                  <span className="text-5xl">😕</span>
                  <p className="text-white/40 font-body mt-4 text-sm">No items found for "{search}"</p>
                  <button onClick={() => setSearch('')} className="mt-3 text-orange-primary text-sm font-heading hover:underline">Clear search</button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile floating cart bar */}
      {count > 0 && isMobile && (
        <motion.div initial={{ y: 80 }} animate={{ y: 0 }} className="fixed z-50" style={{ bottom: '4.5rem', left: '0.75rem', right: '0.75rem' }}>
          <button onClick={openCart} className="w-full bg-orange-primary text-white py-3 rounded-2xl flex items-center justify-between px-5 shadow-xl glow-orange">
            <span className="bg-white/20 rounded-lg px-2 py-0.5 text-xs font-heading font-bold">{count} items</span>
            <span className="font-heading font-bold tracking-wide text-sm">View Cart</span>
            <span className="font-heading font-bold text-sm">₹{total}</span>
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
