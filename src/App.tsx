/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Header, Footer } from './components/Layout';
import { Hero } from './components/Hero';
import { Benefits, HowItWorks, FAQ } from './components/InfoSections';
import { OrderForm } from './components/OrderForm';

export default function App() {
  return (
    <div 
      className="min-h-screen font-sans text-slate-900 selection:bg-indigo-200 overflow-x-hidden"
      style={{background: 'radial-gradient(at top left, #fff1f2, transparent), radial-gradient(at bottom right, #f0f9ff, transparent), #f8fafc'}}
    >
      <Header />
      <main>
        <Hero />
        <Benefits />
        <HowItWorks />
        <OrderForm />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
