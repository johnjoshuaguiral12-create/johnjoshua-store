import { ShieldCheck, Truck, CreditCard, HelpCircle, Motorbike } from 'lucide-react';

export function Benefits() {
  const benefits = [
    { icon: <ShieldCheck className="w-6 h-6 text-[#7A8263]" />, title: "Premium Quality Beans", desc: "Crafted with the highest standards." },
    { icon: <Motorbike className="w-6 h-6 text-[#7A8263]" />, title: "Fast Shipping", desc: "Receive your order fresh in 30mins-1hr" },
    { icon: <CreditCard className="w-6 h-6 text-[#7A8263]" />, title: "Secure Payments", desc: "Safe & easy checkout on delivery." }
  ];

  return (
    <section className="py-10 px-10 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-3 gap-4">
        {benefits.map((b, i) => (
          <div key={i} className="p-4 bg-transparent border-none flex flex-col items-center text-center">
            <div className="w-10 h-10 flex items-center justify-center mb-3">
              {b.icon}
            </div>
            <h4 className="text-sm font-bold uppercase tracking-tight mb-1 text-[#3d2314]">{b.title}</h4>
            <p className="text-xs text-[#8b5a33] leading-tight">{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    { num: "1", title: "Place Order", desc: "Fill out the simple form below." },
    { num: "2", title: "We Ship", desc: "Your coffee is dispatched immediately." },
    { num: "3", title: "You Pay", desc: "Pay the courier upon receiving." }
  ];

  return (
    <section 
      id="how-it-works" 
      className="text-[#f5ebe1] p-8 max-w-5xl mx-auto md:mx-auto rounded-3xl relative overflow-hidden shadow-lg shadow-[#3d2314]/20"
      style={{
        backgroundImage: 'linear-gradient(rgba(61, 35, 20, 0.85), rgba(61, 35, 20, 0.95)), url("https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=2000&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex items-center gap-4 mb-8 relative z-10">
        <h3 className="text-sm font-bold uppercase tracking-widest text-[#d69e6b]">How COD Works</h3>
        <div className="h-[1px] flex-1 bg-[#5c634a]"></div>
      </div>
      <div className="grid md:grid-cols-3 gap-6 relative z-10">
        {steps.map((s, i) => (
          <div key={i} className="flex gap-4 items-start text-left">
            <span className="text-3xl font-serif italic text-[#d69e6b] leading-none">{`0${s.num}`}</span>
            <div>
              <h5 className="text-xs font-bold mb-1 text-white">{s.title}</h5>
              <p className="text-[11px] text-[#e0e3d5]">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FAQ() {
  const faqs = [
    { q: "Is cash on delivery available everywhere?", a: "Currently, COD is available in selected regions. Check the order form for details." },
    { q: "Can I open the package before paying?", a: "Courier policies vary, but generally payment is required before opening." },
    { q: "What if my coffee is damaged?", a: "Don't worry! We will offer a free replacement coffee if there is any damage to your order." }
  ];

  return (
    <section className="max-w-5xl mx-auto my-12 md:mx-auto mx-6 bg-[#3d2314] text-[#f5ebe1] rounded-3xl p-8">
      <h4 className="text-[10px] font-bold text-[#d69e6b] uppercase tracking-widest mb-6 text-center">Common Questions</h4>
      <div className="grid md:grid-cols-3 gap-6">
        {faqs.map((faq, i) => (
          <div key={i}>
            <h5 className="text-xs font-bold text-white mb-1">{faq.q}</h5>
            <p className="text-[11px] text-[#d1b8a5]">{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
