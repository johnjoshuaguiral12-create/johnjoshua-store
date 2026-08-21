/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Header, Footer } from './components/Layout';
import { Hero } from './components/Hero';
import { Benefits, HowItWorks, FAQ } from './components/InfoSections';
import { OrderForm } from './components/OrderForm';
import { CoffeeMenu } from './components/CoffeeMenu';

export default function App() {
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);

  return (
    <div className="min-h-screen font-sans text-[#3d2314] selection:bg-[#d69e6b]/30 overflow-x-hidden bg-[#f5ebe1]">
      <Header />
      <main>
        <Hero />
        <CoffeeMenu onSelectVariant={setSelectedVariant} />
        <Benefits />
        <HowItWorks />
        <OrderForm preselectedVariant={selectedVariant} />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
