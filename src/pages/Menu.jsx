import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import menuData from '../data/menu.json';
import MenuCard from '../components/MenuCard';
import CategoryTabs from '../components/CategoryTabs';

const CATEGORIES = ['all', ...Object.keys(menuData)];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');

  const allItems = Object.values(menuData).flat();
  const items = activeCategory === 'all' ? allItems : (menuData[activeCategory] || []);
  const filtered = search.trim()
    ? items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
    : items;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <p className="text-orange-primary font-heading font-medium tracking-widest text-sm uppercase mb-3">What are you craving?</p>
          <h1 className="font-display text-5xl sm:text-7xl tracking-widest text-white">OUR <span className="text-orange-primary">MENU</span></h1>
          <p className="text-white/40 font-body text-sm mt-3 max-w-md mx-auto">Crafted daily from fresh ingredients. Every item made with fire, love, and soul.</p>
        </motion.div>

        {/* Search */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="relative max-w-md mx-auto mb-6">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder={`Search ${activeCategory === 'all' ? 'all items' : activeCategory}...`}
            className="w-full bg-dark-700 border border-white/10 rounded-full pl-10 pr-10 py-3 text-white text-sm font-body placeholder-white/30 focus:outline-none focus:border-orange-primary transition-colors"
          />
          {search && <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">✕</button>}
        </motion.div>

        {/* Category Tabs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
          <CategoryTabs categories={CATEGORIES} active={activeCategory} onChange={(cat) => { setActiveCategory(cat); setSearch(''); }}/>
        </motion.div>

        {/* Count */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-white/30 text-sm font-body">
            {filtered.length} item{filtered.length !== 1 ? 's' : ''} {activeCategory !== 'all' && <><span className="text-orange-primary capitalize">{activeCategory}</span></>}
          </p>
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + search}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4"
          >
            {filtered.length > 0 ? (
              filtered.map((item) => <MenuCard key={item.id} item={item} />)
            ) : (
              <div className="col-span-full text-center py-20">
                <span className="text-6xl">😕</span>
                <p className="text-white/40 font-body mt-4">No items found for "{search}"</p>
                <button onClick={() => setSearch('')} className="mt-4 text-orange-primary text-sm font-heading tracking-wide hover:underline">Clear search</button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
