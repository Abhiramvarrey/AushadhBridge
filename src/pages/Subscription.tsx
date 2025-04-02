import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Check, Crown } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';

const plans = [
  {
    name: 'Basic',
    price: 299,
    features: [
      'Up to 5 users',
      'Basic inventory management',
      'Standard procurement tools',
      'Email support',
      '1,000 orders per month',
      'Basic analytics'
    ],
    recommended: false
  },
  {
    name: 'Professional',
    price: 599,
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
    recommended: true
  },
  {
    name: 'Enterprise',
    price: 999,
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
    recommended: false
  }
];

const Subscription = () => {
  const { user } = useAuthStore();

  const handleUpgrade = (planName: string) => {
    toast.success(`Upgrading to ${planName} plan...`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Subscription Plans</h1>
          <p className="mt-2 text-gray-400">
            Choose the perfect plan for your business needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-primary-light rounded-lg p-6 ${
                plan.recommended
                  ? 'ring-2 ring-secondary shadow-lg scale-105'
                  : ''
              }`}
            >
              {plan.recommended && (
                <div className="absolute top-0 right-0 -mr-1 -mt-1 bg-secondary px-4 py-1 rounded-bl-lg rounded-tr-lg">
                  <p className="text-xs font-medium text-white">Recommended</p>
                </div>
              )}

              <div className="text-center">
                <Crown className={`mx-auto h-12 w-12 ${
                  plan.recommended ? 'text-secondary' : 'text-gray-400'
                }`} />
                <h3 className="mt-4 text-2xl font-bold text-white">{plan.name}</h3>
                <p className="mt-4 text-5xl font-bold text-white">
                  ${plan.price}
                  <span className="text-lg text-gray-400">/month</span>
                </p>
              </div>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-secondary" />
                    <span className="ml-3 text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleUpgrade(plan.name)}
                className={`mt-8 w-full py-3 px-6 rounded-lg font-medium ${
                  plan.recommended
                    ? 'bg-secondary hover:bg-secondary-dark text-white'
                    : 'bg-primary hover:bg-primary-dark text-white border border-gray-600'
                } transition-colors duration-200`}
                disabled={user?.subscription?.plan.toLowerCase() === plan.name.toLowerCase()}
              >
                {user?.subscription?.plan.toLowerCase() === plan.name.toLowerCase()
                  ? 'Current Plan'
                  : 'Upgrade'}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <p className="mt-2 text-gray-400">
            Need a custom plan? <button className="text-secondary hover:text-secondary-light">Contact us</button>
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Subscription;