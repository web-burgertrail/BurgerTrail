import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import menuData from '../data/menu.json';
import { CompactCard } from '../components/MenuCard';
import InstaReels from '../components/InstaReels';

const HERO_SLIDES = [
  { url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1600&q=80', label: 'Classic Smash Burger' },
  { url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1600&q=80', label: 'Trails Special Pizza' },
  { url: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=1600&q=80', label: 'Chicken Alfredo' },
  { url: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=1600&q=80', label: 'Molten Lava Cake' },
  { url: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=1600&q=80', label: 'Double Smash Burger' },
];

function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-[#1a0800] to-dark-900" />
      <AnimatePresence mode="sync">
        <motion.div key={current} initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5, ease: 'easeInOut' }} className="absolute inset-0">
          <img src={HERO_SLIDES[current].url} alt="" className="w-full h-full object-cover" onError={e => { e.target.style.display = 'none'; }}/>
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/70 via-dark-900/45 to-dark-900" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark-900/50 to-transparent" />
    </div>
  );
}

function CountUp({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const endNum = parseInt(end);
        const startTime = performance.now();
        const step = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * endNum));
          if (progress < 1) requestAnimationFrame(step); else setCount(endNum);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ORDER NOW → goes to menu page
function HeroButtons() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
      <motion.button
        whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
        onClick={() => navigate('/menu')}
        className="flex items-center justify-center gap-2 bg-orange-primary hover:bg-orange-light text-white px-6 py-3 rounded-full font-heading font-medium text-sm tracking-wider uppercase transition-all glow-orange"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
        </svg>
        ORDER NOW
      </motion.button>
    </div>
  );
}

// All menu items for featured scroll
const ALL_FEATURED = [
  ...menuData.burgers,
  ...menuData.pizza.slice(0, 2),
  ...menuData.wraps.slice(0, 2),
  ...menuData.desserts.slice(0, 2),
  ...menuData.beverages.slice(1, 3),
].filter(Boolean);

const QUICK_CATS = [
  { label: 'Burgers', icon: '🍔', bg: 'from-orange-primary/30 to-dark-700' },
  { label: 'Pizza', icon: '🍕', bg: 'from-red-600/30 to-dark-700' },
  { label: 'Wraps', icon: '🌯', bg: 'from-yellow-600/30 to-dark-700' },
  { label: 'Pasta', icon: '🍝', bg: 'from-amber-700/30 to-dark-700' },
  { label: 'Drinks', icon: '🥤', bg: 'from-blue-600/30 to-dark-700' },
  { label: 'Desserts', icon: '🍩', bg: 'from-purple-600/30 to-dark-700' },
];

