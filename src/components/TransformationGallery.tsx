import React from 'react';
import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Star, TrendingUp } from 'lucide-react';

interface Transformation {
  id: number;
  name: string;
  age: number;
  profession: string;
  timeframe: string;
  beforeImage: string;
  afterImage: string;
  results: {
    weightLoss: string;
    muscleLoss: string;
    bodyFat: string;
  };
  quote: string;
}

const TransformationGallery = () => {
  const [transformations, setTransformations] = useState<Transformation[]>([]);

  useEffect(() => {
    // Load transformations from localStorage (managed by admin panel)
    const storedTransformations = localStorage.getItem('admin-transformations');
    if (storedTransformations) {
      setTransformations(JSON.parse(storedTransformations));
    } else {
      // Default transformations if none exist
      const defaultTransformations: Transformation[] = [
        {
          id: 1,
          name: "Umer Zeeshan",
          age: 29,
          profession: "Business Professional",
          timeframe: "24 weeks",
          beforeImage: "/zbefore.jpg",
          afterImage: "/zafter.jpg",
          results: {
            weightLoss: "35 kg",
            muscleLoss: "+5 kg",
            bodyFat: "-18%"
          },
          quote: "After years of struggling, I finally found a system that works. This changed my entire life!"
        },
        {
          id: 2,
          name: "Asad Samee",
          age: 35,
          profession: "Business Professional",
          timeframe: "16 weeks",
          beforeImage: "/asadbefore.jpg",
          afterImage: "/asadafter.jpg",
          results: {
            weightLoss: "14 kg",
            muscleLoss: "+3 kg",
            bodyFat: "-12%"
          },
          quote: "I'd lost hope at 120kg+. Zafeer pushed me beyond my limits and made every session worth it!"
        },
        {
          id: 3,
          name: "Abdul Wahab",
          age: 26,
          profession: "Professional",
          timeframe: "26 weeks",
          beforeImage: "/wahabbefore.jpg",
          afterImage: "/wahabafter.jpg",
          results: {
            weightLoss: "20 kg",
            muscleLoss: "+4 kg",
            bodyFat: "-15%"
          },
          quote: "Dropped 20kg and built visible muscle. I pushed past limits I didn't know existed!"
        },
        {
          id: 4,
          name: "Muhammad Abbas",
          age: 32,
          profession: "Professional",
          timeframe: "20 weeks",
          beforeImage: "/abbasbefore.jpg",
          afterImage: "/abbasafter.jpg",
          results: {
            weightLoss: "8 kg",
            muscleLoss: "+6 kg",
            bodyFat: "-5%"
          },
          quote: "Body recomp isn't just possible — it works! Fat loss and muscle gain at the same time."
        },
        {
          id: 5,
          name: "Muhammad Hashir",
          age: 22,
          profession: "Student",
          timeframe: "9 weeks",
          beforeImage: "/hashirbefore.jpg",
          afterImage: "/hashirafter.jpg",
          results: {
            weightLoss: "0 kg",
            muscleLoss: "+6 kg",
            bodyFat: "-3%"
          },
          quote: "From 58kg to 64kg in 9 weeks! Finally packing on the muscle I always wanted."
        },
        {
          id: 6,
          name: "Ali Haider",
          age: 29,
          profession: "Business Professional",
          timeframe: "12 weeks",
          beforeImage: "/alibefore.jpg",
          afterImage: "/aliafter.jpg",
          results: {
            weightLoss: "12 kg",
            muscleLoss: "+4 kg",
            bodyFat: "-10%"
          },
          quote: "Broke the cycle of inconsistency. Now I genuinely enjoy training and feel confident!"
        },
        {
          id: 7,
          name: "Talha",
          age: 30,
          profession: "Professional",
          timeframe: "12 weeks",
          beforeImage: "https://coachzafeer.com/Talhabefore.jpg",
          afterImage: "https://coachzafeer.com/Talhaafter.jpg",
          results: {
            weightLoss: "15 kg",
            muscleLoss: "+2 kg",
            bodyFat: "-12%"
          },
          quote: "3 months of dedication completely transformed my physique!"
        },
        {
          id: 8,
          name: "Musa",
          age: 23,
          profession: "Professional",
          timeframe: "28 weeks",
          beforeImage: "https://coachzafeer.com/Musabefore.jpg",
          afterImage: "https://coachzafeer.com/Musaafter.jpg",
          results: {
            weightLoss: "0 kg",
            muscleLoss: "+10 kg",
            bodyFat: "-5%"
          },
          quote: "7 months of training helped me build serious muscle mass!"
        },
        {
          id: 9,
          name: "Shehryar Arshad",
          age: 27,
          profession: "Professional",
          timeframe: "40 weeks",
          beforeImage: "https://coachzafeer.com/Shehryararshadbefore.jpg",
          afterImage: "https://coachzafeer.com/Shehryararshadafter.jpg",
          results: {
            weightLoss: "0 kg",
            muscleLoss: "+12 kg",
            bodyFat: "-8%"
          },
          quote: "10 months with Coach Zafeer packed on serious muscle!"
        }
      ];
      setTransformations(defaultTransformations);
      localStorage.setItem('admin-transformations', JSON.stringify(defaultTransformations));
    }
  }, []);

  const scrollLeft = () => {
    const container = document.getElementById('transformation-scroll');
    if (container) {
      container.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = document.getElementById('transformation-scroll');
    if (container) {
      container.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold">
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
            Real Transformations
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight text-balance px-4">
            See The Incredible
            <span className="block text-orange-500">Before & After Results</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            These aren't stock photos or fake testimonials. These are real people who followed the exact same system you'll get access to.
          </p>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-gray-600 font-medium text-sm sm:text-base">500+ verified transformations</span>
          </div>
          
          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={scrollLeft}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-orange-300 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>
            <button
              onClick={scrollRight}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-orange-300 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative">
          <div
            id="transformation-scroll"
            className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {transformations.map((transformation) => (
              <div
                key={transformation.id}
                className="flex-shrink-0 w-80 sm:w-96 bg-white rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100 overflow-hidden"
              >
                {/* Before/After Images */}
                <div className="relative">
                  <div className="grid grid-cols-2 gap-0">
                    {/* Before Image */}
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img
                        src={transformation.beforeImage}
                        alt={`${transformation.name} before transformation`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        BEFORE
                      </div>
                    </div>
                    
                    {/* After Image */}
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img
                        src={transformation.afterImage}
                        alt={`${transformation.name} after transformation`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        AFTER
                      </div>
                    </div>
                  </div>
                  
                  {/* Timeframe Badge */}
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                    {transformation.timeframe}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  {/* Client Info */}
                  <div className="space-y-1 sm:space-y-2">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">{transformation.name}</h3>
                    <p className="text-gray-600 font-medium text-sm">
                      {transformation.profession} • Age {transformation.age}
                    </p>
                  </div>

                  {/* Results Grid */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <div className="text-center">
                      <div className="text-lg sm:text-xl font-black text-red-600">{transformation.results.weightLoss}</div>
                      <div className="text-xs text-gray-600 font-medium">Weight Lost</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg sm:text-xl font-black text-green-600">{transformation.results.muscleLoss}</div>
                      <div className="text-xs text-gray-600 font-medium">Muscle</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg sm:text-xl font-black text-blue-600">{transformation.results.bodyFat}</div>
                      <div className="text-xs text-gray-600 font-medium">Body Fat</div>
                    </div>
                  </div>

                  {/* Quote */}
                  <blockquote className="text-gray-700 italic text-sm leading-relaxed">
                    "{transformation.quote}"
                  </blockquote>

                  {/* Rating */}
                  <div className="flex items-center gap-2 pt-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 font-medium">Verified Result</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Gradient Overlays for Scroll Indication */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 sm:mt-16 space-y-4 sm:space-y-6">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-orange-200 max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              Ready to Be Our Next Success Story?
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
              These transformations happened in 10-18 weeks. Imagine where you could be by this time next year if you start today.
            </p>
            <a href="https://coachzafeer.onethread.cloud/f/hnh-booking" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl inline-block">
              Start Your Transformation Now
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default TransformationGallery;