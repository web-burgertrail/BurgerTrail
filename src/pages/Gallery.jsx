import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import menuData from '../data/menu.json';

const FOOD_EMOJI = { burgers: '🍔', pizza: '🍕', wraps: '🌯', pasta: '🍝', beverages: '🥤', desserts: '🍩' };

const allImages = [
  ...menuData.burgers.map(i => ({ src: i.image, label: i.name, category: 'Food', emoji: '🍔' })),
  ...menuData.pizza.map(i => ({ src: i.image, label: i.name, category: 'Food', emoji: '🍕' })),
  ...menuData.wraps.map(i => ({ src: i.image, label: i.name, category: 'Food', emoji: '🌯' })),
  ...menuData.desserts.map(i => ({ src: i.image, label: i.name, category: 'Food', emoji: '🍩' })),
  ...menuData.pasta.map(i => ({ src: i.image, label: i.name, category: 'Food', emoji: '🍝' })),
  ...menuData.beverages.map(i => ({ src: i.image, label: i.name, category: 'Food', emoji: '🥤' })),
  { src: '/images/ambience/interior1.jpg', label: 'Our Interior', category: 'Ambience', emoji: '🏠' },
  { src: '/images/ambience/interior2.jpg', label: 'Dining Area', category: 'Ambience', emoji: '🏠' },
  { src: '/images/ambience/exterior.jpg', label: 'Exterior View', category: 'Ambience', emoji: '🌃' },
];

const FILTERS = ['All', 'Food', 'Ambience'];

function GalleryItem({ src, label, emoji, onClick }) {
  const [errored, setErrored] = useState(false);

  return (
    <div
      onClick={onClick}
      className="masonry-item group relative rounded-2xl overflow-hidden cursor-pointer bg-dark-700 hover:border hover:border-orange-primary/30 transition-all"
    >
      {!errored ? (
        <img
          src={src} alt={label} loading="lazy"
          className="w-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={() => setErrored(true)}
        />
      ) : (
        // Fallback placeholder when image is missing
        <div className="w-full flex flex-col items-center justify-center py-12 bg-dark-700">
          <span className="text-5xl mb-2">{emoji}</span>
          <p className="text-white/30 text-xs font-body text-center px-2">{label}</p>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <div>
          <p className="text-white font-heading font-medium text-sm">{label}</p>
          <p className="text-white/40 text-xs font-body">Click to expand</p>
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const filtered = active === 'All' ? allImages : allImages.filter(i => i.category === active);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <p className="text-orange-primary font-heading tracking-widest text-sm uppercase mb-3">Visual Feast</p>
          <h1 className="font-display text-6xl sm:text-8xl tracking-widest text-white">FOOD <span className="text-orange-primary">GALLERY</span></h1>
          <p className="text-white/40 font-body mt-3 text-sm max-w-md mx-auto">Every photo tells a flavour story. Click to explore.</p>
        </motion.div>

        {/* Filters */}
        <div className="flex justify-center gap-3 mb-10">
          {FILTERS.map(f => (
            <motion.button key={f} onClick={() => setActive(f)} whileTap={{ scale: 0.96 }}
              className={`relative px-6 py-2.5 rounded-full text-sm font-heading tracking-wider uppercase transition-all duration-300 ${active === f ? 'text-white' : 'glass text-white/50 hover:text-white'}`}>
              {active === f && <motion.span layoutId="gallery-filter" className="absolute inset-0 bg-orange-primary rounded-full" transition={{ type: 'spring', damping: 20, stiffness: 300 }}/>}
              <span className="relative z-10">{f}</span>
            </motion.button>
          ))}
        </div>

        {/* Masonry Grid */}
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="masonry-grid">
            {filtered.map((item, i) => (
              <motion.div key={item.src + i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: (i % 8) * 0.04 }}>
                <GalleryItem {...item} onClick={() => setLightbox(item)} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)} className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} transition={{ type: 'spring', damping: 20 }}
              className="relative max-w-2xl w-full" onClick={e => e.stopPropagation()}>
              <div className="rounded-2xl overflow-hidden bg-dark-700">
                <img src={lightbox.src} alt={lightbox.label} className="w-full object-contain max-h-[75vh]"
                  onError={e => { e.target.parentElement.innerHTML = `<div class="flex items-center justify-center h-64 text-7xl">${lightbox.emoji}</div>`; }}/>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-dark-900 to-transparent rounded-b-2xl">
                <p className="text-white font-heading font-medium">{lightbox.label}</p>
              </div>
              <button onClick={() => setLightbox(null)} className="absolute top-3 right-3 w-9 h-9 bg-dark-800/80 rounded-full flex items-center justify-center text-white/70 hover:text-white">✕</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
