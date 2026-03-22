import { motion } from 'framer-motion';

const CATEGORY_ICONS = {
  all: '🍽️',
  burgers: '🍔',
  wraps: '🌯',
  pizza: '🍕',
  pasta: '🍝',
  beverages: '🥤',
  desserts: '🍩',
};

export default function CategoryTabs({ categories, active, onChange }) {
  return (
    <div className="relative">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory">
        {categories.map((cat) => {
          const isActive = active === cat;
          return (
            <motion.button
              key={cat}
              onClick={() => onChange(cat)}
              whileTap={{ scale: 0.96 }}
              className={`relative flex items-center gap-2 px-5 py-3 rounded-full text-sm font-heading font-medium tracking-wider uppercase whitespace-nowrap snap-start transition-all duration-300 flex-shrink-0 ${
                isActive
                  ? 'text-white glow-orange-sm'
                  : 'glass text-white/50 hover:text-white hover:border-white/20'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="tab-bg"
                  className="absolute inset-0 bg-orange-primary rounded-full"
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                />
              )}
              <span className="relative z-10 text-base">{CATEGORY_ICONS[cat] || '🍽️'}</span>
              <span className="relative z-10">{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
