import { STORE_CONFIG } from '../config';

export function Header() {
  return (
    <header 
      className="w-full text-[#f5ebe1] pt-6 pb-2 relative shadow-md"
      style={{
        backgroundImage: 'linear-gradient(rgba(61, 35, 20, 0.75), rgba(61, 35, 20, 0.95)), url("https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=2000&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-5xl mx-auto px-10 py-6 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="text-xl font-serif font-bold tracking-tight text-[#d69e6b] uppercase">{STORE_CONFIG.STORE_NAME}</div>
        </div>
        <nav className="flex gap-8 text-sm font-medium text-[#d1b8a5]">
          <a href="#how-it-works" className="hover:text-white transition-colors">How COD Works</a>
          <a href="#menu" className="hover:text-white transition-colors">Menu</a>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#3d2314] text-[#d1b8a5] border-t border-[#4a2c1f] py-12 mt-24">
      <div className="max-w-5xl mx-auto px-10 flex flex-col sm:flex-row justify-between items-center gap-4">
         <span className="text-xs font-medium">&copy; {new Date().getFullYear()} {STORE_CONFIG.STORE_NAME}. All rights reserved.</span>
         <div className="flex gap-2 items-center">
           <div className="w-2 h-2 rounded-full bg-[#d69e6b]"></div>
           <span className="text-[9px] text-[#d69e6b] font-bold uppercase tracking-widest">Designed with ♥ for coffee lovers.</span>
         </div>
      </div>
    </footer>
  );
}
