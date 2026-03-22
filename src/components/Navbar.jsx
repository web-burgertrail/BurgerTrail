import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

// Swiggy-style page tabs
const NAV_TABS = [
  {
    path: '/',
    label: 'Home',
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? 'text-orange-primary' : 'text-white/50'}`} fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
      </svg>
    ),
  },
  {
    path: '/menu',
    label: 'Menu',
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? 'text-orange-primary' : 'text-white/50'}`} fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
      </svg>
    ),
  },
  {
    path: '/gallery',
    label: 'Gallery',
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? 'text-orange-primary' : 'text-white/50'}`} fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
      </svg>
    ),
  },
  {
    path: '/about',
    label: 'About',
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? 'text-orange-primary' : 'text-white/50'}`} fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
  },
  {
    path: '/contact',
    label: 'Contact',
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? 'text-orange-primary' : 'text-white/50'}`} fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    ),
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { count, openCart } = useCart();
  const location = useLocation();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => setMobileMenuOpen(false), [location]);

  return (
    <>
      {/* ── TOP BAR ── */}
      <motion.header
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled ? 'bg-dark-900/97 backdrop-blur-xl border-b border-white/5 shadow-md shadow-black/20' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-13 sm:h-14" style={{ height: '3.25rem' }}>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border-2 border-orange-primary/60 flex items-center justify-center bg-dark-700 flex-shrink-0">
                <img src="/images/logo/logo.png" alt="BT"
                  className="w-full h-full object-cover"
                  onError={e => { e.target.parentElement.innerHTML = '<span class="text-orange-primary font-display text-xs font-bold">BT</span>'; }}
                />
              </div>
              <div className="leading-none">
                <span className="font-display tracking-widest text-white" style={{ fontSize: 'clamp(0.95rem, 3.5vw, 1.2rem)' }}>BURGER </span>
                <span className="font-display tracking-widest text-orange-primary" style={{ fontSize: 'clamp(0.95rem, 3.5vw, 1.2rem)' }}>TRAILS</span>
              </div>
            </Link>

            {/* Desktop — Swiggy-style tab bar in center */}
            <nav className="hidden lg:flex items-center gap-1 bg-dark-700/60 backdrop-blur-sm rounded-full px-2 py-1.5 border border-white/5">
              {NAV_TABS.map(({ path, label, icon }) => {
                const active = location.pathname === path;
                return (
                  <Link key={path} to={path}
                    className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-heading font-medium tracking-wide uppercase transition-all duration-300 ${
                      active ? 'text-white' : 'text-white/50 hover:text-white'
                    }`}
                  >
                    {active && (
                      <motion.span layoutId="nav-pill"
                        className="absolute inset-0 bg-orange-primary rounded-full"
                        transition={{ type: 'spring', damping: 22, stiffness: 350 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      {icon(active)}
                      {label}
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1.5 sm:gap-2">

              {/* WhatsApp — logo only, no text */}
              <a
                href="https://wa.me/919281410305"
                target="_blank"
                rel="noopener noreferrer"
                title="Chat on WhatsApp"
                aria-label="WhatsApp"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center hover:scale-110 transition-transform flex-shrink-0 shadow-md"
                style={{ background: '#25D366' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>

              {/* Cart */}
              <button onClick={openCart} aria-label="Cart"
                className="relative flex items-center gap-1 glass px-2.5 sm:px-3 py-1.5 rounded-full hover:border-orange-primary/40 transition-all group">
                <svg className="w-4 h-4 text-white/70 group-hover:text-orange-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                </svg>
                <span className="text-white/60 text-xs font-body hidden sm:block group-hover:text-white transition-colors">Cart</span>
                {count > 0 && (
                  <motion.span key={count} initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-orange-primary rounded-full text-[9px] font-bold flex items-center justify-center text-white">
                    {count}
                  </motion.span>
                )}
              </button>

              {/* Order Now — desktop */}
              <Link to="/order" className="hidden lg:flex items-center gap-1.5 bg-orange-primary hover:bg-orange-light text-white px-4 py-2 rounded-full font-heading font-medium text-xs tracking-wider uppercase transition-all glow-orange-sm hover:scale-105">
                Order Now
              </Link>

              {/* Mobile hamburger */}
              <button onClick={() => setMobileMenuOpen(v => !v)} className="lg:hidden p-1.5" aria-label="Menu">
                <div className="flex flex-col gap-1">
                  <span className={`block w-5 h-0.5 bg-white transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}/>
                  <span className={`block w-5 h-0.5 bg-white transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}/>
                  <span className={`block w-5 h-0.5 bg-white transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}/>
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ── MOBILE BOTTOM TAB BAR — Swiggy style ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-dark-900/98 backdrop-blur-xl border-t border-white/8 safe-bottom">
        <div className="flex items-center justify-around py-1.5 px-2">
          {NAV_TABS.map(({ path, label, icon }) => {
            const active = location.pathname === path;
            return (
              <Link key={path} to={path}
                className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition-all relative ${active ? '' : 'opacity-50 hover:opacity-80'}`}
              >
                {active && (
                  <motion.span layoutId="mobile-tab-bg"
                    className="absolute inset-0 bg-orange-primary/15 rounded-xl border border-orange-primary/30"
                    transition={{ type: 'spring', damping: 25, stiffness: 400 }}
                  />
                )}
                <span className="relative z-10">{icon(active)}</span>
                <span className={`relative z-10 text-[10px] font-heading font-medium tracking-wide ${active ? 'text-orange-primary' : 'text-white/40'}`}>
                  {label}
                </span>
              </Link>
            );
          })}
          {/* Order tab */}
          <Link to="/order"
            className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition-all relative ${location.pathname === '/order' ? '' : 'opacity-60'}`}>
            {location.pathname === '/order' && (
              <motion.span layoutId="mobile-tab-bg2"
                className="absolute inset-0 bg-orange-primary/15 rounded-xl border border-orange-primary/30"
                transition={{ type: 'spring', damping: 25, stiffness: 400 }}
              />
            )}
            <span className="relative z-10 w-5 h-5 bg-orange-primary rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
            </span>
            <span className={`relative z-10 text-[10px] font-heading font-medium tracking-wide ${location.pathname === '/order' ? 'text-orange-primary' : 'text-white/40'}`}>
              Order
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile slide menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 lg:hidden">
            <div className="absolute inset-0 bg-dark-900/95 backdrop-blur-xl" onClick={() => setMobileMenuOpen(false)}/>
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-60 bg-dark-800 border-l border-white/5 p-5 flex flex-col"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.25 }}
            >
              <div className="flex justify-end mb-6">
                <button onClick={() => setMobileMenuOpen(false)} className="text-white/40 hover:text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>
              <div className="flex flex-col gap-4">
                {NAV_TABS.map(({ path, label, icon }, i) => (
                  <motion.div key={path} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                    <Link to={path} className={`flex items-center gap-3 font-display text-xl tracking-widest transition-colors ${location.pathname === path ? 'text-orange-primary' : 'text-white/60 hover:text-white'}`}>
                      {icon(location.pathname === path)}
                      {label.toUpperCase()}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="mt-auto space-y-2">
                <Link to="/order" className="flex items-center justify-center gap-2 bg-orange-primary text-white px-5 py-2.5 rounded-full font-heading font-medium text-sm tracking-wide uppercase w-full">
                  Order Now
                </Link>
                <a href="https://wa.me/919281410305" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-full font-heading text-sm w-full border border-green-500/40 text-green-400">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
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