export default function Home() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <HeroSlideshow />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="max-w-xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <h1 className="font-display leading-none tracking-widest text-white" style={{ fontSize: 'clamp(2.8rem, 12vw, 8rem)' }}>
                BURGER TRAILS
              </h1>
            </motion.div>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="text-white/60 text-sm sm:text-base font-body mt-4 mb-7 max-w-sm leading-relaxed">
              Crafted with fire, served with soul. Pre-order on WhatsApp — ready when you arrive.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
              <HeroButtons />
            </motion.div>

            {/* Stats with counting animation */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }} className="flex gap-8 mt-10">
              {[
                { number: '50', suffix: '+', label: 'Menu Items' },
                { number: '10000', suffix: '+', label: 'Happy Foodies' },
                { number: '3', suffix: 'AM', label: 'Open Till' },
              ].map(({ number, suffix, label }) => (
                <div key={label}>
                  <p className="font-display text-2xl sm:text-3xl text-orange-primary tracking-wider">
                    <CountUp end={number} suffix={suffix} duration={number === '10000' ? 2500 : 1800} />
                  </p>
                  <p className="text-white/40 text-xs font-body tracking-wide mt-0.5">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
          <div className="w-5 h-9 border-2 border-white/20 rounded-full flex items-start justify-center pt-1.5"><div className="w-1 h-1.5 bg-orange-primary rounded-full"/></div>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <div className="border-y border-orange-primary/20 bg-orange-primary/5 py-3 overflow-hidden">
        <div className="flex gap-12 animate-scroll-x whitespace-nowrap">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="flex items-center gap-12 flex-shrink-0">
              <span className="font-display text-xl tracking-widest text-orange-primary">BITE THE BEST</span>
              <span className="text-orange-primary/40">✦</span>
              <span className="font-display text-xl tracking-widest text-white/30">BURGER TRAILS</span>
              <span className="text-orange-primary/40">✦</span>
              <span className="font-display text-xl tracking-widest text-orange-primary/60">OPEN TILL 3AM</span>
              <span className="text-orange-primary/40">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* QUICK CATEGORIES */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-6">
          <h2 className="font-display text-3xl sm:text-4xl tracking-wider text-white">ORDER BY <span className="text-orange-primary">CATEGORY</span></h2>
        </motion.div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
          {QUICK_CATS.map(({ label, icon, bg }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <Link to="/menu" className="flex flex-col items-center gap-2 group">
                <div className={`w-14 h-14 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br ${bg} flex items-center justify-center text-2xl sm:text-3xl group-hover:scale-110 transition-transform duration-300 border border-white/5`} style={{ width: '3.75rem', height: '3.75rem' }}>
                  {icon}
                </div>
                <span className="text-white/50 text-xs font-heading tracking-wide group-hover:text-orange-primary transition-colors">{label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED PICKS — horizontal scroll */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-end justify-between mb-6">
          <div>
            <p className="text-orange-primary font-heading font-medium tracking-widest text-xs uppercase mb-1">Must Try</p>
            <h2 className="font-display text-3xl sm:text-4xl tracking-wider text-white">FEATURED <span className="text-orange-primary">PICKS</span></h2>
          </div>
          <Link to="/menu" className="flex items-center gap-1 text-white/40 hover:text-orange-primary text-xs font-heading tracking-wide transition-colors">
            See all <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
          </Link>
        </motion.div>

        {/* Horizontally scrollable row */}
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-3 pb-2" style={{ width: 'max-content' }}>
            {ALL_FEATURED.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                style={{ width: '160px', flexShrink: 0 }}
              >
                <CompactCard item={item} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTA REELS */}
      <InstaReels />

      {/* ABOUT SNIPPET */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <div className="absolute inset-0 bg-orange-primary/10 blur-3xl rounded-3xl"/>
              <div className="relative grid grid-cols-2 gap-3">
                {[
                  { src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80', cls: 'col-span-2 aspect-video' },
                  { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80', cls: 'col-span-1 aspect-square' },
                  { src: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400&q=80', cls: 'col-span-1 aspect-square' },
                ].map(({ src, cls }, i) => (
                  <div key={i} className={`${cls} rounded-2xl overflow-hidden`}>
                    <img src={src} alt="Burger Trails" loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" onError={e => { e.target.parentElement.style.background = '#1A1A1A'; e.target.style.display = 'none'; }}/>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-orange-primary font-heading font-medium tracking-widest text-sm uppercase mb-3">Our Story</p>
              <h2 className="font-display text-4xl sm:text-5xl tracking-wider text-white mb-5">MORE THAN JUST <span className="text-orange-primary">FOOD</span></h2>
              <p className="text-white/50 font-body leading-relaxed mb-4 text-sm">Born in the lively streets of Upperpally, Hyderabad, Burger Trails is where passion meets the plate. Crafted from scratch — finest ingredients, bold spice blends.</p>
              <p className="text-white/40 font-body text-sm leading-relaxed mb-7">Open every evening from 3 PM till 3 AM. Order online, come pick it up — hot and fresh when you walk in.</p>
              <Link to="/about" className="inline-flex items-center gap-2 text-orange-primary font-heading font-medium tracking-wider text-sm uppercase hover:gap-4 transition-all">
                Our Full Story <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative glass-orange rounded-3xl p-10 sm:p-12 text-center overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-primary to-transparent"/>
            <h2 className="font-display text-4xl sm:text-6xl tracking-widest text-white mb-3">HUNGRY? <span className="text-orange-primary">WE'RE OPEN.</span></h2>
            <p className="text-white/50 font-body mb-7 max-w-md mx-auto text-sm">Pre-order via WhatsApp. Pick it up — ready when you arrive.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/menu" className="bg-orange-primary hover:bg-orange-light text-white px-8 py-3.5 rounded-full font-heading font-medium tracking-wider uppercase transition-all glow-orange hover:scale-105 text-sm">Browse Menu</Link>
              <a href="https://wa.me/919281410305" target="_blank" rel="noopener noreferrer" className="glass px-8 py-3.5 rounded-full font-heading font-medium tracking-wider uppercase hover:border-green-500/40 hover:text-green-400 transition-all text-sm">WhatsApp Us</a>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
