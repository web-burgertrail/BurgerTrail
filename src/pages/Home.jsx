import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import menuData from '../data/menu.json';
import { CompactCard } from '../components/MenuCard';
import InstaReels from '../components/InstaReels';

const HERO_SLIDES = [
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1600&q=80',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1600&q=80',
  'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=1600&q=80',
  'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=1600&q=80',
  'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=1600&q=80',
];

// Unsplash images for category icons
const QUICK_CATS = [
  { label: 'Burgers', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=70', path: '/menu' },
  { label: 'Pizza', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&q=70', path: '/menu' },
  { label: 'Wraps', img: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=200&q=70', path: '/menu' },
  { label: 'Pasta', img: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=200&q=70', path: '/menu' },
  { label: 'Drinks', img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=200&q=70', path: '/menu' },
  { label: 'Desserts', img: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=200&q=70', path: '/menu' },
];

function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-[#1a0800] to-dark-900"/>
      <AnimatePresence mode="sync">
        <motion.div key={current} initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5, ease: 'easeInOut' }} className="absolute inset-0">
          <img src={HERO_SLIDES[current]} alt="" className="w-full h-full object-cover" onError={e => { e.target.style.display = 'none'; }}/>
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/65 via-dark-900/40 to-dark-900"/>
      <div className="absolute inset-0 bg-gradient-to-r from-dark-900/55 to-transparent"/>
    </div>
  );
}

// Count up with scramble for "3AM"
function ScrambleCount({ finalValue, duration = 2200 }) {
  const [display, setDisplay] = useState('0');
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const nums = [1,2,3,4,5,6,7,8,9,10,11,12,1,2,11,3];
        let i = 0;
        const interval = setInterval(() => {
          if (i < nums.length - 1) {
            setDisplay(nums[i] + (nums[i] >= 10 ? 'AM' : ''));
            i++;
          } else {
            setDisplay('3AM');
            clearInterval(interval);
          }
        }, duration / nums.length);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [duration]);

  return <span ref={ref}>{display}</span>;
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

// Store open/closed status
function StoreStatusBanner() {
  const [status, setStatus] = useState({ isOpen: false, message: '' });

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const hour = now.getHours();
      const min = now.getMinutes();
      const totalMins = hour * 60 + min;

      // Open: 3 PM (15:00) to 3 AM (03:00 next day)
      // In minutes: 900 (3PM) to 1440+180 = beyond midnight
      const isOpen = totalMins >= 900 || totalMins < 180; // 3PM–midnight OR midnight–3AM

      let message = '';
      if (!isOpen) {
        // Calculate minutes until 3 PM
        const openAt = 900;
        const minsLeft = totalMins < 900 ? openAt - totalMins : (1440 - totalMins + openAt);
        const hrs = Math.floor(minsLeft / 60);
        const mins = minsLeft % 60;
        const timeStr = hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
        message = `Opens in ${timeStr} · We'll be ready at 3 PM 🔥`;
      }
      setStatus({ isOpen, message });
    };
    checkStatus();
    const t = setInterval(checkStatus, 60000);
    return () => clearInterval(t);
  }, []);

  if (status.isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-[60] bg-dark-800 border-b border-orange-primary/20 py-2 px-4 text-center"
    >
      <p className="text-white/60 text-xs font-body">
        <span className="text-orange-primary font-heading font-medium">🌙 We're resting up!</span>
        {' '}Sorry, we can't serve you right now.
        {status.message && <span className="ml-2 text-white/40">{status.message}</span>}
      </p>
    </motion.div>
  );
}

// All featured items
const ALL_FEATURED = [
  ...menuData.burgers,
  ...menuData.pizza,
  ...menuData.wraps.slice(0, 2),
  ...menuData.desserts.slice(0, 2),
  ...menuData.beverages.slice(0, 2),
].filter(Boolean);

