import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "How does MedSupply help reduce costs?",
    answer: "MedSupply helps healthcare providers reduce costs through optimized procurement processes, bulk purchasing opportunities, inventory optimization to reduce waste, and connecting you directly with manufacturers to eliminate middlemen markups."
  },
  {
    question: "Is MedSupply compliant with healthcare regulations?",
    answer: "Yes, MedSupply is fully compliant with all relevant healthcare regulations including HIPAA, FDA requirements, and international standards for medical supply chain management. Our platform is regularly audited to ensure ongoing compliance."
  },
  {
    question: "How long does implementation take?",
    answer: "Implementation typically takes 2-4 weeks depending on the size of your organization and complexity of your existing systems. Our dedicated implementation team will guide you through every step of the process to ensure a smooth transition."
  },
  {
    question: "Can MedSupply integrate with our existing EHR system?",
    answer: "Yes, MedSupply offers robust API integrations with all major EHR systems including Epic, Cerner, Allscripts, and more. Our team will work with you to ensure seamless data flow between systems."
  },
  {
    question: "What kind of support does MedSupply provide?",
    answer: "We offer tiered support based on your plan. All customers receive email support with guaranteed response times. Professional and Enterprise plans include phone support, and Enterprise customers receive 24/7 dedicated support with a named account manager."
  },
  {
    question: "Is there a contract commitment?",
    answer: "Our Starter and Professional plans are available on monthly or annual terms, with a 20% discount for annual commitments. Enterprise plans typically involve a 12-month minimum commitment, but we can customize terms based on your organization's needs."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-primary-dark py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="section-title">FAQ</h2>
          <p className="section-heading">
            Frequently asked questions
          </p>
          <p className="section-subheading">
            Find answers to common questions about our platform.
          </p>
        </div>

        <div className="mt-12 max-w-3xl mx-auto divide-y divide-gray-700">
          {faqs.map((faq, index) => (
            <div key={index} className="py-6">
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full text-left focus:outline-none"
              >
                <span className="text-lg font-medium text-white">{faq.question}</span>
                <span className="ml-6 flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-secondary" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-secondary" />
                  )}
                </span>
              </button>
              {openIndex === index && (
                <div className="mt-4 pr-12">
                  <p className="text-base text-gray-400">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;