import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Add your reels to /public/images/insta/
// Poster images in /public/images/insta/poster1.jpg etc.
const REELS = [
  { src: '/images/insta/reel1.mp4', poster: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80', label: 'Classic Smash' },
  { src: '/images/insta/reel2.mp4', poster: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80', label: 'Trails Special' },
  { src: '/images/insta/reel3.mp4', poster: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80', label: 'Lava Cake Drop' },
  { src: '/images/insta/reel4.mp4', poster: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80', label: 'Pizza Night' },
  { src: '/images/insta/reel5.mp4', poster: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=400&q=80', label: 'Pasta Drop' },
  { src: '/images/insta/reel6.mp4', poster: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80', label: 'Shake Time' },
];

// Fullscreen modal video player — with sound
function VideoModal({ reel, onClose }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (v) { v.muted = false; v.play().catch(() => {}); }
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: 'spring', damping: 22, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
        className="relative max-h-[90vh] aspect-[9/16] w-full max-w-sm rounded-3xl overflow-hidden bg-dark-800 shadow-2xl"
      >
        {/* Video */}
        <video
          ref={videoRef}
          src={reel.src}
          poster={reel.poster}
          loop playsInline
          className="w-full h-full object-cover"
          onClick={togglePlay}
          onError={e => { e.target.style.display = 'none'; }}
        />

        {/* Fallback poster if video missing */}
        <img
          src={reel.poster}
          alt={reel.label}
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none"/>

        {/* Play/Pause big indicator */}
        <AnimatePresence>
          {!playing && (
            <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 bg-black/60 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top controls */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4">
          {/* Instagram badge */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-primary to-pink-600 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </div>
            <span className="text-white/80 text-xs font-body">@burgertrails</span>
          </div>
          {/* Close */}
          <button onClick={onClose} className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Bottom controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
          <div>
            <p className="text-white font-heading font-semibold text-base">{reel.label}</p>
            <p className="text-white/50 text-xs font-body mt-0.5">Burger Trails · Upperpally</p>
          </div>
          <div className="flex flex-col gap-3">
            {/* Mute toggle */}
            <button onClick={toggleMute} className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors">
              {muted ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15zM17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"/></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6v12m0 0a9 9 0 01-6.364-2.636M12 18a9 9 0 006.364-2.636M9 9.5l-.586.586A2 2 0 017 11.5v1a2 2 0 001.414 1.414L9 14.5"/></svg>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ReelCard({ reel, index }) {
  const videoRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Auto-play muted on scroll into view
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { video.play().catch(() => {}); }
        else { video.pause(); video.currentTime = 0; }
      },
      { threshold: 0.6 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        onClick={() => setModalOpen(true)}
        className="relative flex-shrink-0 cursor-pointer group"
        style={{ width: '9rem', aspectRatio: '9/16' }}
      >
        <div className="w-full h-full rounded-2xl overflow-hidden glass hover:border-orange-primary/40 transition-all">
          {/* Background poster */}
          <img src={reel.poster} alt={reel.label} className="absolute inset-0 w-full h-full object-cover"/>

          {/* Muted loop video */}
          <video
            ref={videoRef}
            src={reel.src}
            muted loop playsInline preload="none"
            className="absolute inset-0 w-full h-full object-cover"
            onError={e => { e.target.style.display = 'none'; }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/10 to-transparent"/>

          {/* Play icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 group-hover:bg-orange-primary/60 group-hover:border-orange-primary transition-all">
              <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>

          {/* Label */}
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-orange-primary to-pink-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </div>
              <span className="text-white/50 text-[10px] font-body">@burgertrails</span>
            </div>
            <p className="text-white font-heading text-xs font-medium truncate">{reel.label}</p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && <VideoModal reel={reel} onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

export default function InstaReels() {
  return (
    <section className="py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-orange-primary font-heading font-medium tracking-widest text-xs uppercase mb-1.5">Follow the Trail</p>
            <h2 className="font-display text-3xl sm:text-4xl text-white tracking-wider">INSTA <span className="text-orange-primary">REELS</span></h2>
          </div>
          <a href="https://www.instagram.com/burgertrails" target="_blank" rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 glass px-4 py-2 rounded-full text-xs text-white/50 hover:text-white hover:border-orange-primary/30 transition-all font-heading tracking-wide">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            Follow Us
          </a>
        </div>
      </div>

      {/* Infinite auto-scroll strip */}
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-dark-900 to-transparent z-10 pointer-events-none"/>
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-dark-900 to-transparent z-10 pointer-events-none"/>
        <div
          className="flex gap-3 pl-4"
          style={{ animation: 'reelScroll 28s linear infinite', width: 'max-content' }}
        >
          {[...REELS, ...REELS, ...REELS].map((reel, i) => (
            <ReelCard key={`reel-${i}`} reel={reel} index={i % REELS.length} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes reelScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
      `}</style>
    </section>
  );
}
