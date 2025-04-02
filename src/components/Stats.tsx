import React from 'react';

const Stats = () => {
  return (
    <div className="bg-secondary">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Trusted by healthcare providers worldwide
          </h2>
          <p className="mt-3 text-xl text-blue-100 sm:mt-4">
            Our platform is revolutionizing medical supply chains across the globe
          </p>
        </div>
        <dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
          <div className="flex flex-col">
            <dt className="order-2 mt-2 text-lg leading-6 font-medium text-blue-100">
              Healthcare Providers
            </dt>
            <dd className="order-1 text-5xl font-extrabold text-white">2,500+</dd>
          </div>
          <div className="flex flex-col mt-10 sm:mt-0">
            <dt className="order-2 mt-2 text-lg leading-6 font-medium text-blue-100">
              Medical Suppliers
            </dt>
            <dd className="order-1 text-5xl font-extrabold text-white">500+</dd>
          </div>
          <div className="flex flex-col mt-10 sm:mt-0">
            <dt className="order-2 mt-2 text-lg leading-6 font-medium text-blue-100">
              Orders Processed
            </dt>
            <dd className="order-1 text-5xl font-extrabold text-white">1M+</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default Stats;