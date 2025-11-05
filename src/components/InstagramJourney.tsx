import React from 'react';
import { Instagram, ArrowRight, Play, Heart, MessageCircle, ExternalLink } from 'lucide-react';

const InstagramJourney = () => {
  const instagramPosts = [
    {
      id: 1,
      image: "/zbefore.jpg",
      likes: "1,234",
      comments: "87",
      caption: "🔥 TRANSFORMATION TUESDAY: Umer's incredible 35kg weight loss journey! From struggling with weight to becoming a completely new person. This is what happens when you commit to the process and trust the system. 💪 #TransformationTuesday #WeightLoss #FitnessJourney",
      isVideo: false,
      hashtags: ["#TransformationTuesday", "#WeightLoss", "#FitnessJourney"]
    },
    {
      id: 2,
      image: "/asadafter.jpg",
      likes: "2,156",
      comments: "134",
      caption: "💯 CLIENT SPOTLIGHT: Asad's incredible comeback story! Started at 120kg+ feeling hopeless, now down 14kg with visible muscle definition. Sometimes all you need is the right guidance and someone who believes in you. Never give up on your dreams! 🚀 #ClientSpotlight #NeverGiveUp #TransformationStory",
      isVideo: true,
      hashtags: ["#ClientSpotlight", "#NeverGiveUp", "#TransformationStory"]
    },
    {
      id: 3,
      image: "/hashirafter.jpg",
      likes: "987",
      comments: "56",
      caption: "🎯 LEAN BULK SUCCESS: From 58kg to 64kg in just 9 weeks! Hashir proves that with the right nutrition and training plan, you can pack on quality muscle fast. No more being the 'skinny guy' - time to own your transformation! 💪 #LeanBulk #MuscleGain #SkinnytoBeast",
      isVideo: false,
      hashtags: ["#LeanBulk", "#MuscleGain", "#SkinnytoBeast"]
    },
    {
      id: 4,
      image: "/wahabafter.jpg",
      likes: "3,245",
      comments: "198",
      caption: "🏆 FEATURED TRANSFORMATION: Wahab's incredible 20kg fat loss + muscle gain in 6 months! What started as a 'impossible dream' became reality through consistency, proper nutrition, and never missing a session. This is what dedication looks like! 🔥 #FeaturedClient #20kgDown #ConsistencyWins",
      isVideo: true,
      hashtags: ["#FeaturedClient", "#20kgDown", "#ConsistencyWins"]
    },
    {
      id: 5,
      image: "/abbasafter.jpg",
      likes: "1,876",
      comments: "92",
      caption: "🧬 BODY RECOMPOSITION MASTERCLASS: Abbas dropped 5% body fat while adding noticeable muscle mass over 5 months. This is proof that you CAN lose fat and build muscle simultaneously with the right approach. Science-based training works! 🔬 #BodyRecomp #ScienceBased #FatLossMuscleGain",
      isVideo: false,
      hashtags: ["#BodyRecomp", "#ScienceBased", "#FatLossMuscleGain"]
    },
    {
      id: 6,
      image: "/aliafter.jpg",
      likes: "2,543",
      comments: "167",
      caption: "🧠 MINDSET TRANSFORMATION: Ali went from inconsistent training and poor eating habits to becoming someone who genuinely LOVES the gym. The physical changes are obvious, but the mental transformation is what makes this permanent. Confidence level: 📈 #MindsetMatters #ConfidenceBoost #LifestyleChange",
      isVideo: false,
      hashtags: ["#MindsetMatters", "#ConfidenceBoost", "#LifestyleChange"]
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold">
            <Instagram className="w-3 h-3 sm:w-4 sm:h-4" />
            Live Instagram Feed
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
            Daily Motivation &
            <span className="block bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Real Results
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Follow along for daily transformation updates, workout tips, nutrition insights, and behind-the-scenes content from real coaching sessions
          </p>
        </div>

        {/* Instagram Embed Widget */}
        <div className="mb-12 sm:mb-16">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-100 max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Live Instagram Feed</h3>
              <p className="text-gray-600 text-sm sm:text-base">Real-time updates from @zafeersindhu</p>
            </div>
            
            {/* Instagram Embed Container */}
            <div className="instagram-embed-container">
              {/* Elfsight Instagram Widget */}
              <script src="https://static.elfsight.com/platform/platform.js" data-use-service-core defer></script>
              <div className="elfsight-app-instagram-feed" data-app-id="your-instagram-widget-id"></div>
              
              {/* Fallback for when widget is loading */}
              <div className="instagram-fallback bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-8 text-center">
                <Instagram className="w-12 h-12 text-pink-500 mx-auto mb-4" />
                <h4 className="text-lg font-bold text-gray-900 mb-2">Loading Instagram Feed...</h4>
                <p className="text-gray-600 mb-4">Getting the latest posts from @zafeersindhu</p>
                <a
                  href="https://instagram.com/zafeersindhu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 font-semibold"
                >
                  View on Instagram
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Instagram Grid */}
        <div className="text-center mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Recent Highlights</h3>
          <p className="text-gray-600">Featured transformation posts and client success stories</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 mb-8 sm:mb-12 max-w-4xl mx-auto">
          {instagramPosts.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square bg-gray-100 rounded-lg sm:rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <img
                src={post.image}
                alt="Instagram post"
                className="w-full h-full object-cover"
              />
              
              {/* Video Play Button */}
              {post.isVideo && (
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Play className="w-3 h-3 sm:w-4 sm:h-4 text-white ml-0.5" />
                  </div>
                </div>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex items-center gap-3 sm:gap-4 text-white">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-xs sm:text-sm font-semibold">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-xs sm:text-sm font-semibold">{post.comments}</span>
                  </div>
                </div>
              </div>

              {/* Caption Preview */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 sm:p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-xs leading-tight line-clamp-2">
                  {post.caption.length > 80 ? post.caption.substring(0, 80) + '...' : post.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="text-center space-y-6 sm:space-y-8">
          <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-pink-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-pink-200 max-w-3xl mx-auto">
            <div className="space-y-4 sm:space-y-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto shadow-xl">
                <Instagram className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Join 2.5K+ Followers Getting Real Results
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  Get exclusive workout videos, nutrition tips, client transformations, and behind-the-scenes content 
                  that I only share on Instagram. Plus, be the first to know about new programs and special offers.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                <a
                  href="https://instagram.com/zafeersindhu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                  Follow @ZafeerSindhu
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </a>
                
                <div className="flex items-center gap-2 text-gray-600 text-xs sm:text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Fresh content daily</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                2.5K+
              </div>
              <div className="text-gray-600 font-medium text-xs sm:text-sm">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                100K+
              </div>
              <div className="text-gray-600 font-medium text-xs sm:text-sm">Monthly Views</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Daily
              </div>
              <div className="text-gray-600 font-medium text-xs sm:text-sm">New Content</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Instagram Widget Styles */}
      <style jsx>{`
        .instagram-embed-container {
          min-height: 400px;
          position: relative;
        }
        
        .instagram-fallback {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      `}</style>
    </section>
  );
};

export default InstagramJourney;