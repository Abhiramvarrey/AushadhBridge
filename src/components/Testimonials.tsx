import React from 'react';

const testimonials = [
  {
    content: "MedSupply has transformed our procurement process. We've reduced costs by 30% and eliminated stockouts completely.",
    author: "Dr. Sarah Johnson",
    role: "Chief Medical Officer",
    organization: "Memorial Hospital",
  },
  {
    content: "The platform is intuitive and powerful. Our staff spends less time on paperwork and more time on patient care.",
    author: "Mark Williams",
    role: "Procurement Director",
    organization: "Westside Medical Center",
  },
  {
    content: "As a medical supplier, we've expanded our customer base by 40% since joining the MedSupply network.",
    author: "Jennifer Chen",
    role: "CEO",
    organization: "MediTech Supplies",
  },
];

const Testimonials = () => {
  return (
    <section className="py-12 bg-primary-dark overflow-hidden md:py-20 lg:py-24">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="text-center">
            <h2 className="section-title">Testimonials</h2>
            <p className="section-heading">
              Hear from our customers
            </p>
          </div>
          <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-primary-light">
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-lg font-medium text-white">
                      "{testimonial.content}"
                    </p>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-secondary bg-opacity-20 flex items-center justify-center text-secondary font-bold">
                        {testimonial.author.charAt(0)}
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-white">
                        {testimonial.author}
                      </p>
                      <div className="flex space-x-1 text-sm text-gray-400">
                        <p>{testimonial.role}</p>
                        <span aria-hidden="true">&middot;</span>
                        <p>{testimonial.organization}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;