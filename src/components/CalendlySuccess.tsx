import React, { useEffect } from 'react';
import { CheckCircle, Calendar, ArrowRight, Clock, User } from 'lucide-react';
import { leadsService } from '../services/leadsService';

const CalendlySuccess = () => {
  useEffect(() => {
    const updateLeadBookingStatus = async () => {
      const pendingLeadId = localStorage.getItem('pending-calendly-lead');
      
      if (pendingLeadId) {
        try {
          // Update lead status to show call is booked
          await leadsService.updateLead(pendingLeadId, {
            status: 'call_booked',
            notes: '[SYSTEM] Call booked via Calendly on ' + new Date().toLocaleString()
          });
          
          // Clear the pending lead
          localStorage.removeItem('pending-calendly-lead');
        } catch (error) {
          console.error('Error updating lead booking status:', error);
          localStorage.removeItem('pending-calendly-lead');
        }
      }
    };
    
    updateLeadBookingStatus();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-xl animate-pulse">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>

        {/* Main Message */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight">
            Call Booked Successfully! 🎉
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            Your consultation call has been scheduled. You should receive a confirmation email shortly with all the details.
          </p>
        </div>

        {/* What's Next */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">What Happens Next?</h2>
          
          <div className="space-y-4 text-left">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Check Your Email</h3>
                <p className="text-gray-600">You'll receive a confirmation email with the meeting link and calendar invite.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Prepare for Your Call</h3>
                <p className="text-gray-600">Think about your specific goals and any questions you'd like to discuss.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Join the Call</h3>
                <p className="text-gray-600">We'll discuss your transformation plan and see if we're a good fit to work together.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="w-5 h-5 text-orange-600" />
            <h3 className="text-lg font-bold text-gray-900">Important Notes</h3>
          </div>
          <div className="space-y-2 text-sm text-gray-700">
            <p>• Please join the call 2-3 minutes early</p>
            <p>• Have a quiet space for our conversation</p>
            <p>• Bring any questions about your fitness goals</p>
            <p>• If you need to reschedule, use the link in your confirmation email</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <User className="w-5 h-5 text-gray-600" />
            <h3 className="font-bold text-gray-900">Need Help?</h3>
          </div>
          <p className="text-gray-600 mb-3">
            If you have any questions before our call, feel free to reach out:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
            <a href="mailto:coach@zafeer.com" className="text-orange-600 hover:text-orange-700 font-medium">
              coach@zafeer.com
            </a>
            <span className="hidden sm:inline text-gray-400">•</span>
            <span className="text-gray-600">Response within 24 hours</span>
          </div>
        </div>

        {/* Back to Home */}
        <div className="pt-4">
          <a 
            href="/" 
            className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Homepage
          </a>
        </div>
      </div>
    </div>
  );
};

export default CalendlySuccess;