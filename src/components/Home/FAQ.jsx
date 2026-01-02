import { useState } from 'react';
import { FaChevronDown, FaQuestionCircle } from 'react-icons/fa';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I list my property on HomeNest?',
      answer: 'Simply create an account, click on "Add Property" in the navigation menu, fill in the property details including images, location, and pricing, then submit. Your listing will be live immediately!'
    },
    {
      question: 'Is there any fee for listing properties?',
      answer: 'Creating an account and browsing properties is completely free! We offer various premium packages for sellers who want enhanced visibility and featured listings.'
    },
    {
      question: 'How can I contact property owners?',
      answer: 'Each property listing includes contact information. You can directly reach out to property owners via email or phone number displayed on the property details page.'
    },
    {
      question: 'Are all properties verified?',
      answer: 'Yes, we verify all property listings to ensure authenticity. However, we recommend conducting your own due diligence before making any transaction.'
    },
    {
      question: 'Can I edit my property listing after posting?',
      answer: 'Absolutely! Go to "My Properties" section, select the property you want to edit, and update any information. Changes are reflected immediately.'
    },
    {
      question: 'How do I delete my property listing?',
      answer: 'Navigate to "My Properties", find the property you want to remove, and click the delete button. You\'ll be asked to confirm before the listing is permanently removed.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 mb-6">
            <FaQuestionCircle className="text-4xl text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Got questions? We've got answers!
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-700 transition-all duration-300 hover:shadow-lg"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white pr-4">
                  {faq.question}
                </h3>
                <FaChevronDown
                  className={`text-purple-600 dark:text-purple-400 transition-transform duration-300 flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-5">
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
