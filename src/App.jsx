import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect, Suspense } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Order from './pages/Order';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-orange-primary/30 border-t-orange-primary rounded-full animate-spin" />
        <p className="text-white/30 text-xs font-heading tracking-widest">LOADING...</p>
      </div>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/order" element={<Order />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="min-h-screen bg-dark-900 text-white relative overflow-x-hidden">
          <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-primary/5 blur-[120px] rounded-full" />
          </div>
          <ScrollToTop />
          <Navbar />
          <CartDrawer />
          <main className="relative z-10">
            <Suspense fallback={<PageLoader />}>
              <AnimatedRoutes />
            </Suspense>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}
