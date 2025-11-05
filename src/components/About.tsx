import React from 'react';
import { Award, BookOpen, Users, Heart, CheckCircle } from 'lucide-react';

const About = () => {
  const credentials = [
    { icon: Award, text: "NASM Certified Personal Trainer", verified: true },
    { icon: BookOpen, text: "Precision Nutrition Certified", verified: true },
    { icon: Users, text: "12+ Years Elite Training Experience", verified: true },
    { icon: Heart, text: "500+ Successful Transformations", verified: true }
  ];

  const achievements = [
    "Featured in Men's Health Magazine",
    "Keynote Speaker at Fitness Summit 2023",
    "Developed proprietary H&H System",
    "Trained Fortune 500 executives"
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative z-10 max-w-md mx-auto lg:max-w-none">
              <img
                src="/IMG_7667.JPEG.jpg"
                alt="Coach Zafeer in professional training environment"
                className="w-full rounded-2xl sm:rounded-3xl shadow-2xl"
              />
              
              {/* Floating Achievement Cards - Mobile Optimized */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-8 sm:-left-8 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-2xl">
                <div className="text-center">
                  <div className="font-black text-xl sm:text-3xl text-orange-400">12+</div>
                  <div className="text-xs sm:text-sm font-medium text-slate-300">Years Experience</div>
                  <div className="text-xs text-slate-400 hidden sm:block">Elite Training</div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 sm:-top-8 sm:-right-8 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-2xl">
                <div className="text-center">
                  <div className="font-black text-lg sm:text-2xl">500+</div>
                  <div className="text-xs sm:text-sm font-medium">Transformations</div>
                  <div className="text-xs opacity-90 hidden sm:block">Verified Results</div>
                </div>
              </div>

              <div className="absolute top-1/2 -left-6 sm:-left-12 transform -translate-y-1/2 bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-4 shadow-xl border border-gray-200">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-gray-900">NASM Certified</div>
                    <div className="text-xs text-gray-600 hidden sm:block">Elite Trainer</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl sm:rounded-3xl blur-3xl transform scale-110 -z-10"></div>
            <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/5 to-red-500/5 rounded-2xl sm:rounded-3xl blur-2xl transform scale-125 -z-20"></div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
            <div className="space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold">
                <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                Meet Your Coach
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
                Coach Zafeer
              </h2>
              <p className="text-lg sm:text-xl text-orange-600 font-bold">
                Elite Transformation Specialist & Habit Change Expert
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6 text-gray-700 leading-relaxed text-base sm:text-lg">
              <p>
                I wasn’t always the coach you see today. I started out as a <strong className="text-gray-900">skinny kid</strong>,  who caught every illness going around, battling constant anger and frustration. I felt weak, overlooked, and stuck — working a soul-crushing corporate job, and making every excuse in the book about why I "couldn't" get in shape.
              </p>
              
              <p>
                That changed when I discovered the power of <strong className="text-gray-900">habit-based transformation</strong>. 
                Instead of fighting willpower battles every day, I learned how to make fitness and nutrition automatic. 
                The results were incredible — and permanent.
              </p>
              
              <p>
                Now, I've dedicated my life to helping busy professionals like you achieve the same breakthrough. 
                My <strong className="text-gray-900">Habits & Hypertrophy System</strong> has helped over 500 people 
                transform their bodies and lives, even with the most demanding schedules.
              </p>
            </div>

            {/* Achievements */}
            <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Notable Achievements</h3>
              <div className="grid grid-cols-1 gap-2 sm:gap-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium text-xs sm:text-sm">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Credentials */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Credentials & Certifications</h3>
              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                {credentials.map((credential, index) => {
                  const IconComponent = credential.icon;
                  return (
                    <div key={index} className="flex items-center gap-3 sm:gap-4 bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-gray-800 font-semibold text-xs sm:text-sm block">{credential.text}</span>
                        {credential.verified && (
                          <div className="flex items-center gap-1 mt-1">
                            <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                            <span className="text-xs text-green-600 font-medium">Verified</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Personal Mission */}
            <div className="bg-gradient-to-r from-orange-50 via-yellow-50 to-orange-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-orange-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-orange-200/30 to-transparent rounded-full transform translate-x-12 sm:translate-x-16 -translate-y-12 sm:-translate-y-16"></div>
              <div className="relative">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">My Mission</h3>
                <blockquote className="text-gray-800 leading-relaxed text-base sm:text-lg italic">
                  "To prove that you don't need to choose between career success and physical health. 
                  With the right system, you can have both — and I'm here to show you exactly how."
                </blockquote>
                <div className="mt-3 sm:mt-4 flex items-center gap-3">
                  <div className="w-8 sm:w-12 h-0.5 bg-gradient-to-r from-orange-500 to-red-500"></div>
                  <span className="text-gray-600 font-semibold text-sm sm:text-base">Coach Zafeer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;