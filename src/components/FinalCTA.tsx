import React from 'react';
import { Clock, Phone, Mail, MapPin, AlertCircle, ArrowRight, Shield, Star } from 'lucide-react';

const FinalCTA = () => {
  const currentMonth = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' });

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 sm:space-y-12">
          {/* Urgency Alert */}
          <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-sm border border-red-500/50 rounded-xl sm:rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 flex-shrink-0" />
              <span className="font-black text-lg sm:text-xl text-red-400">LIMITED TIME OFFER</span>
            </div>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              I only accept <strong className="text-white">12 new clients per month</strong> to ensure each person gets the personal attention they deserve. 
              <strong className="text-orange-400 block mt-2">Only 3 spots remaining for {currentMonth}.</strong>
            </p>
          </div>

          {/* Main Headline */}
          <div className="space-y-6 sm:space-y-8">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[0.9] tracking-tight text-balance">
              Your Transformation
              <span className="block bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mt-2">
                Starts Today
              </span>
            </h2>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-slate-300 leading-relaxed max-w-3xl mx-auto px-4">
              Stop waiting for the "perfect time" - it doesn't exist. Your transformation starts with a single decision. 
              Make it today.
            </p>
          </div>

          {/* Main CTA */}
          <div className="space-y-6 sm:space-y-8">
            <a href="https://coachzafeer.onethread.cloud/f/hnh-booking" className="group relative bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-black text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-orange-500/25 w-full sm:w-auto inline-block max-w-md mx-auto">
              <span className="flex items-center justify-center gap-3">
                <span>Book Your Call Now</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0" />
              </span>
            </a>
            
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                <span>90-day guarantee</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                <span>No commitment required</span>
              </div>
              <span>•</span>
              <span>Free consultation</span>
            </div>
          </div>

          {/* Alternative Options */}
          <div className="space-y-3 sm:space-y-4">
            <p className="text-slate-400 text-sm sm:text-base">Questions? Get in touch below.</p>
          </div>

          {/* Contact Information */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/10">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">Questions? Get in Touch</h3>
            <div className="grid gap-6 sm:gap-8">
              <div className="flex flex-col items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl bg-white/5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="text-center">
                  <div className="font-bold text-white text-sm sm:text-base">Email</div>
                  <div className="text-slate-400 text-sm sm:text-base">hello@coachzafeer.com</div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl bg-white/5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="text-center">
                  <div className="font-bold text-white text-sm sm:text-base">Location</div>
                  <div className="text-slate-400 text-sm sm:text-base">Multan, PK</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;