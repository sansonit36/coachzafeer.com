import React, { useEffect, useState } from 'react';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';

export interface VideoReview {
  id: number;
  name: string;
  title: string;
  results: string;
  timeframe: string;
  wistiaId: string;
  thumbnail: string;
  featured: boolean;
}

type Props = {
  /** Optional list from your backend/admin */
  videos?: VideoReview[];
  /** Optional JSON endpoint that returns VideoReview[] */
  src?: string;
  /** Starting slide index (default 0) */
  initialSlide?: number;
};

const DEFAULT_VIDEOS: VideoReview[] = [
  {
    id: 4,
    name: 'Hamza Ali',
    title: 'Business Professional',
    results: 'Gain 10 KGs • Better Physique',
    timeframe: '8 weeks',
    wistiaId: 'si0jbo5mhy',
    thumbnail:
      'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
    featured: false,
  },
  {
    id: 1,
    name: 'Abdul Wahab',
    title: 'Freelancer',
    results: 'Lost 10 KGs • Gained 12 lbs muscle',
    timeframe: '8 weeks',
    wistiaId: 'rn0x887b84',
    thumbnail:
      'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
    featured: true,
  },{
    id: 3,
    name: 'Husnain Ghani',
    title: 'Forex Propfirm Owner',
    results: 'Lost 10 KGs • Better Energy',
    timeframe: '8 weeks',
    wistiaId: 'pzzglbvhf6',
    thumbnail:
      'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
    featured: false,
  },
  {
    id: 2,
    name: 'Nouman Ghafoor',
    title: 'Business Professional',
    results: 'Lost 4 KGs • Better Health',
    timeframe: '4 weeks',
    wistiaId: 'yffbolnppt',
    thumbnail:
      'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
    featured: false,
  },
];

