import { STORE_CONFIG } from '../config';
import { motion } from 'motion/react';
import { ShoppingBag } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative pt-28 pb-32 px-10 text-center flex flex-col items-center bg-[#3d2314] text-[#f5ebe1] rounded-b-[4rem] md:rounded-b-[6rem]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center max-w-4xl mx-auto z-10"
      >
        <h2 className="text-sm md:text-base font-bold uppercase tracking-[0.2em] text-[#d69e6b] mb-4">
          Crafted for Moments.
        </h2>
        <h1 className="text-5xl md:text-7xl font-serif text-[#f5ebe1] leading-[1.1] mb-6">
          TARA TIMPLA COFFEE
        </h1>
        <p className="text-lg text-[#d1b8a5] max-w-xl mx-auto leading-relaxed mb-10">
          {STORE_CONFIG.PRODUCT_DESCRIPTION}
        </p>
        <a href="#menu" className="inline-flex items-center justify-center gap-2 bg-[#d69e6b] hover:bg-[#c28753] text-[#3d2314] px-8 py-4 rounded-full font-bold text-sm transition-all shadow-lg shadow-[#1a0f08]/50">
          Explore Menu →
        </a>
      </motion.div>
    </section>
  );
}
