import { STORE_CONFIG } from '../config';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/40 backdrop-blur-sm border-b border-slate-200/50">
      <div className="max-w-5xl mx-auto px-10 py-6 flex items-center justify-between">
        <div className="text-xl font-bold tracking-tight text-slate-800 uppercase">{STORE_CONFIG.STORE_NAME}</div>
        <nav className="flex gap-8 text-sm font-medium text-slate-600">
          <a href="#how-it-works" className="hover:text-black transition-colors">How COD Works</a>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-white/50 border-t border-slate-200/50 py-12 mt-24">
      <div className="max-w-5xl mx-auto px-10 flex flex-col sm:flex-row justify-between items-center gap-4">
         <span className="text-xs text-slate-400 font-medium">&copy; {new Date().getFullYear()} {STORE_CONFIG.STORE_NAME}. All rights reserved.</span>
         <div className="flex gap-2 items-center">
           <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
           <span className="text-[9px] text-emerald-600 font-bold uppercase tracking-widest">Online Now</span>
         </div>
      </div>
    </footer>
  );
}
