import { useState, useEffect } from 'react';
import { STORE_CONFIG } from '../config';
import { supabase } from '../lib/supabase';
import { CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';

export function OrderForm({ preselectedVariant }: { preselectedVariant?: string | null }) {
  const [formData, setFormData] = useState({
    customer_name: '', phone: '', email: '', city: '', address: '', landmark: '',
    country: STORE_CONFIG.DEFAULT_COUNTRY, product_variant: STORE_CONFIG.MENU[0].name || '',
    quantity: 1, notes: ''
  });
  
  useEffect(() => {
    if (preselectedVariant) {
      setFormData(prev => ({ ...prev, product_variant: preselectedVariant }));
    }
  }, [preselectedVariant]);
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedVariant = STORE_CONFIG.MENU.find(v => v.name === formData.product_variant) || STORE_CONFIG.MENU[0];
  const total = formData.quantity * selectedVariant.price;

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
        address: formData.landmark ? `${formData.address} (Landmark: ${formData.landmark})` : formData.address,
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
      <div className="bg-white rounded-3xl shadow-xl shadow-[#3d2314]/10 border border-[#e5d5c5] overflow-hidden flex flex-col md:flex-row">
        
        {/* Form Side */}
        <div className="p-8 border-b md:border-b-0 md:border-r border-[#e5d5c5] md:w-3/5 bg-white">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#3d2314]">Complete Your Order</h2>
            <p className="text-xs text-[#8b5a33] mt-1">No payment needed today. Pay at your door.</p>
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
                <label className="text-[10px] font-bold text-[#b08968] uppercase tracking-tighter block">Full Name *</label>
                <input 
                  type="text" 
                  value={formData.customer_name} 
                  onChange={e => setFormData({...formData, customer_name: e.target.value})} 
                  disabled={status === 'submitting' || status === 'success'}
                  className="w-full px-3 py-2 bg-[#faf5f0] border border-[#e5d5c5] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#b08968] transition-all text-[#3d2314]" 
                />
                {errors.customer_name && <p className="text-red-500 text-xs">{errors.customer_name}</p>}
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#b08968] uppercase tracking-tighter block">Phone Number *</label>
                <input 
                  type="tel" 
                  value={formData.phone} 
                  onChange={e => setFormData({...formData, phone: e.target.value})} 
                  disabled={status === 'submitting' || status === 'success'}
                  className="w-full px-3 py-2 bg-[#faf5f0] border border-[#e5d5c5] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#b08968] transition-all text-[#3d2314]" 
                />
                {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-[#b08968] uppercase tracking-tighter block">Email Address (Optional)</label>
              <input 
                type="email" 
                value={formData.email} 
                onChange={e => setFormData({...formData, email: e.target.value})} 
                disabled={status === 'submitting' || status === 'success'}
                className="w-full px-3 py-2 bg-[#faf5f0] border border-[#e5d5c5] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#b08968] transition-all text-[#3d2314]" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] font-bold text-[#b08968] uppercase tracking-tighter block">Street Address *</label>
                <input 
                  type="text" 
                  value={formData.address} 
                  onChange={e => setFormData({...formData, address: e.target.value})} 
                  disabled={status === 'submitting' || status === 'success'}
                  className="w-full px-3 py-2 bg-[#faf5f0] border border-[#e5d5c5] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#b08968] transition-all text-[#3d2314]" 
                />
                {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
              </div>
              <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] font-bold text-[#b08968] uppercase tracking-tighter block">Landmark (Optional)</label>
                <input 
                  type="text" 
                  value={formData.landmark} 
                  onChange={e => setFormData({...formData, landmark: e.target.value})} 
                  disabled={status === 'submitting' || status === 'success'}
                  className="w-full px-3 py-2 bg-[#faf5f0] border border-[#e5d5c5] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#b08968] transition-all text-[#3d2314]" 
                  placeholder="e.g. Near 7-Eleven, beside the blue gate"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#b08968] uppercase tracking-tighter block">City *</label>
                <input 
                  type="text" 
                  value={formData.city} 
                  onChange={e => setFormData({...formData, city: e.target.value})} 
                  disabled={status === 'submitting' || status === 'success'}
                  className="w-full px-3 py-2 bg-[#faf5f0] border border-[#e5d5c5] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#b08968] transition-all text-[#3d2314]" 
                />
                {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#b08968] uppercase tracking-tighter block">Country</label>
                <input 
                  type="text" 
                  value={formData.country} 
                  onChange={e => setFormData({...formData, country: e.target.value})} 
                  disabled={status === 'submitting' || status === 'success'}
                  className="w-full px-3 py-2 bg-[#faf5f0] border border-[#e5d5c5] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#b08968] transition-all text-[#3d2314]" 
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-[#b08968] uppercase tracking-tighter block">Order Notes (Optional)</label>
              <textarea 
                value={formData.notes} 
                onChange={e => setFormData({...formData, notes: e.target.value})} 
                disabled={status === 'submitting' || status === 'success'}
                rows={2} 
                className="w-full px-3 py-2 bg-[#faf5f0] border border-[#e5d5c5] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#b08968] transition-all text-[#3d2314]"
              ></textarea>
            </div>

            {status !== 'success' && (
              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="w-full mt-6 py-4 bg-[#3d2314] text-[#f5ebe1] rounded-xl font-bold text-sm hover:bg-[#2A1610] disabled:bg-[#a6978a] transition-all shadow-lg shadow-[#3d2314]/20 flex justify-center items-center gap-2"
              >
                {status === 'submitting' ? 'Processing...' : 'Confirm COD Order'}
              </button>
            )}
          </form>
        </div>

        {/* Summary Side */}
        <div className="bg-[#f5ebe1] p-8 border-t md:border-t-0 md:w-2/5">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#b08968] uppercase tracking-tighter block">Select Variant</label>
                <select 
                  value={formData.product_variant}
                  onChange={e => setFormData({...formData, product_variant: e.target.value})}
                  disabled={status === 'submitting' || status === 'success'}
                  className="w-full px-3 py-2 bg-[#faf5f0] border border-[#d9cbbd] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#4a3022] transition-all appearance-none text-[#3d2314]"
                >
                  {STORE_CONFIG.MENU.map(v => (
                    <option key={v.name} value={v.name}>{v.name} - {STORE_CONFIG.CURRENCY}{v.price}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#b08968] uppercase tracking-tighter block">Quantity</label>
                <div className="flex border border-[#d9cbbd] rounded-lg overflow-hidden h-[38px]">
                  <button 
                    type="button" 
                    onClick={() => setFormData(p => ({...p, quantity: Math.max(1, p.quantity - 1)}))}
                    disabled={status === 'submitting' || status === 'success'}
                    className="px-3 bg-[#faf5f0] hover:bg-white text-[#3d2314] disabled:opacity-50 border-r border-[#d9cbbd] transition-colors"
                  >
                    -
                  </button>
                  <span className="flex-1 flex items-center justify-center bg-white text-sm font-medium text-[#3d2314]">{formData.quantity}</span>
                  <button 
                    type="button" 
                    onClick={() => setFormData(p => ({...p, quantity: p.quantity + 1}))}
                    disabled={status === 'submitting' || status === 'success'}
                    className="px-3 bg-[#faf5f0] hover:bg-white text-[#3d2314] disabled:opacity-50 border-l border-[#d9cbbd] transition-colors"
                  >
                    +
                  </button>
                </div>
                {errors.quantity && <p className="text-red-500 text-xs">{errors.quantity}</p>}
              </div>
            </div>

            <div className="bg-[#3d2314] text-[#f5ebe1] p-4 rounded-xl shadow-md mt-6">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium text-[#d1b8a5]">Total Amount</span>
                <span className="text-lg font-serif font-black text-[#d69e6b] tracking-tighter">{STORE_CONFIG.CURRENCY} {total.toFixed(2)}</span>
              </div>
              <p className="text-[9px] text-white uppercase font-bold tracking-widest">Free Shipping Included</p>
            </div>

            <div className="mt-8 flex gap-3 p-4 bg-white/60 border border-[#e5d5c5] rounded-xl text-xs text-[#3d2314]">
              <ShieldCheck className="w-4 h-4 shrink-0 text-[#b08968]" />
              <p>You will only pay when your order is delivered to your address. No hidden fees.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
