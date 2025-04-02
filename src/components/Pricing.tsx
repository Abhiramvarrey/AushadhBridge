import React from 'react';
import { Check } from 'lucide-react';

const tiers = [
  {
    name: 'Starter',
    price: '$299',
    frequency: '/month',
    description: 'Perfect for small clinics and practices.',
    features: [
      'Up to 5 users',
      'Basic inventory management',
      'Standard procurement tools',
      'Email support',
      '1,000 orders per month',
      'Basic analytics'
    ],
    cta: 'Start your trial',
    mostPopular: false,
  },
  {
    name: 'Professional',
    price: '$599',
    frequency: '/month',
    description: 'Ideal for mid-sized healthcare facilities.',
    features: [
      'Up to 20 users',
      'Advanced inventory management',
      'Automated procurement workflows',
      'Priority email and phone support',
      'Unlimited orders',
      'Advanced analytics and reporting',
      'API access',
      'Custom integrations'
    ],
    cta: 'Start your trial',
    mostPopular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    frequency: '',
    description: 'For large hospitals and healthcare networks.',
    features: [
      'Unlimited users',
      'Enterprise-grade inventory management',
      'Full procurement suite',
      '24/7 dedicated support',
      'Unlimited orders',
      'Custom analytics dashboard',
      'Advanced API access',
      'Custom integrations',
      'Dedicated account manager',
      'On-site training'
    ],
    cta: 'Contact sales',
    mostPopular: false,
  },
];

const Pricing = () => {
  return (
    <div className="bg-primary py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="section-title">Pricing</h2>
          <p className="section-heading">
            Plans for businesses of all sizes
          </p>
          <p className="section-subheading">
            Choose the perfect plan to streamline your medical supply chain.
          </p>
        </div>

        <div className="mt-16 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
          {tiers.map((tier) => (
            <div 
              key={tier.name} 
              className={`relative p-8 bg-primary-light rounded-2xl shadow-lg flex flex-col
                ${tier.mostPopular ? 'ring-2 ring-secondary lg:scale-105 z-10' : ''}
              `}
            >
              {tier.mostPopular && (
                <div className="absolute top-0 right-0 -mr-1 -mt-1 bg-secondary px-4 py-1 rounded-bl-lg rounded-tr-lg">
                  <p className="text-xs font-medium text-white">Most popular</p>
                </div>
              )}
              
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white">{tier.name}</h3>
                <p className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold text-white">{tier.price}</span>
                  <span className="ml-1 text-xl font-semibold text-gray-400">{tier.frequency}</span>
                </p>
                <p className="mt-6 text-gray-400">{tier.description}</p>

                <ul className="mt-6 space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex">
                      <Check className="h-5 w-5 text-secondary flex-shrink-0" />
                      <span className="ml-3 text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#"
                className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium
                  ${tier.mostPopular 
                    ? 'bg-secondary hover:bg-secondary-dark text-white' 
                    : 'bg-primary-dark hover:bg-primary border border-secondary text-white'
                  } transition-colors duration-300`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;