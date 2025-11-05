import React from 'react';
import { Target, Zap, Clock, Shield, TrendingUp, ArrowRight } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      icon: Target,
      title: "Lose 15-35 Pounds of Fat",
      description: "Without restrictive diets or endless cardio sessions that drain your energy and destroy your social life",
      metric: "Average: 23 lbs lost"
    },
    {
      icon: TrendingUp,
      title: "Build Lean Muscle Mass",
      description: "Add 5-15 pounds of functional muscle that makes you look strong, feel confident, and perform better",
      metric: "Average: 8 lbs gained"
    },
    {
      icon: Zap,
      title: "10x Your Energy Levels",
      description: "Wake up refreshed and maintain high energy throughout your demanding workday and evening activities",
      metric: "92% report better energy"
    },
    {
      icon: Clock,
      title: "Just 4 Hours Per Week",
      description: "Efficient, science-based workouts that fit seamlessly into your schedule without sacrificing family time",
      metric: "4 hours weekly commitment"
    },
    {
      icon: Shield,
      title: "Bulletproof Habits",
      description: "Build sustainable routines that stick for life, not temporary quick fixes that fail after 30 days",
      metric: "89% maintain results"
    }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 sm:space-y-6 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold">
            <Target className="w-3 h-3 sm:w-4 sm:h-4" />
            Proven Results
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight text-balance px-4">
            What You'll Achieve in
            <span className="block text-orange-500">Just 90 Days</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Stop wasting time on programs that don't work. Here's exactly what my proven system delivers for busy professionals:
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-gray-50 to-white hover:from-white hover:to-gray-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 transition-all duration-500 hover:shadow-2xl hover:scale-105 border border-gray-100 hover:border-orange-200"
              >
                <div className="space-y-4 sm:space-y-6">
                  <div className="relative">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-100 to-red-100 group-hover:from-orange-500 group-hover:to-red-500 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300">
                      <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {benefit.metric}
                    </div>
                  </div>
                  
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                      {benefit.description}
                    </p>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Results Guarantee */}
        <div className="relative bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center border border-green-200 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5"></div>
          <div className="relative space-y-4 sm:space-y-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-xl">
              <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900">100% Results Guarantee</h3>
              <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed px-4">
                Follow the system for 90 days. If you don't see dramatic changes in your body composition, 
                energy levels, and overall confidence, I'll refund every penny. No questions asked, no hoops to jump through.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-600 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-medium">90-day guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-medium">No questions asked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-medium">Full refund</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;