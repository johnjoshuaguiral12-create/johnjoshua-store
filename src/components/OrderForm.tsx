import { useState } from 'react';
import { STORE_CONFIG } from '../config';
import { supabase } from '../lib/supabase';
import { CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';

export function OrderForm() {
  const [formData, setFormData] = useState({
    customer_name: '', phone: '', email: '', city: '', address: '',
    country: STORE_CONFIG.DEFAULT_COUNTRY, product_variant: STORE_CONFIG.VARIANTS[0] || '',
    quantity: 1, notes: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const total = formData.quantity * STORE_CONFIG.PRICE_PER_UNIT;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.customer_name) newErrors.customer_name = "Name is required";
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (formData.quantity < 1) newErrors.quantity = "Must be at least 1";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    try {
      const { error } = await supabase.from('orders').insert([{
        customer_name: formData.customer_name,
        phone: formData.phone,
        email: formData.email,
        city: formData.city,
        address: formData.address,
        country: formData.country,
        product_name: STORE_CONFIG.PRODUCT_NAME,
        product_variant: formData.product_variant,
        quantity: formData.quantity,
        notes: formData.notes,
        status: 'pending'
      }]);

      if (error) throw error;
      setStatus('success');
    } catch (err) {
      console.error("Order insertion failed:", err);
      setStatus('error');
    }
  };

  return (
    <section id="order" className="py-12 px-10 max-w-5xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden flex flex-col md:flex-row">
        
        {/* Form Side */}
        <div className="p-8 border-b md:border-b-0 md:border-r border-slate-100 md:w-3/5">
          <div className="mb-6">
            <h2 className="text-xl font-bold">Complete Your Order</h2>
            <p className="text-xs text-slate-400 mt-1">No payment needed today. Pay at your door.</p>
          </div>
          
          {status === 'success' && (
            <div className="bg-green-50 text-green-800 p-4 rounded-xl flex items-start gap-3 mb-6 ring-1 ring-green-200 inset-ring">
              <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold">Order Placed Successfully!</p>
                <p className="text-sm mt-1">We've received your details and will process it shortly. You'll pay upon delivery.</p>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="bg-red-50 text-red-800 p-4 rounded-xl flex items-start gap-3 mb-6 ring-1 ring-red-200 inset-ring">
              <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold">Something went wrong.</p>
                <p className="text-sm mt-1">We couldn't process your order. Please check your connection or contact support.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter block">Full Name *</label>
                <input 
                  type="text" 
                  value={formData.customer_name} 
                  onChange={e => setFormData({...formData, customer_name: e.target.value})} 
                  disabled={status === 'submitting' || status === 'success'}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-slate-400 transition-all" 
                />
                {errors.customer_name && <p className="text-red-500 text-xs">{errors.customer_name}</p>}
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter block">Phone Number *</label>
                <input 
                  type="tel" 
                  value={formData.phone} 
                  onChange={e => setFormData({...formData, phone: e.target.value})} 
                  disabled={status === 'submitting' || status === 'success'}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-slate-400 transition-all" 
                />
                {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter block">Email Address (Optional)</label>
              <input 
                type="email" 
                value={formData.email} 
                onChange={e => setFormData({...formData, email: e.target.value})} 
                disabled={status === 'submitting' || status === 'success'}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-slate-400 transition-all" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter block">Street Address *</label>
                <input 
                  type="text" 
                  value={formData.address} 
                  onChange={e => setFormData({...formData, address: e.target.value})} 
                  disabled={status === 'submitting' || status === 'success'}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-slate-400 transition-all" 
                />
                {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter block">City *</label>
                <input 
                  type="text" 
                  value={formData.city} 
                  onChange={e => setFormData({...formData, city: e.target.value})} 
                  disabled={status === 'submitting' || status === 'success'}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-slate-400 transition-all" 
                />
                {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter block">Country</label>
                <input 
                  type="text" 
                  value={formData.country} 
                  onChange={e => setFormData({...formData, country: e.target.value})} 
                  disabled={status === 'submitting' || status === 'success'}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-slate-400 transition-all" 
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter block">Order Notes (Optional)</label>
              <textarea 
                value={formData.notes} 
                onChange={e => setFormData({...formData, notes: e.target.value})} 
                disabled={status === 'submitting' || status === 'success'}
                rows={2} 
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-slate-400 transition-all"
              ></textarea>
            </div>

            {status !== 'success' && (
              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="w-full mt-6 py-4 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-black disabled:bg-slate-400 transition-all shadow-lg shadow-slate-200 flex justify-center items-center gap-2"
              >
                {status === 'submitting' ? 'Processing...' : 'Confirm COD Order'}
              </button>
            )}
          </form>
        </div>

        {/* Summary Side */}
        <div className="bg-slate-50/30 p-8 border-t md:border-t-0 md:w-2/5">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter block">Select Variant</label>
                <select 
                  value={formData.product_variant}
                  onChange={e => setFormData({...formData, product_variant: e.target.value})}
                  disabled={status === 'submitting' || status === 'success'}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-slate-400 transition-all appearance-none"
                >
                  {STORE_CONFIG.VARIANTS.map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter block">Quantity</label>
                <div className="flex border border-slate-200 rounded-lg overflow-hidden h-[38px]">
                  <button 
                    type="button" 
                    onClick={() => setFormData(p => ({...p, quantity: Math.max(1, p.quantity - 1)}))}
                    disabled={status === 'submitting' || status === 'success'}
                    className="px-3 bg-slate-50 hover:bg-slate-100 text-slate-600 disabled:opacity-50 border-r border-slate-200 transition-colors"
                  >
                    -
                  </button>
                  <span className="flex-1 flex items-center justify-center bg-white text-sm font-medium text-slate-900">{formData.quantity}</span>
                  <button 
                    type="button" 
                    onClick={() => setFormData(p => ({...p, quantity: p.quantity + 1}))}
                    disabled={status === 'submitting' || status === 'success'}
                    className="px-3 bg-slate-50 hover:bg-slate-100 text-slate-600 disabled:opacity-50 border-l border-slate-200 transition-colors"
                  >
                    +
                  </button>
                </div>
                {errors.quantity && <p className="text-red-500 text-xs">{errors.quantity}</p>}
              </div>
            </div>

            <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100/50 mt-6">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium text-indigo-900">Total Amount</span>
                <span className="text-lg font-black text-indigo-900 tracking-tighter">{STORE_CONFIG.CURRENCY} {total.toFixed(2)}</span>
              </div>
              <p className="text-[9px] text-indigo-600 uppercase font-bold tracking-widest">Free Shipping Included</p>
            </div>

            <div className="mt-8 flex gap-3 p-4 bg-white/50 border border-slate-200 rounded-xl text-xs text-slate-600">
              <ShieldCheck className="w-4 h-4 shrink-0 text-slate-400" />
              <p>You will only pay when your order is delivered to your address. No hidden fees.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
