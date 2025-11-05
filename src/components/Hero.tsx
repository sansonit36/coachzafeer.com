import React from 'react';
import { Star, Award, Users, ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  const scrollToVSL = () => {
    const vslSection = document.getElementById('vsl-section');
    if (vslSection) {
      vslSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToTestimonials = () => {
    const testimonialsSection = document.getElementById('testimonials');
    if (testimonialsSection) {
      testimonialsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-orange-500/5 to-red-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 lg:space-y-10 order-2 lg:order-1">
            {/* Credibility Badges */}
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start">
              <div className="glass-effect rounded-full px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium">
                <div className="flex items-center gap-2">
                  <Award className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400" />
                  <span>12+ Years Elite Training</span>
                </div>
              </div>
              <div className="glass-effect rounded-full px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium">
                <div className="flex items-center gap-2">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400" />
                  <span>500+ Transformations</span>
                </div>
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[0.9] tracking-tight text-balance">
                Transform Your Body in
                <span className="block gradient-text mt-1 sm:mt-2">90 Days or Less</span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Without endless hours in the gym or restrictive diets that leave you miserable and depleted
              </p>
            </div>

            {/* Sub-headline */}
            <div className="space-y-4 text-center lg:text-left">
              <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Join hundreds of busy professionals who've achieved their dream physique through my proven 
                <span className="text-white font-semibold"> Habits & Hypertrophy System</span> — the only program that 
                combines sustainable habits with science-based muscle building.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 sm:gap-4 pt-4 max-w-md mx-auto lg:mx-0">
              <button 
                onClick={scrollToVSL}
                className="group relative bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-5 rounded-2xl transition-all duration-300 transform hover:scale-105 premium-shadow hover:premium-glow block"
              >
                <span className="flex items-center justify-center gap-3">
                  <span className="text-center">Watch Success Stories</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0" />
                </span>
              </button>
              
              <button 
                onClick={scrollToTestimonials}
                className="group glass-effect text-white font-semibold text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-5 rounded-2xl transition-all duration-300 hover:bg-white/20"
              >
                <span className="flex items-center justify-center gap-3">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  Watch Testimonials
                </span>
              </button>
            </div>

            <div className="flex flex-col gap-3 pt-2 text-center lg:text-left">
              <p className="text-xs sm:text-sm text-slate-400 flex items-center justify-center lg:justify-start gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0"></span>
                Limited spots available • 90-day money-back guarantee
              </p>
              
              {/* Social Proof */}
              <div className="flex items-center justify-center lg:justify-start gap-3 flex-wrap">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-slate-300 font-medium text-sm sm:text-base">4.9/5 from 500+ verified reviews</span>
              </div>
            </div>
          </div>

          {/* Right Column - Coach Image */}
          <div className="relative lg:justify-self-end order-1 lg:order-2">
            <div className="relative z-10 max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
              <div className="relative">
                <img
                  src="/IMG_5497.webp"
                  alt="Coach Zafeer - Elite Fitness Transformation Expert"
                  className="w-full rounded-3xl premium-shadow"
                />
                
                {/* Floating Achievement Cards - Adjusted for mobile */}
                <div className="absolute -top-4 -left-4 sm:-top-8 sm:-left-8 glass-effect rounded-xl sm:rounded-2xl p-2 sm:p-4 premium-shadow">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-white">500+ Success Stories</div>
                      <div className="text-xs text-slate-400 hidden sm:block">Verified Results</div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -right-4 sm:-bottom-8 sm:-right-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl sm:rounded-2xl p-3 sm:p-6 premium-shadow">
                  <div className="text-center">
                    <div className="font-black text-xl sm:text-3xl text-white">12+</div>
                    <div className="text-xs sm:text-sm text-orange-100 font-medium">Years Elite Training</div>
                  </div>
                </div>
                
                <div className="absolute top-1/2 -right-6 sm:-right-12 transform -translate-y-1/2 glass-effect rounded-lg sm:rounded-xl p-2 sm:p-3 premium-shadow">
                  <div className="text-center">
                    <div className="font-bold text-sm sm:text-lg text-white">NASM</div>
                    <div className="text-xs text-slate-400">Certified</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background Glow Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-3xl blur-3xl transform scale-110 -z-10"></div>
            <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-3xl blur-2xl transform scale-125 -z-20"></div>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div className="mt-16 sm:mt-20 pt-8 sm:pt-12 border-t border-white/10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            {[
              { number: "500+", label: "Transformations", sublabel: "Verified Results" },
              { number: "12+", label: "Years Experience", sublabel: "Elite Training" },
              { number: "4.9/5", label: "Client Rating", sublabel: "200+ Reviews" },
              { number: "90%", label: "Success Rate", sublabel: "Program Completion" }
            ].map((stat, index) => (
              <div key={index} className="space-y-1 sm:space-y-2">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black gradient-text">{stat.number}</div>
                <div className="text-white font-semibold text-sm sm:text-base">{stat.label}</div>
                <div className="text-xs sm:text-sm text-slate-400">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;