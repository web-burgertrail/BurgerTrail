import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [locError, setLocError] = useState(false);
  const [manualAddress, setManualAddress] = useState('');

  const handleOrder = () => {
    setLoading(true); setLocError(false);
    if (!navigator.geolocation) { setLoading(false); setLocError(true); return; }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const link = `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`;
        window.open(`https://wa.me/919281410305?text=${encodeURIComponent(`Hello Burger Trails! 👋\n\nI want to place an order.\n\n📍 My Location:\n${link}`)}`, '_blank');
        setLoading(false);
      },
      () => { setLoading(false); setLocError(true); },
      { timeout: 10000 }
    );
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <p className="text-orange-primary font-heading tracking-widest text-sm uppercase mb-3">Get In Touch</p>
          <h1 className="font-display text-6xl sm:text-8xl tracking-widest text-white">FIND <span className="text-orange-primary">US</span></h1>
          <p className="text-white/40 font-body mt-3 text-sm max-w-md mx-auto">We're open every evening. Come visit, or order straight on WhatsApp.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Left: Info */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-3">

            {/* Info cards — compact */}
            {[
              { icon: '📍', title: 'Our Location', lines: ['Upperpally, Hyderabad', 'Telangana — 500048'] },
              { icon: '🕐', title: 'Opening Hours', lines: ['Mon – Fri: 3 PM – 3 AM', 'Sat – Sun: 2 PM – 3 AM'] },
              { icon: '📞', title: 'WhatsApp', lines: ['+91 92814 10305'] },
            ].map(({ icon, title, lines }) => (
              <div key={title} className="glass rounded-xl px-4 py-3.5 flex gap-4 items-center hover:border-orange-primary/30 transition-all duration-300">
                <span className="text-xl flex-shrink-0">{icon}</span>
                <div>
                  <h3 className="font-heading font-semibold text-white text-sm">{title}</h3>
                  {lines.map((l, i) => <p key={i} className="text-white/50 font-body text-xs mt-0.5">{l}</p>)}
                </div>
              </div>
            ))}

            {/* Order Box */}
            <div className="glass-orange rounded-xl p-5">
              <h3 className="font-heading font-semibold text-white mb-1 text-sm">Place Your Order</h3>
              <p className="text-white/40 font-body text-xs mb-4">We'll get it ready before you arrive.</p>
              <motion.button
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={handleOrder} disabled={loading}
                className="w-full bg-orange-primary hover:bg-orange-light text-white py-3 rounded-full font-heading font-medium tracking-wide transition-all duration-300 glow-orange flex items-center justify-center gap-2 disabled:opacity-70 text-sm"
              >
                {loading ? (
                  <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Getting Location...</>
                ) : (
                  <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>Order Now</>
                )}
              </motion.button>

              {locError && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-3 space-y-2">
                  <p className="text-orange-primary text-xs font-body">Location denied. Type your address:</p>
                  <input type="text" value={manualAddress} onChange={e => setManualAddress(e.target.value)} placeholder="Area, landmark, street..." className="w-full bg-dark-700 border border-white/10 rounded-lg px-3 py-2 text-white text-xs font-body placeholder-white/30 focus:outline-none focus:border-orange-primary"/>
                  <button onClick={() => window.open(`https://wa.me/919281410305?text=${encodeURIComponent(`Hello Burger Trails! 👋\n\nI want to place an order.\n\n📍 My Address:\n${manualAddress || 'Not provided'}`)}`, '_blank')}
                    className="w-full glass py-2.5 rounded-full font-heading font-medium tracking-wide hover:border-green-500/40 hover:text-green-400 transition-all text-xs flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                    Send on WhatsApp
                  </button>
                </motion.div>
              )}
            </div>

            {/* Direct WhatsApp */}
            <a href="https://wa.me/919281410305" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-3 rounded-full font-heading font-medium tracking-wide text-sm transition-all duration-300 border border-green-500/30 text-green-400 hover:bg-green-500/10">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Chat on WhatsApp
            </a>
          </motion.div>

          {/* Right: Google Map */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-2xl overflow-hidden border border-white/10 min-h-[380px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3808.042!2d78.3892!3d17.3375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb96c0a21b6697%3A0xfbaadb4ebdf1c4de!2sUpperpally%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              className="w-full h-full min-h-[380px]"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              title="Burger Trails Location"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
