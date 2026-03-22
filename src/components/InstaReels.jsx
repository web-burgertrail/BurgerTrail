import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

// Add your reel videos in /public/images/insta/
// Poster images shown before video plays
const REELS = [
  { src: '/images/insta/reel1.mp4', poster: '/images/insta/poster1.jpg', label: 'Classic Smash' },
  { src: '/images/insta/reel2.mp4', poster: '/images/insta/poster2.jpg', label: 'Trails Special' },
  { src: '/images/insta/reel3.mp4', poster: '/images/insta/poster3.jpg', label: 'Lava Cake Drop' },
  { src: '/images/insta/reel4.mp4', poster: '/images/insta/poster4.jpg', label: 'Crispy Wings' },
  { src: '/images/insta/reel5.mp4', poster: '/images/insta/poster5.jpg', label: 'Pizza Night' },
  { src: '/images/insta/reel6.mp4', poster: '/images/insta/poster6.jpg', label: 'Dessert Drop' },
];

// Emoji fallbacks for when no video/poster is available
const FALLBACKS = ['🍔', '🍕', '🍩', '🌯', '🍝', '🥤'];

function ReelCard({ reel, index }) {
  const videoRef = useRef(null);

  const handleMouseEnter = () => { videoRef.current?.play().catch(() => {}); };
  const handleMouseLeave = () => { if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; } };

  // Auto-play on mobile via intersection observer
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) video.play().catch(() => {}); else { video.pause(); video.currentTime = 0; } },
      { threshold: 0.7 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex-shrink-0 w-36 sm:w-44 md:w-52"
      style={{ aspectRatio: '9/16' }}
    >
      <div className="w-full h-full rounded-2xl overflow-hidden glass group cursor-pointer hover:border-orange-primary/30 transition-all">
        {/* Video */}
        <video
          ref={videoRef}
          src={reel.src}
          muted loop playsInline preload="none"
          className="absolute inset-0 w-full h-full object-cover"
          onError={e => { e.target.style.display = 'none'; }}
        />
        {/* Poster fallback */}
        <img
          src={reel.poster}
          alt={reel.label}
          className="absolute inset-0 w-full h-full object-cover"
          onError={e => {
            e.target.style.display = 'none';
            const fb = e.target.parentElement.querySelector('.emoji-fallback');
            if (fb) fb.style.display = 'flex';
          }}
        />
        {/* Emoji fallback */}
        <div className="emoji-fallback absolute inset-0 bg-dark-700 items-center justify-center hidden flex-col">
          <span className="text-6xl">{FALLBACKS[index % FALLBACKS.length]}</span>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/20 to-transparent"/>

        {/* Play icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-60 group-hover:opacity-0 transition-opacity duration-300">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
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
          <p className="text-white font-heading text-xs sm:text-sm font-medium truncate">{reel.label}</p>
        </div>
      </div>
    </div>
  );
}

export default function InstaReels() {
  const trackRef = useRef(null);

  // Auto-scroll left animation using CSS, infinite loop
  return (
    <section className="py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-orange-primary font-heading font-medium tracking-widest text-sm uppercase mb-2">Follow the Trail</p>
            <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wider">INSTA <span className="text-orange-primary">REELS</span></h2>
          </div>
          <a href="https://www.instagram.com/burgertrails" target="_blank" rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 glass px-5 py-2.5 rounded-full text-sm text-white/60 hover:text-white hover:border-orange-primary/30 transition-all font-heading tracking-wide">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            Follow Us
          </a>
        </div>
      </div>

      {/* Infinite scrolling strip — duplicated for seamless loop */}
      <div className="relative overflow-hidden">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-dark-900 to-transparent z-10 pointer-events-none"/>
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-dark-900 to-transparent z-10 pointer-events-none"/>

        <div
          ref={trackRef}
          className="flex gap-4 pl-4"
          style={{
            animation: 'reelScroll 30s linear infinite',
            width: 'max-content',
          }}
        >
          {/* Original set */}
          {REELS.map((reel, i) => <ReelCard key={`a-${i}`} reel={reel} index={i}/>)}
          {/* Duplicate for seamless loop */}
          {REELS.map((reel, i) => <ReelCard key={`b-${i}`} reel={reel} index={i}/>)}
          {/* Third copy for very wide screens */}
          {REELS.map((reel, i) => <ReelCard key={`c-${i}`} reel={reel} index={i}/>)}
        </div>
      </div>

      <style>{`
        @keyframes reelScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
        .reel-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
