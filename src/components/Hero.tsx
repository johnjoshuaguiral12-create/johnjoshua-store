import { STORE_CONFIG } from '../config';
import { motion } from 'motion/react';
import { ShoppingBag } from 'lucide-react';

export function Hero() {
  return (
    <section className="pt-24 pb-16 px-10 text-center max-w-4xl mx-auto flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center"
      >
        <span className="inline-block px-3 py-1 bg-rose-100 text-rose-600 text-[10px] font-bold uppercase tracking-wider rounded-full mb-6">
          Cash on Delivery Available
        </span>
        <h1 className="text-6xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6">
          {STORE_CONFIG.PRODUCT_NAME}
        </h1>
        <p className="text-lg text-slate-600 max-w-xl mx-auto leading-relaxed mb-10">
          {STORE_CONFIG.PRODUCT_DESCRIPTION}
        </p>
        <a href="#order" className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white px-8 py-4 rounded-xl font-bold text-sm transition-all shadow-lg shadow-slate-200">
          <ShoppingBag className="w-4 h-4" />
          Order Now - Pay on Delivery
        </a>
      </motion.div>
    </section>
  );
}
