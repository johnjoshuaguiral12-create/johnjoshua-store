import { STORE_CONFIG } from '../config';

export function CoffeeMenu({ onSelectVariant }: { onSelectVariant?: (name: string) => void }) {
  return (
    <section id="menu" className="py-16 px-10 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h3 className="text-sm font-bold uppercase tracking-widest text-[#8b5a33] mb-2">Signature Drinks</h3>
        <h2 className="text-3xl font-serif text-[#3d2314]">Handcrafted Blends, Made Just For You</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {STORE_CONFIG.MENU.map((item, index) => (
          <div key={index} className="bg-[#faf5f0] rounded-3xl p-4 shadow-sm border border-[#e5d5c5] flex flex-col cursor-pointer transition-transform hover:-translate-y-1 duration-300" onClick={() => onSelectVariant?.(item.name)}>
            <div className="w-full h-48 rounded-2xl overflow-hidden mb-4 bg-[#e5d5c5]">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" />
            </div>
            <div className="w-full px-2 flex flex-col flex-1">
              <h4 className="text-lg font-bold text-[#3d2314] mb-1">{item.name}</h4>
              <p className="text-xs text-[#8b5a33] mb-4">{item.type}</p>
              <div className="flex justify-between items-center mt-auto border-t border-[#e5d5c5]/50 pt-4">
                <span className="text-lg font-bold text-[#3d2314]">{STORE_CONFIG.CURRENCY}{item.price}</span>
                <a href="#order" onClick={(e) => { e.stopPropagation(); onSelectVariant?.(item.name); }} className="w-8 h-8 rounded-full bg-[#a57850] text-[#f5ebe1] flex items-center justify-center hover:bg-[#8b5a33] transition-colors shadow-md">
                  <span className="text-xl leading-none font-light -mt-1">+</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
