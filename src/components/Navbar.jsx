import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/menu', label: 'Menu' },
  { path: '/about', label: 'About' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, openCart } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-dark-900/96 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/30'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 lg:h-16">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-orange-primary/60 group-hover:border-orange-primary transition-colors flex items-center justify-center bg-dark-700">
                <img src="/images/logo/logo.png" alt="BT" className="w-full h-full object-cover"
                  onError={e => { e.target.parentElement.innerHTML = '<span class="text-orange-primary font-display text-sm font-bold">BT</span>'; }}/>
              </div>
              <div className="hidden sm:block">
                <span className="font-display text-xl tracking-widest text-white group-hover:text-orange-primary transition-colors">BURGER</span>
                <span className="font-display text-xl tracking-widest text-orange-primary ml-1">TRAILS</span>
              </div>
              <div className="sm:hidden">
                <span className="font-display text-lg tracking-widest text-white">BURGER </span>
                <span className="font-display text-lg tracking-widest text-orange-primary">TRAILS</span>
              </div>
            </Link>

            {/* Desktop Nav links */}
            <div className="hidden lg:flex items-center gap-7">
              {navLinks.map(({ path, label }) => (
                <Link key={path} to={path}
                  className={`font-heading font-medium text-xs tracking-widest uppercase transition-all duration-300 relative group ${
                    location.pathname === path ? 'text-orange-primary' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-orange-primary transition-all duration-300 ${location.pathname === path ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-2">

              {/* WhatsApp button — small, in header */}
              <a
                href="https://wa.me/919281410305"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300 hover:scale-105 flex-shrink-0"
                style={{ background: '#25D366' }}
                aria-label="WhatsApp"
                title="Chat on WhatsApp"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span className="text-white text-xs font-heading font-bold hidden sm:block tracking-wide">WA</span>
              </a>

              {/* Cart */}
              <button
                onClick={openCart}
                className="relative flex items-center gap-1.5 glass px-3 py-1.5 rounded-full hover:border-orange-primary/40 transition-all duration-300 group"
                aria-label="Open cart"
              >
                <svg className="w-4 h-4 text-white/80 group-hover:text-orange-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="font-body text-xs text-white/70 group-hover:text-white transition-colors hidden sm:block">Cart</span>
                {count > 0 && (
                  <motion.span key={count} initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-orange-primary rounded-full text-[10px] font-bold flex items-center justify-center text-white">
                    {count}
                  </motion.span>
                )}
              </button>

              {/* Order Now — desktop only */}
              <Link to="/order"
                className="hidden lg:flex items-center gap-1.5 bg-orange-primary hover:bg-orange-light text-white px-4 py-2 rounded-full font-heading font-medium text-xs tracking-wider uppercase transition-all duration-300 glow-orange-sm hover:scale-105">
                Order Now
              </Link>

              {/* Mobile hamburger */}
              <button onClick={() => setMenuOpen(v => !v)} className="lg:hidden flex flex-col gap-1 p-1.5" aria-label="Toggle menu">
                <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 lg:hidden">
            <div className="absolute inset-0 bg-dark-900/95 backdrop-blur-xl" onClick={() => setMenuOpen(false)} />
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-64 bg-dark-800 border-l border-white/5 p-6 flex flex-col"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className="flex justify-end mb-8">
                <button onClick={() => setMenuOpen(false)} className="text-white/50 hover:text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>
              <div className="flex flex-col gap-5">
                {navLinks.map(({ path, label }, i) => (
                  <motion.div key={path} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
                    <Link to={path} className={`font-display text-2xl tracking-widest transition-colors ${location.pathname === path ? 'text-orange-primary' : 'text-white/70 hover:text-white'}`}>
                      {label.toUpperCase()}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="mt-auto space-y-3">
                <Link to="/order" className="flex items-center justify-center gap-2 bg-orange-primary text-white px-5 py-2.5 rounded-full font-heading font-medium text-sm tracking-wider uppercase w-full glow-orange">
                  Order Now
                </Link>
                <a href="https://wa.me/919281410305" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-full font-heading font-medium text-sm tracking-wide w-full border border-green-500/40 text-green-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
