import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Shield, X, ZoomIn } from 'lucide-react';

interface Testimonial {
  name: string;
  title: string;
  age: number;
  results: string;
  timeframe: string;
  beforeImage: string;
  afterImage: string;
  story: string;
  featured: boolean;
  rating: number;
}

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; type: 'before' | 'after' } | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    // Load testimonials from localStorage (managed by admin panel)
    const storedTestimonials = localStorage.getItem('admin-testimonials');
    if (storedTestimonials) {
      setTestimonials(JSON.parse(storedTestimonials));
    } else {
      // Default testimonials if none exist
      const defaultTestimonials: Testimonial[] = [
        {
          name: "Umer Zeeshan",
          title: "Business Professional",
          age: 29,
          results: "Lost 35 kg • Built lean muscle",
          timeframe: "24 weeks",
          beforeImage: "/zbefore.jpg",
          afterImage: "/zafter.jpg",
          story: "After years of struggling with my weight and trying every diet, I finally found a system that works. In 6 months, I lost 35kg and built the lean, strong physique I always wanted. The transformation changed not just my body, but my entire life.",
          featured: true,
          rating: 5
        },
        {
          name: "Asad Samee",
          title: "Business Professional", 
          age: 28,
          results: "Lost 14 kg • Built significant muscle",
          timeframe: "16 weeks",
          beforeImage: "/asadbefore.jpg",
          afterImage: "/asadafter.jpg",
          story: "By the end of 2024, I'd lost hope of ever getting back in shape at over 120kg. After reaching out to Zafeer, I've lost 14kg of fat, built muscle, and found a coach who pushed me beyond my limits and made every session worth looking forward to.",
          featured: false,
          rating: 5
        },
        {
          name: "Muhammad Abbas",
          title: "Professional",
          age: 32,
          results: "Lost 5% body fat • Added muscle mass",
          timeframe: "20 weeks",
          beforeImage: "/abbasbefore.jpg",
          afterImage: "/abbasafter.jpg",
          story: "Over five months of dedicated body recomposition training, I dropped 5% body fat while adding noticeable muscle mass. My journey proves that with the right plan, body recomp isn't just possible — it works, delivering fat loss and muscle gain at the same time.",
          featured: false,
          rating: 5
        },
        {
          name: "Muhammad Hashir",
          title: "Student",
          age: 22,
          results: "Gained 6 kg muscle • 58kg to 64kg",
          timeframe: "9 weeks",
          beforeImage: "/hashirbefore.jpg",
          afterImage: "/hashirafter.jpg",
          story: "Starting at just 58kg, I struggled to put on size no matter what I tried. In only nine weeks of focused training and proper nutrition, I am now at 64kg — finally packing on quality muscle and shaping the physique I always wanted. This transformation shows what's possible with the right guidance and consistency.",
          featured: false,
          rating: 5
        },
        {
          name: "Ali Haider",
          title: "Business Professional",
          age: 29,
          results: "Lost fat • Built lean muscle",
          timeframe: "12 weeks",
          beforeImage: "/alibefore.jpg",
          afterImage: "/aliafter.jpg",
          story: "Before coaching, I was stuck in a cycle of inconsistency—eating wrong, training without structure, and getting nowhere. A few months later, I've dropped fat, built lean muscle, and, for the first time, genuinely enjoy training and feel confident in my own skin. The diet was sustainable, the training was challenging yet effective, and every adjustment pushed me closer to my goal. This transformation wasn't just physical—it was mental, leaving me more focused, disciplined, and proud than ever.",
          featured: false,
          rating: 5
        },
        {
          name: "Abdul Wahab",
          title: "Professional",
          age: 26,
          results: "Lost 20 kg • Built visible muscle",
          timeframe: "26 weeks",
          beforeImage: "/wahabbefore.jpg",
          afterImage: "/wahabafter.jpg",
          story: "In just two and a half months, I achieved a transformation I never thought possible—dropping 20KGs fat in 6 Months, building visible muscle, and feeling stronger every single week. The plan was clear, realistic, and designed specifically for me, and with the coach's guidance, I pushed past limits I didn't even know existed.",
          featured: true,
          rating: 5
        }
      ];
      setTestimonials(defaultTestimonials);
      localStorage.setItem('admin-testimonials', JSON.stringify(defaultTestimonials));
    }
  }, []);

  // Auto-swipe functionality
  useEffect(() => {
    if (!isAutoPlaying || testimonials.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
  };

  // Resume auto-play after 10 seconds of inactivity
  useEffect(() => {
    if (!isAutoPlaying) {
      const timeout = setTimeout(() => {
        setIsAutoPlaying(true);
      }, 10000);
      return () => clearTimeout(timeout);
    }
  }, [isAutoPlaying]);

  const openImageModal = (src: string, alt: string, type: 'before' | 'after') => {
    setSelectedImage({ src, alt, type });
    setIsAutoPlaying(false);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setIsAutoPlaying(true);
  };

  return (
    <section id="testimonials" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 rounded-full px-3 py-1.5 text-xs font-semibold">
            <Star className="w-3 h-3" />
            Client Success Stories
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 leading-tight text-balance px-2">
            Real People, Real Results
            <span className="block text-orange-500 mt-1">Real Transformations</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            Don't just take my word for it. Here's what busy professionals just like you are saying about their transformations:
          </p>
        </div>

        {/* Main Testimonial Slider */}
        <div className="relative max-w-5xl mx-auto mb-8 sm:mb-12">
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
            {/* Mobile View - Single Testimonial */}
            <div className="block lg:hidden">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                      {/* Mobile-First Layout */}
                      <div className="flex flex-col">
                        {/* Before/After Images Section - Mobile First */}
                        <div className="relative">
                          <div className="grid grid-cols-2 gap-0">
                            {/* Before Image */}
                            <div className="relative aspect-[3/4] overflow-hidden group cursor-pointer" onClick={() => openImageModal(testimonial.beforeImage, `${testimonial.name} before transformation`, 'before')}>
                              <img
                                src={testimonial.beforeImage}
                                alt={`${testimonial.name} before transformation`}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                BEFORE
                              </div>
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                                <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              </div>
                            </div>
                            
                            {/* After Image */}
                            <div className="relative aspect-[3/4] overflow-hidden group cursor-pointer" onClick={() => openImageModal(testimonial.afterImage, `${testimonial.name} after transformation`, 'after')}>
                              <img
                                src={testimonial.afterImage}
                                alt={`${testimonial.name} after transformation`}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                AFTER
                              </div>
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                                <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              </div>
                            </div>
                          </div>
                          
                          {/* Non-overlapping Badges */}
                          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1">
                            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                              {testimonial.timeframe}
                            </div>
                            {testimonial.featured && (
                              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                                ⭐ FEATURED
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Content Section - Mobile Optimized */}
                        <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                          {/* Results Badge */}
                          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg px-3 py-2 text-center shadow-lg">
                            <div className="font-black text-sm sm:text-base">{testimonial.results}</div>
                            <div className="text-xs opacity-90">in {testimonial.timeframe}</div>
                          </div>

                          {/* Rating */}
                          <div className="flex items-center justify-center gap-2">
                            <div className="flex">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <span className="text-gray-500 font-medium text-xs">Verified Result</span>
                          </div>

                          {/* Client Info */}
                          <div className="text-center space-y-1">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900">{testimonial.name}</h3>
                            <p className="text-gray-600 font-medium text-sm">{testimonial.title} • Age {testimonial.age}</p>
                          </div>

                          {/* Quote */}
                          <div className="relative">
                            <Quote className="absolute -top-1 -left-1 w-6 h-6 text-orange-400/30" />
                            <blockquote className="text-sm sm:text-base text-gray-700 leading-relaxed pl-4 italic text-center">
                              "{testimonial.story}"
                            </blockquote>
                          </div>

                          {/* CTA */}
                          <div className="text-center pt-2">
                            <a href="https://crm.coachzafeer.com" className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-sm px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                              Start Your Transformation
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop View - 3 Testimonials */}
            <div className="hidden lg:block">
              {testimonials.length > 0 && (
                <div className="grid grid-cols-3 gap-6">
                  {(() => {
                    const visibleTestimonials = [];
                    for (let i = 0; i < 3; i++) {
                      const index = (currentSlide + i) % testimonials.length;
                      visibleTestimonials.push(testimonials[index]);
                    }
                    return visibleTestimonials.map((testimonial, index) => (
                      <div key={`${currentSlide}-${index}`} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transform transition-all duration-500 hover:scale-105">
                        {/* Desktop Layout */}
                        <div className="flex flex-col h-full">
                          {/* Before/After Images Section */}
                          <div className="relative">
                            <div className="grid grid-cols-2 gap-0">
                              {/* Before Image */}
                              <div className="relative aspect-[3/4] overflow-hidden group cursor-pointer" onClick={() => openImageModal(testimonial.beforeImage, `${testimonial.name} before transformation`, 'before')}>
                                <img
                                  src={testimonial.beforeImage}
                                  alt={`${testimonial.name} before transformation`}
                                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                  BEFORE
                                </div>
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                                  <ZoomIn className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                              </div>
                              
                              {/* After Image */}
                              <div className="relative aspect-[3/4] overflow-hidden group cursor-pointer" onClick={() => openImageModal(testimonial.afterImage, `${testimonial.name} after transformation`, 'after')}>
                                <img
                                  src={testimonial.afterImage}
                                  alt={`${testimonial.name} after transformation`}
                                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                  AFTER
                                </div>
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                                  <ZoomIn className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                              </div>
                            </div>
                            
                            {/* Non-overlapping Badges */}
                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1">
                              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                                {testimonial.timeframe}
                              </div>
                              {testimonial.featured && (
                                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                                  ⭐ FEATURED
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Content Section - Desktop Optimized */}
                          <div className="p-6 space-y-4 flex-1 flex flex-col">
                            {/* Results Badge */}
                            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg px-3 py-2 text-center shadow-lg">
                              <div className="font-black text-base">{testimonial.results}</div>
                              <div className="text-xs opacity-90">in {testimonial.timeframe}</div>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center justify-center gap-2">
                              <div className="flex">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                              <span className="text-gray-500 font-medium text-xs">Verified Result</span>
                            </div>

                            {/* Client Info */}
                            <div className="text-center space-y-1">
                              <h3 className="text-xl font-bold text-gray-900">{testimonial.name}</h3>
                              <p className="text-gray-600 font-medium text-sm">{testimonial.title} • Age {testimonial.age}</p>
                            </div>

                            {/* Quote */}
                            <div className="relative flex-1">
                              <Quote className="absolute -top-1 -left-1 w-6 h-6 text-orange-400/30" />
                              <blockquote className="text-sm text-gray-700 leading-relaxed pl-4 italic text-center">
                                "{testimonial.story.length > 150 ? testimonial.story.substring(0, 150) + '...' : testimonial.story}"
                              </blockquote>
                            </div>

                            {/* CTA */}
                            <div className="text-center pt-2">
                              <a href="https://crm.coachzafeer.com" className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-sm px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                                Start Your Transformation
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              )}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 lg:left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-orange-300 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg z-10"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 lg:right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-orange-300 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg z-10"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-600" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center space-x-1 mb-8 sm:mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-gradient-to-r from-orange-400 to-red-400 w-6' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-xl mb-8 sm:mb-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
            {[
              { number: "500+", label: "Success Stories", sublabel: "Verified Results" },
              { number: "8,500+", label: "Pounds Lost", sublabel: "Total Client Results" },
              { number: "12+", label: "Years Experience", sublabel: "Elite Training" },
              { number: "4.9/5", label: "Client Rating", sublabel: "200+ Reviews" }
            ].map((stat, index) => (
              <div key={index} className="space-y-1 sm:space-y-2">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-gray-900 font-bold text-sm sm:text-base">{stat.label}</div>
                <div className="text-gray-600 text-xs">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantee Section */}
        <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-green-200 shadow-xl">
          <div className="text-center space-y-3 sm:space-y-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-xl">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            
            <div className="space-y-2 sm:space-y-3">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900">90-Day Results Guarantee</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed max-w-3xl mx-auto px-2">
                I'm so confident in my system that I offer a complete 90-day money-back guarantee. 
                Follow the program as outlined, and if you don't see dramatic improvements in your body 
                composition, energy levels, and overall confidence, I'll refund every penny. No questions asked.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-gray-600 pt-3 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span className="font-medium">90-day guarantee</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span className="font-medium">No questions asked</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span className="font-medium">Full refund</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 sm:p-8" onClick={closeImageModal}>
          <div className="relative max-w-2xl max-h-[90vh] w-full flex flex-col">
            {/* Close Button - Mobile Optimized */}
            <button
              onClick={closeImageModal}
              className="absolute -top-12 sm:-top-16 right-0 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-200 z-10"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            
            {/* Navigation Arrows for Image Swiping */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                const currentTestimonial = testimonials.find(t => 
                  t.beforeImage === selectedImage.src || t.afterImage === selectedImage.src
                );
                if (currentTestimonial) {
                  // Toggle between before and after of the same testimonial
                  if (selectedImage.type === 'before') {
                    setSelectedImage({ 
                      src: currentTestimonial.afterImage, 
                      alt: `${currentTestimonial.name} after transformation`, 
                      type: 'after' 
                    });
                  } else {
                    setSelectedImage({ 
                      src: currentTestimonial.beforeImage, 
                      alt: `${currentTestimonial.name} before transformation`, 
                      type: 'before' 
                    });
                  }
                }
              }}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-200 z-10"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                const currentTestimonial = testimonials.find(t => 
                  t.beforeImage === selectedImage.src || t.afterImage === selectedImage.src
                );
                if (currentTestimonial) {
                  // Toggle between before and after of the same testimonial
                if (selectedImage.type === 'before') {
                    setSelectedImage({ 
                      src: currentTestimonial.afterImage, 
                      alt: `${currentTestimonial.name} after transformation`, 
                      type: 'after' 
                    });
                } else {
                    setSelectedImage({ 
                      src: currentTestimonial.beforeImage, 
                      alt: `${currentTestimonial.name} before transformation`, 
                      type: 'before' 
                    });
                  }
                }
              }}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-200 z-10"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            
            {/* Image Container */}
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-full object-contain rounded-xl max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Image Label */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
              {selectedImage.type === 'before' ? 'BEFORE' : 'AFTER'} Photo
            </div>
            
            {/* Swipe Indicator for Mobile */}
            <div className="block sm:hidden absolute bottom-16 left-1/2 transform -translate-x-1/2 text-white/70 text-xs text-center">
              <div className="flex items-center gap-2">
                <ChevronLeft className="w-3 h-3" />
                <span>Tap to toggle Before/After</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;