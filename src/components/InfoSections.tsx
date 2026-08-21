import { ShieldCheck, Truck, CreditCard, HelpCircle } from 'lucide-react';

export function Benefits() {
  const benefits = [
    { icon: <ShieldCheck className="w-6 h-6 text-blue-500" />, title: "Premium Quality", desc: "Crafted with the highest standards." },
    { icon: <Truck className="w-6 h-6 text-blue-500" />, title: "Fast Shipping", desc: "Receive your order in 2-5 business days." },
    { icon: <CreditCard className="w-6 h-6 text-blue-500" />, title: "Pay on Delivery", desc: "No credit card needed online. Pay when it arrives." }
  ];

  const colors = ["bg-indigo-50", "bg-emerald-50", "bg-amber-50"];

  return (
    <section className="py-10 px-10 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-3 gap-4">
        {benefits.map((b, i) => (
          <div key={i} className="p-4 bg-white/60 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
            <div className={`w-10 h-10 ${colors[i % colors.length]} rounded-lg flex items-center justify-center mb-3`}>
              {b.icon}
            </div>
            <h4 className="text-xs font-bold uppercase tracking-tight mb-1">{b.title}</h4>
            <p className="text-[11px] text-slate-500 leading-tight">{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    { num: "1", title: "Place Order", desc: "Fill out the simple form below." },
    { num: "2", title: "We Ship", desc: "Your order is dispatched immediately." },
    { num: "3", title: "You Pay", desc: "Pay the courier upon receiving." }
  ];

  return (
    <section id="how-it-works" className="bg-slate-900 text-white p-8 rounded-2xl max-w-5xl mx-auto my-12 md:mx-auto mx-6">
      <div className="flex items-center gap-4 mb-8">
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">How COD Works</h3>
        <div className="h-[1px] flex-1 bg-slate-700"></div>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((s, i) => (
          <div key={i} className="flex gap-4 items-start text-left">
            <span className="text-3xl font-serif italic text-indigo-400 leading-none">{`0${s.num}`}</span>
            <div>
              <h5 className="text-xs font-bold mb-1">{s.title}</h5>
              <p className="text-[11px] text-slate-400">{s.desc}</p>
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
    { q: "What if I receive a damaged item?", a: "We offer a 7-day return policy for defective items. Contact support immediately." }
  ];

  return (
    <section className="max-w-5xl mx-auto my-12 md:mx-auto mx-6 bg-white/50 border border-slate-200 rounded-3xl p-8">
      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 text-center">Common Questions</h4>
      <div className="grid md:grid-cols-3 gap-6">
        {faqs.map((faq, i) => (
          <div key={i}>
            <h5 className="text-xs font-bold text-slate-800 mb-1">{faq.q}</h5>
            <p className="text-[11px] text-slate-500">{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
