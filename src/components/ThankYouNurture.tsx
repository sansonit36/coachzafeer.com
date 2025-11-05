import React from 'react';
import { Heart, Download, Mail, ArrowRight, BookOpen } from 'lucide-react';

const ThankYouNurture = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Icon */}
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto shadow-xl">
          <Heart className="w-12 h-12 text-white" />
        </div>

        {/* Main Message */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight">
            Thank You for Your Interest!
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            I appreciate you taking the time to learn about our transformation program. 
            While you might not be ready for our premium coaching right now, I want to help you get started on your journey.
          </p>
        </div>

        {/* Free Resources */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Free Resources to Get You Started</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">The Complete Transformation Guide</h3>
                <p className="text-gray-600 text-sm">A 50-page guide with workout plans, nutrition basics, and habit formation strategies.</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">7-Day Email Course</h3>
                <p className="text-gray-600 text-sm">Daily lessons on building sustainable fitness habits that actually stick.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-4">
          <button className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl">
            <Download className="w-5 h-5" />
            Get Your Free Resources
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <p className="text-sm text-gray-600">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>

        {/* Future Opportunity */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Ready for More Support Later?</h3>
          <p className="text-gray-700 mb-4">
            When you're ready to invest in your transformation with personalized coaching, 
            I'll be here to help you achieve incredible results.
          </p>
          <a
            href="/lead-capture"
            className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold"
          >
            Learn About Our Coaching Program
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Contact */}
        <div className="text-center">
          <p className="text-gray-600 mb-2">Questions? I'm here to help!</p>
          <a href="mailto:coach@zafeer.com" className="text-blue-600 hover:text-blue-700 font-medium">
            coach@zafeer.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default ThankYouNurture;