export default function Home() {
  const navigate = useNavigate();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <StoreStatusBanner />

      {/* HERO */}
      <section className="relative min-h-screen flex items-end sm:items-center overflow-hidden">
        <HeroSlideshow />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16 sm:pb-12">
          {/* Mobile: bottom-left layout | Desktop: centered left */}
          <div className="max-w-lg">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              {/* BURGER white, TRAILS orange */}
              <h1 className="font-display leading-none tracking-widest" style={{ fontSize: 'clamp(2.6rem, 11vw, 7.5rem)' }}>
                <span className="text-white">BURGER </span>
                <span className="text-orange-primary">TRAILS</span>
              </h1>
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="text-white/60 text-sm sm:text-base font-body mt-4 mb-7 max-w-xs sm:max-w-sm leading-relaxed">
              Crafted with fire, served with soul. Pre-order on WhatsApp — ready when you arrive.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
              <button
                onClick={() => navigate('/menu')}
                className="flex items-center gap-2 bg-orange-primary hover:bg-orange-light text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-heading font-medium text-sm tracking-wider uppercase transition-all glow-orange hover:scale-105"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                </svg>
                ORDER NOW
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex gap-6 sm:gap-8 mt-8 sm:mt-10">
              <div>
                <p className="font-display text-xl sm:text-2xl text-orange-primary tracking-wider">
                  <CountUp end="50" suffix="+" duration={1500}/>
                </p>
                <p className="text-white/40 text-[10px] sm:text-xs font-body tracking-wide mt-0.5">Menu Items</p>
              </div>
              <div>
                <p className="font-display text-xl sm:text-2xl text-orange-primary tracking-wider">
                  <CountUp end="100000" suffix="+" duration={2500}/>
                </p>
                <p className="text-white/40 text-[10px] sm:text-xs font-body tracking-wide mt-0.5">Happy Foodies</p>
              </div>
              <div>
                <p className="font-display text-xl sm:text-2xl text-orange-primary tracking-wider">
                  <ScrambleCount finalValue="3AM" duration={2200}/>
                </p>
                <p className="text-white/40 text-[10px] sm:text-xs font-body tracking-wide mt-0.5">Open Till</p>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
          <div className="w-5 h-8 border-2 border-white/20 rounded-full flex items-start justify-center pt-1.5">
            <div className="w-1 h-1.5 bg-orange-primary rounded-full"/>
          </div>
        </motion.div>
      </section>

      {/* MARQUEE — 2x speed */}
      <div className="border-y border-orange-primary/20 bg-orange-primary/5 py-3 overflow-hidden">
        <div className="flex gap-10 whitespace-nowrap" style={{ animation: 'marqueeScroll 12s linear infinite' }}>
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="flex items-center gap-10 flex-shrink-0">
              <span className="font-display text-lg tracking-widest text-orange-primary">BITE THE BEST</span>
              <span className="text-orange-primary/40 text-sm">✦</span>
              <span className="font-display text-lg tracking-widest text-white/30">BURGER TRAILS</span>
              <span className="text-orange-primary/40 text-sm">✦</span>
              <span className="font-display text-lg tracking-widest text-orange-primary/60">OPEN TILL 3AM</span>
              <span className="text-orange-primary/40 text-sm">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* CATEGORY GRID — Unsplash images */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-6">
          <h2 className="font-display text-3xl sm:text-4xl tracking-wider text-white">ORDER BY <span className="text-orange-primary">CATEGORY</span></h2>
        </motion.div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
          {QUICK_CATS.map(({ label, img, path }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <Link to={path} className="flex flex-col items-center gap-2 group">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 border-white/5 group-hover:border-orange-primary/40 transition-all group-hover:scale-110 duration-300 shadow-lg">
                  <img src={img} alt={label} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={e => { e.target.parentElement.style.background = '#2E2E2E'; e.target.style.display = 'none'; }}/>
                </div>
                <span className="text-white/50 text-xs font-heading tracking-wide group-hover:text-orange-primary transition-colors">{label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED PICKS — horizontal scroll */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-end justify-between mb-5">
          <div>
            <p className="text-orange-primary font-heading font-medium tracking-widest text-xs uppercase mb-1">Must Try</p>
            <h2 className="font-display text-3xl sm:text-4xl tracking-wider text-white">FEATURED <span className="text-orange-primary">PICKS</span></h2>
          </div>
          <Link to="/menu" className="flex items-center gap-1 text-white/30 hover:text-orange-primary text-xs font-heading transition-colors">
            See all <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
          </Link>
        </motion.div>
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-3 pb-2" style={{ width: 'max-content' }}>
            {ALL_FEATURED.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                style={{ width: '155px', flexShrink: 0 }}>
                <CompactCard item={item}/>
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
                    <img src={src} alt="Burger Trails" loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"/>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-orange-primary font-heading font-medium tracking-widest text-sm uppercase mb-3">Our Story</p>
              <h2 className="font-display text-4xl sm:text-5xl tracking-wider text-white mb-5">MORE THAN JUST <span className="text-orange-primary">FOOD</span></h2>
              <p className="text-white/50 font-body text-sm leading-relaxed mb-4">Born in the lively streets of Upperpally, Hyderabad, Burger Trails is where passion meets the plate. Crafted from scratch — finest ingredients, bold spice blends.</p>
              <p className="text-white/40 font-body text-sm leading-relaxed mb-7">Open every evening from 3 PM till 3 AM. Pre-order online — hot and fresh when you walk in.</p>
              <Link to="/about" className="inline-flex items-center gap-2 text-orange-primary font-heading font-medium tracking-wider text-sm uppercase hover:gap-4 transition-all">
                Our Full Story <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative glass-orange rounded-3xl p-10 sm:p-12 text-center overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-primary to-transparent"/>
            <h2 className="font-display text-4xl sm:text-6xl tracking-widest text-white mb-3">
              HUNGRY? <span className="text-orange-primary">WE'RE OPEN.</span>
            </h2>
            <p className="text-white/50 font-body mb-7 max-w-md mx-auto text-sm">Pre-order via WhatsApp. Come pick it up — hot and ready.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/menu" className="bg-orange-primary hover:bg-orange-light text-white px-8 py-3.5 rounded-full font-heading font-medium tracking-wider uppercase transition-all glow-orange hover:scale-105 text-sm">Browse Menu</Link>
              <a href="https://wa.me/919281410305" target="_blank" rel="noopener noreferrer" className="glass px-8 py-3.5 rounded-full font-heading font-medium tracking-wider uppercase hover:border-green-500/40 hover:text-green-400 transition-all text-sm">WhatsApp Us</a>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </motion.div>
  );
}
