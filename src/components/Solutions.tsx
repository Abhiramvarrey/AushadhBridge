import React from 'react';
import { ArrowRight } from 'lucide-react';

const solutions = [
  {
    title: 'For Hospitals',
    description: 'Streamline procurement, reduce costs, and ensure critical supplies are always available when needed.',
    image: 'https://images.unsplash.com/photo-1516549655669-df64a4ad7d12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    title: 'For Clinics',
    description: 'Simplify ordering, manage inventory efficiently, and focus more on patient care rather than administrative tasks.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
  },
  {
    title: 'For Suppliers',
    description: 'Expand your reach, streamline order processing, and build lasting relationships with healthcare providers.',
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
];

const Solutions = () => {
  return (
    <div className="py-12 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="section-title">Solutions</h2>
          <p className="section-heading">
            Tailored for your healthcare business
          </p>
          <p className="section-subheading">
            We offer specialized solutions for different healthcare stakeholders.
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {solutions.map((solution) => (
              <div key={solution.title} className="flex flex-col rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl bg-primary-light">
                <div className="flex-shrink-0">
                  <img className="h-48 w-full object-cover" src={solution.image} alt={solution.title} />
                </div>
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-xl font-semibold text-white">{solution.title}</p>
                    <p className="mt-3 text-base text-gray-400">{solution.description}</p>
                  </div>
                  <div className="mt-6">
                    <a href="#" className="text-secondary hover:text-secondary-light font-medium flex items-center transition-colors duration-300">
                      Learn more <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solutions;