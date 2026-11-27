import React, { useEffect } from 'react';
import { CheckCircle, Calendar, Download, ArrowRight } from 'lucide-react';

const ThankYou = () => {
  useEffect(() => {
    // Track conversion with Meta Pixel
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'CompleteRegistration', {
        content_name: 'Consultation Scheduled',
        content_category: 'Fitness Coaching',
        value: 50,
        currency: 'USD'
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-xl">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>

        {/* Main Message */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight">
            Thank You!
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            Your application has been submitted successfully. Based on your responses, 
            you're a great fit for our transformation program!
          </p>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">What Happens Next?</h2>
          
          <div className="space-y-4 text-left">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Schedule Your Consultation</h3>
                <p className="text-gray-600">Book a 30-minute strategy call to discuss your goals and create your personalized plan.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Receive Your Welcome Package</h3>
                <p className="text-gray-600">Get instant access to our preparation guide and transformation toolkit.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Start Your Transformation</h3>
                <p className="text-gray-600">Begin your 90-day journey to the best shape of your life.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-4">
          <a
            href="https://coachzafeer.onethread.cloud/f/hnh-booking"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            <Calendar className="w-5 h-5" />
            Schedule Your Consultation Now
            <ArrowRight className="w-5 h-5" />
          </a>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="flex items-center gap-2 bg-white border-2 border-gray-300 hover:border-orange-500 text-gray-700 font-semibold px-6 py-3 rounded-xl transition-all duration-200">
              <Download className="w-4 h-4" />
              Download Preparation Guide
            </button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-gray-50 rounded-xl p-6">
          <p className="text-gray-600 mb-2">
            <strong>Questions?</strong> Contact Coach Zafeer directly:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
            <a href="mailto:coach@zafeer.com" className="text-orange-600 hover:text-orange-700 font-medium">
              coach@zafeer.com
            </a>
            <a href="tel:+15551234567" className="text-orange-600 hover:text-orange-700 font-medium">
              (555) 123-4567
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;