import React from 'react';
import { TruckIcon, BarChart3, Users, ShieldCheck, Zap, Stethoscope } from 'lucide-react';

const features = [
  {
    name: 'Real-time Inventory Management',
    description: 'Track your medical supplies in real-time with our advanced inventory management system.',
    icon: BarChart3,
  },
  {
    name: 'Streamlined Procurement',
    description: 'Simplify your procurement process with automated ordering and approval workflows.',
    icon: TruckIcon,
  },
  {
    name: 'Supplier Network',
    description: 'Connect with a vast network of verified medical suppliers to find the best products at competitive prices.',
    icon: Users,
  },
  {
    name: 'Compliance & Security',
    description: 'Ensure compliance with healthcare regulations and protect sensitive data with our secure platform.',
    icon: ShieldCheck,
  },
  {
    name: 'Fast Delivery',
    description: 'Expedite delivery of critical medical supplies with our optimized logistics network.',
    icon: Zap,
  },
  {
    name: 'Healthcare Integration',
    description: 'Seamlessly integrate with your existing healthcare systems for a unified workflow.',
    icon: Stethoscope,
  },
];

const Features = () => {
  return (
    <div className="py-12 bg-primary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="section-title">Features</h2>
          <p className="section-heading">
            A better way to manage medical supplies
          </p>
          <p className="section-subheading">
            Our comprehensive platform offers everything you need to optimize your medical supply chain.
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-secondary text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-white">{feature.name}</p>
                <p className="mt-2 ml-16 text-base text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;