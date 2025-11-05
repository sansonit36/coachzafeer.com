import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([0]); // First item open by default

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      question: "How is this different from other fitness programs?",
      answer: "Most programs focus on quick fixes or extreme measures that aren't sustainable. My Habits & Hypertrophy System is built on behavioral psychology and exercise science. Instead of relying on willpower, we create automatic habits that make fitness effortless. You'll build lean muscle while losing fat simultaneously - something most programs can't deliver because they don't understand the science behind body recomposition."
    },
    {
      question: "I've tried everything before. Why will this work when nothing else has?",
      answer: "The reason other programs failed isn't because you lack willpower - it's because they weren't designed for busy professionals. My system accounts for your demanding schedule, travel, work stress, and social obligations. We don't fight against your lifestyle; we work with it. Plus, with my 90-day money-back guarantee, you have nothing to lose except the weight."
    },
    {
      question: "How much time do I really need to commit?",
      answer: "Just 4 hours per week total - that's less than 35 minutes per day. My clients include CEOs, surgeons, and investment bankers who work 60+ hour weeks. If they can find the time, so can you. The workouts are designed for maximum efficiency, and the nutrition system requires zero meal prep or complicated tracking."
    },
    {
      question: "What if I travel frequently for work?",
      answer: "Perfect - I've designed this system specifically for frequent travelers. You'll get hotel room workouts, airport food guides, and strategies for maintaining your routine across time zones. Some of my best results come from clients who travel 200+ days per year. Travel becomes an advantage, not an obstacle."
    },
    {
      question: "I'm over 40. Is it too late to see dramatic results?",
      answer: "Absolutely not. In fact, my system works better for people over 40 because you have the discipline and consistency that younger people often lack. I've helped clients in their 50s and 60s achieve the best shape of their lives. Your metabolism isn't broken - it just needs the right approach."
    },
    {
      question: "Do I need to give up my favorite foods or social life?",
      answer: "Never. Restrictive diets don't work long-term, and I refuse to make you miserable. You'll learn how to enjoy restaurants, happy hours, and family dinners while still losing fat and building muscle. The goal is to enhance your life, not restrict it."
    },
    {
      question: "What kind of results can I realistically expect?",
      answer: "Based on 500+ client transformations: 15-35 pounds of fat loss, 5-15 pounds of muscle gain, and dramatically improved energy levels within 90 days. But more importantly, you'll develop habits that keep you in great shape for life. This isn't a temporary fix - it's a permanent lifestyle upgrade."
    },
    {
      question: "How much does the program cost?",
      answer: "Investment varies based on your specific goals and the level of support you need. During our consultation call, I'll recommend the best option for your situation. What I can tell you is that my clients typically save money because they stop wasting cash on supplements, meal delivery services, and gym memberships they don't use."
    },
    {
      question: "What if I don't see results?",
      answer: "Simple - you get every penny back. I offer a complete 90-day money-back guarantee because I'm that confident in my system. Follow the program as outlined, and if you don't see dramatic improvements in your body composition and energy levels, I'll refund your entire investment. No questions asked, no hoops to jump through."
    },
    {
      question: "How do I know if I'm ready for this program?",
      answer: "You're ready if you're tired of making excuses and ready to make your health a priority. This isn't for people looking for magic pills or shortcuts. It's for professionals who understand that real results require commitment and are willing to invest in themselves. If that's you, let's talk."
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold">
            <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
            Everything You Need
            <span className="block text-orange-500">To Know</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Get straight answers to the questions every serious professional asks before committing to their transformation
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 sm:space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 sm:px-8 py-6 sm:py-8 text-left flex items-center justify-between hover:bg-gray-50 rounded-xl sm:rounded-2xl transition-colors duration-200"
              >
                <h3 className="text-base sm:text-lg font-bold text-gray-900 pr-4 leading-tight">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openItems.includes(index) ? (
                    <Minus className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                  ) : (
                    <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                  )}
                </div>
              </button>
              
              {openItems.includes(index) && (
                <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 sm:mt-16 space-y-4 sm:space-y-6">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-orange-200">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base">
              Book a free consultation call and I'll answer all your questions personally. 
              No pressure, no sales pitch - just honest answers about whether this program is right for you.
            </p>
            <a href="https://crm.coachzafeer.com" className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
              Book Your Free Call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;