const VideoReviews: React.FC<Props> = ({ videos, src, initialSlide = 0 }) => {
  const [currentSlide, setCurrentSlide] = useState(initialSlide);
  const [videoReviews, setVideoReviews] = useState<VideoReview[]>(
    videos && videos.length ? videos : DEFAULT_VIDEOS
  );

  // If a src is provided, fetch from backend (no localStorage)
  useEffect(() => {
    if (!src) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(src, { credentials: 'same-origin' });
        const data = await res.json();
        if (!cancelled && Array.isArray(data)) {
          setVideoReviews(data as VideoReview[]);
          // reset slide index safely
          setCurrentSlide(0);
        }
      } catch {
        // ignore errors; keep existing videos
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [src]);

  // If videos prop changes, use it
  useEffect(() => {
    if (videos && videos.length) {
      setVideoReviews(videos);
      setCurrentSlide(0);
    }
  }, [videos]);

  // Ensure Wistia script is on the page once
  useEffect(() => {
    const has = document.querySelector(
      'script[src*="fast.wistia.com/assets/external/E-v1.js"]'
    );
    if (!has) {
      const s = document.createElement('script');
      s.src = 'https://fast.wistia.com/assets/external/E-v1.js';
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  const count = videoReviews.length || 1;

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % count);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + count) % count);
  const goToSlide = (index: number) => setCurrentSlide(index % count);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold border border-white/20">
            <Play className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400" />
            Video Success Stories
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight text-balance">
            Watch Real Transformations
            <span className="block bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mt-2">
              In Their Own Words
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Hear directly from clients about their incredible transformation journeys
          </p>
        </div>

        {/* Video Slider */}
        <div className="relative max-w-5xl mx-auto mb-12">
          {/* Mobile View - Single Video Slider */}
          <div className="block lg:hidden">
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {videoReviews.length === 0 ? (
                  <div className="w-full flex-shrink-0">
                    <div className="aspect-[9/16] rounded-2xl sm:rounded-3xl bg-slate-800/60 flex items-center justify-center text-slate-300">
                      No videos to show
                    </div>
                  </div>
                ) : (
                  videoReviews.map((video) => (
                    <div key={video.id} className="w-full flex-shrink-0">
                      <div className="relative aspect-[9/16] bg-black rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                        {/* Wistia Video Embed */}
                        <div
                          className="wistia_responsive_padding"
                          style={{ padding: '100% 0 0 0', position: 'relative' }}
                        >
                          <div
                            className="wistia_responsive_wrapper"
                            style={{ height: '100%', left: 0, position: 'absolute', top: 0, width: '100%' }}
                          >
                            <div
                              className={`wistia_embed wistia_async_${video.wistiaId} videoFoam=true`}
                              style={{ height: '100%', position: 'relative', width: '100%' }}
                            >
                              <div
                                className="wistia_swatch"
                                style={{
                                  height: '100%',
                                  left: 0,
                                  opacity: 0,
                                  overflow: 'hidden',
                                  position: 'absolute',
                                  top: 0,
                                  transition: 'opacity 200ms',
                                  width: '100%',
                                }}
                              >
                                <img
                                  src={video.thumbnail}
                                  style={{ filter: 'blur(5px)', height: '100%', objectFit: 'cover', width: '100%' }}
                                  alt={`${video.name} video testimonial`}
                                  aria-hidden="true"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Featured Badge */}
                        {video.featured && (
                          <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full px-3 py-1 text-xs font-bold shadow-xl">
                            ⭐ FEATURED
                          </div>
                        )}

                        {/* Client Info Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                          <div className="space-y-2">
                            <h3 className="text-lg font-bold text-white">{video.name}</h3>
                            <p className="text-sm text-slate-300">{video.title}</p>
                            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg px-3 py-1 text-xs font-bold inline-block">
                              {video.results} in {video.timeframe}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Desktop View - 3 Videos Vertical */}
          <div className="hidden lg:block">
            {videoReviews.length > 0 ? (
              <div className="grid grid-cols-3 gap-6">
                {Array.from({ length: Math.min(3, videoReviews.length) }, (_, i) => {
                  const video = videoReviews[(currentSlide + i) % videoReviews.length];
                  return (
                    <div key={`${currentSlide}-${i}`} className="transform transition-all duration-500 hover:scale-105">
                      <div className="relative aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-2xl">
                        {/* Wistia Video Embed */}
                        <div
                          className="wistia_responsive_padding"
                          style={{ padding: '100% 0 0 0', position: 'relative' }}
                        >
                          <div
                            className="wistia_responsive_wrapper"
                            style={{ height: '100%', left: 0, position: 'absolute', top: 0, width: '100%' }}
                          >
                            <div
                              className={`wistia_embed wistia_async_${video.wistiaId} videoFoam=true`}
                              style={{ height: '100%', position: 'relative', width: '100%' }}
                            >
                              <div
                                className="wistia_swatch"
                                style={{
                                  height: '100%',
                                  left: 0,
                                  opacity: 0,
                                  overflow: 'hidden',
                                  position: 'absolute',
                                  top: 0,
                                  transition: 'opacity 200ms',
                                  width: '100%',
                                }}
                              >
                                <img
                                  src={video.thumbnail}
                                  style={{ filter: 'blur(5px)', height: '100%', objectFit: 'cover', width: '100%' }}
                                  alt={`${video.name} video testimonial`}
                                  aria-hidden="true"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Featured Badge */}
                        {video.featured && (
                          <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full px-3 py-1 text-xs font-bold shadow-xl">
                            ⭐ FEATURED
                          </div>
                        )}

                        {/* Client Info Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                          <div className="space-y-2">
                            <h3 className="text-lg font-bold text-white">{video.name}</h3>
                            <p className="text-sm text-slate-300">{video.title}</p>
                            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg px-3 py-1 text-xs font-bold inline-block">
                              {video.results} in {video.timeframe}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-2xl bg-slate-800/60 p-10 text-center text-slate-300">No videos to show</div>
            )}
          </div>

          {/* Navigation Arrows - Mobile Only */}
          <div className="block lg:hidden">
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
          </div>

          {/* Navigation Arrows - Desktop Only */}
          <div className="hidden lg:block">
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Slide Indicators - Mobile Only */}
        <div className="flex justify-center space-x-2 mb-8 lg:hidden">
          {videoReviews.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-gradient-to-r from-orange-400 to-red-400 w-6 sm:w-8'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Desktop Navigation Indicators */}
        <div className="hidden lg:flex justify-center space-x-2 mb-8">
          {Array.from({ length: Math.ceil((videoReviews.length || 0) / 3) }).map((_, groupIndex) => (
            <button
              key={groupIndex}
              onClick={() => goToSlide(groupIndex * 3)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                Math.floor(currentSlide / 3) === groupIndex
                  ? 'bg-gradient-to-r from-orange-400 to-red-400 w-8'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="https://crm.coachzafeer.com"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            Start Your Transformation
          </a>
        </div>
      </div>
    </section>
  );
};

export default VideoReviews;
