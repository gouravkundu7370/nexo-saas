import React from 'react'
import PricingSection from './PricingSection';
import Hero from './Hero';
import FeaturesSection from './FeatureSection';

export default function LandingPage() {
  return (
    <div>
      <Hero />
      <FeaturesSection />

      <PricingSection />
    </div>
  );
}
