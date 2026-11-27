// src/components/VideoSection.tsx
import React, { useEffect } from 'react';
import { Play, CheckCircle } from 'lucide-react';

declare global {
  interface Window {
    _wq?: any[];
    sendCAPI?: (eventName: string, opts?: { event_id?: string; custom_data?: Record<string, any> }) => void;
    fbq?: (...args: any[]) => void;
  }
}

const WISTIA_ID = 'twcp0uty94'; // your Wistia hashed video ID
const VIDEO_LABEL = 'Umer Lost 35KGs in 6 Months';

const VideoSection: React.FC = () => {
  useEffect(() => {
    // Ensure the Wistia queue exists
    window._wq = window._wq || [];
    window._wq.push({
      id: WISTIA_ID,
      onReady: function (video: any) {
        let played = false;
        const fired: Record<number, boolean> = { 25: false, 50: false, 75: false, 100: false };

        const fire = (eventName: string, payload: Record<string, any>) => {
          try {
            if (typeof window.fbq === 'function') {
              window.fbq('trackCustom', eventName, payload);
            }
          } catch {}
          try {
            if (typeof window.sendCAPI === 'function') {
              window.sendCAPI(eventName, { event_id: payload.event_id, custom_data: { video: VIDEO_LABEL, ...payload } });
            }
          } catch {}
        };

        // PLAY
        video.bind('play', () => {
          if (!played) {
            played = true;
            fire('VSLPlay', {
              video: VIDEO_LABEL,
              event_id: `vsl_play_${Date.now()}_${Math.random().toString(36).slice(2)}`,
            });
          }
        });

        // PROGRESS (25/50/75)
        video.bind('secondchange', (s: number) => {
          const dur = video.duration?.() || 0;
          if (!dur) return;
          const pct = (s / dur) * 100;

          for (const m of [25, 50, 75]) {
            if (!fired[m] && pct >= m) {
              fired[m] = true;
              fire('VSLProgress', {
                video: VIDEO_LABEL,
                milestone: m,
                event_id: `vsl_${m}_${Date.now()}_${Math.random().toString(36).slice(2)}`,
              });
            }
          }
        });

        // COMPLETE (100%)
        video.bind('end', () => {
          if (!fired[100]) {
            fired[100] = true;
            const dur = Math.round(video.duration?.() || 0);
            fire('VSLCompleted', {
              video: VIDEO_LABEL,
              duration: dur,
              event_id: `vsl_100_${Date.now()}_${Math.random().toString(36).slice(2)}`,
            });
          }
        });
      },
    });
  }, []);

  return (
    <section id="vsl-section" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 sm:space-y-6 mb-8 sm:mb-12">
          <div className="space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold">
              <Play className="w-3 h-3 sm:w-4 sm:h-4" />
              Exclusive Video
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 leading-tight text-balance px-4">
              Watch How Umer Lost 35 KGs
              <span className="block text-orange-500">in Just 6 Months</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
              Discover the exact system that's helped hundreds of busy professionals achieve
              their dream physique without sacrificing their favorite foods or social life
            </p>
          </div>
        </div>

        {/* Wistia Player */}
        <div className="relative mb-8 sm:mb-12">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl max-w-4xl mx-auto">
            <div className="wistia_responsive_padding" style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
              <div className="wistia_responsive_wrapper" style={{ height: '100%', left: 0, position: 'absolute', top: 0, width: '100%' }}>
                {/* IMPORTANT: class must be wistia_async_<hashed id> */}
                <div className={`wistia_embed wistia_async_${WISTIA_ID} videoFoam=true`} style={{ height: '100%', position: 'relative', width: '100%' }}>
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
                      src={`https://fast.wistia.com/embed/medias/${WISTIA_ID}/swatch`}
                      style={{ filter: 'blur(5px)', height: '100%', objectFit: 'contain', width: '100%' }}
                      alt="Video thumbnail"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mb-8 sm:mb-12">
          <a
            href="https://coachzafeer.onethread.cloud/f/hnh-booking"
            className="group relative bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 rounded-2xl transition-all duration-300 transform hover:scale-105 premium-shadow hover:premium-glow inline-block w-full sm:w-auto max-w-md mx-auto"
          >
            <span className="flex items-center justify-center gap-3">
              <span className="text-center">Book Your Call Now</span>
              <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </a>
          <p className="text-xs sm:text-sm text-gray-500 mt-3 flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0"></span>
            Limited spots available • 90-day money-back guarantee
          </p>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-gray-100">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
            In this exclusive training, you'll discover:
          </h3>
          <div className="grid gap-3 sm:gap-4">
            {[
              "The #1 mistake that keeps you from losing fat (even with a 'perfect' diet)",
              'How to build lean muscle while losing fat simultaneously',
              "The 'Habit Stacking' method that makes nutrition completely effortless",
              'Why 90% of workout plans fail (and the 3 principles that actually work)',
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                <span className="text-gray-700 font-medium leading-relaxed text-xs sm:text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Social Proof */}
        <div className="text-center mt-6 sm:mt-8">
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-500">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span>Over 10,000 people have watched this training</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
