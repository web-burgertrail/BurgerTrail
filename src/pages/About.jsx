import { motion } from 'framer-motion';

// ── EDITABLE SECTION ──────────────────────────────────────────────────────────
// Replace image paths and text content below as needed.
// Images go in: /public/images/about/
const VALUES = [
  {
    image: '/images/about/bold-flavours.jpg',   // Replace with your image
    title: 'Bold Flavours',
    desc: 'Every recipe is crafted to deliver an unforgettable punch of flavour. No bland bites, no shortcuts — just fire on every plate.',
  },
  {
    image: '/images/about/fresh-ingredients.jpg', // Replace with your image
    title: 'Fresh Ingredients',
    desc: 'We source only the freshest produce and meats, prepped daily from scratch. Quality you can taste in every single bite.',
  },
  {
    image: '/images/about/open-late.jpg',         // Replace with your image
    title: 'Open Late',
    desc: "Because the best cravings hit after midnight. We're here from 3 PM to 3 AM, every single day — rain or shine.",
  },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function About() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <p className="text-orange-primary font-heading tracking-widest text-sm uppercase mb-3">Who We Are</p>
          <h1 className="font-display text-6xl sm:text-8xl tracking-widest text-white">OUR <span className="text-orange-primary">STORY</span></h1>
        </motion.div>

        {/* Story + Images */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="text-orange-primary font-heading tracking-widest text-sm uppercase mb-4">Est. Hyderabad</p>
            <h2 className="font-display text-4xl text-white mb-6 tracking-wider">WHERE THE TRAIL BEGAN</h2>
            <p className="text-white/50 font-body leading-relaxed mb-4">
              Burger Trails was born from a simple but powerful idea — that street-level passion and premium quality don't have to be mutually exclusive. Founded in the lively neighbourhood of Upperpally, Hyderabad, we started as a small corner kitchen with big dreams and even bigger flavours.
            </p>
            <p className="text-white/40 font-body leading-relaxed mb-4">
              Our founder, a self-taught chef with a deep love for bold flavours and late-night cravings, began crafting recipes that blended the classic comfort of a great burger with the bold spices of Hyderabad's rich culinary tradition.
            </p>
            <p className="text-white/40 font-body leading-relaxed">
              Today, Burger Trails is more than a restaurant — it's a destination. Open every evening from 3 PM to 3 AM, we serve the night owls, the foodies, the students, and everyone in between who believes that great food deserves no curfew.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="grid grid-cols-2 gap-3">
            {[
              { src: '/images/ambience/interior1.jpg', cls: 'col-span-2 aspect-video' },
              { src: '/images/ambience/exterior.jpg', cls: 'col-span-1 aspect-square' },
              { src: '/images/ambience/interior2.jpg', cls: 'col-span-1 aspect-square' },
            ].map(({ src, cls }, i) => (
              <div key={i} className={`${cls} rounded-2xl overflow-hidden bg-dark-700`}>
                <img src={src} alt={`Ambience ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  onError={e => { e.target.style.display = 'none'; }}/>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Values — with editable images */}
        <div className="grid sm:grid-cols-3 gap-6 mb-20">
          {VALUES.map(({ image, title, desc }, i) => (
            <motion.div key={title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl overflow-hidden hover:border-orange-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-orange-primary/10">
              {/* Image area */}
              <div className="aspect-video bg-dark-700 overflow-hidden">
                <img src={image} alt={title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  onError={e => { e.target.style.display = 'none'; }}/>
              </div>
              {/* Text */}
              <div className="p-6">
                <h3 className="font-heading font-semibold text-white text-lg mb-3">{title}</h3>
                <p className="text-white/40 font-body text-sm leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Ambience Gallery */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="font-display text-5xl tracking-widest text-white mb-3">OUR <span className="text-orange-primary">AMBIENCE</span></h2>
          <p className="text-white/40 font-body text-sm">Step inside the trail</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            '/images/ambience/interior1.jpg', '/images/ambience/interior2.jpg',
            '/images/ambience/exterior.jpg', '/images/menu/burgers/classic-chicken.jpg',
            '/images/menu/pizza/trails-special.jpg', '/images/menu/desserts/lava-cake.jpg',
          ].map((src, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              className="aspect-square rounded-2xl overflow-hidden group bg-dark-700">
              <img src={src} alt={`Ambience ${i + 1}`} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={e => { e.target.style.display = 'none'; }}/>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
