import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Upload, 
  Video, 
  Star, 
  User, 
  MessageSquare,
  Image,
  FileText,
  Eye,
  EyeOff
} from 'lucide-react';

interface VideoReview {
  id: number;
  name: string;
  title: string;
  results: string;
  timeframe: string;
  wistiaId: string;
  thumbnail: string;
  featured: boolean;
}

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

interface AdminPanelProps {
  currentUser: { id: string; name: string; email: string; role: string };
}

const AdminPanel: React.FC<AdminPanelProps> = ({ currentUser }) => {
  const [activeTab, setActiveTab] = useState('video-reviews');
  const [videoReviews, setVideoReviews] = useState<VideoReview[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [transformations, setTransformations] = useState<Transformation[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [modalType, setModalType] = useState<'video' | 'testimonial' | 'transformation'>('video');
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form states
  const [videoForm, setVideoForm] = useState({
    name: '',
    title: '',
    results: '',
    timeframe: '',
    wistiaId: '',
    thumbnail: '',
    featured: false
  });

  const [testimonialForm, setTestimonialForm] = useState({
    name: '',
    title: '',
    age: 25,
    results: '',
    timeframe: '',
    beforeImage: '',
    afterImage: '',
    story: '',
    featured: false,
    rating: 5
  });

  const [transformationForm, setTransformationForm] = useState({
    name: '',
    age: 25,
    profession: '',
    timeframe: '',
    beforeImage: '',
    afterImage: '',
    weightLoss: '',
    muscleLoss: '',
    bodyFat: '',
    quote: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  // Image upload handler
  const handleImageUpload = async (file: File, imageType: 'beforeImage' | 'afterImage' | 'thumbnail') => {
    if (!file) return;
    
    setUploadingImage(true);
    
    try {
      // Create a unique filename
      const timestamp = Date.now();
      const extension = file.name.split('.').pop();
      const filename = `${imageType}_${timestamp}.${extension}`;
      
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('filename', filename);
      
      // In a real implementation, you would upload to your server
      // For now, we'll create a local URL and simulate the upload
      const imageUrl = URL.createObjectURL(file);
      
      // Store the image reference (in a real app, this would be the server response)
      const publicPath = `/${filename}`;
      
      // Update the appropriate form based on modal type
      if (modalType === 'video') {
        setVideoForm(prev => ({ ...prev, thumbnail: publicPath }));
      } else if (modalType === 'testimonial') {
        setTestimonialForm(prev => ({ ...prev, [imageType]: publicPath }));
      } else if (modalType === 'transformation') {
        setTransformationForm(prev => ({ ...prev, [imageType]: publicPath }));
      }
      
      // In a real implementation, you would save the file to the public folder
      // This would typically be done on the server side
      console.log(`Image uploaded: ${filename}`);
      
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  // File input component
  const ImageUploadField = ({ 
    label, 
    currentValue, 
    imageType, 
    required = false 
  }: { 
    label: string; 
    currentValue: string; 
    imageType: 'beforeImage' | 'afterImage' | 'thumbnail'; 
    required?: boolean;
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="space-y-3">
        {/* Current image preview */}
        {currentValue && (
          <div className="relative w-24 h-32 rounded-lg overflow-hidden border border-gray-300">
            <img
              src={currentValue}
              alt={label}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        {/* Upload button */}
        <div className="flex gap-2">
          <label className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors">
            <Upload className="w-4 h-4" />
            {uploadingImage ? 'Uploading...' : 'Upload Image'}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file, imageType);
              }}
              className="hidden"
              disabled={uploadingImage}
            />
          </label>
          
          {/* Manual URL input as fallback */}
          <button
            type="button"
            onClick={() => {
              const url = prompt('Enter image URL:');
              if (url) {
                if (modalType === 'video') {
                  setVideoForm(prev => ({ ...prev, thumbnail: url }));
                } else if (modalType === 'testimonial') {
                  setTestimonialForm(prev => ({ ...prev, [imageType]: url }));
                } else if (modalType === 'transformation') {
                  setTransformationForm(prev => ({ ...prev, [imageType]: url }));
                }
              }
            }}
            className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FileText className="w-4 h-4" />
            URL
          </button>
        </div>
        
        {/* URL display */}
        {currentValue && (
          <input
            type="text"
            value={currentValue}
            onChange={(e) => {
              const value = e.target.value;
              if (modalType === 'video') {
                setVideoForm(prev => ({ ...prev, thumbnail: value }));
              } else if (modalType === 'testimonial') {
                setTestimonialForm(prev => ({ ...prev, [imageType]: value }));
              } else if (modalType === 'transformation') {
                setTransformationForm(prev => ({ ...prev, [imageType]: value }));
              }
            }}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Image URL"
          />
        )}
      </div>
    </div>
  );
  const loadData = () => {
    // Load video reviews
    const storedVideoReviews = localStorage.getItem('admin-video-reviews');
    if (storedVideoReviews) {
      setVideoReviews(JSON.parse(storedVideoReviews));
    } else {
      // Initialize with default data
      const defaultVideoReviews: VideoReview[] = [
        {
          id: 1,
          name: "Marcus Johnson",
          title: "CEO, Tech Startup",
          results: "Lost 28 lbs • Gained 12 lbs muscle",
          timeframe: "12 weeks",
          wistiaId: "xyz789abc123",
          thumbnail: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600&h=800",
          featured: true
        },
        {
          id: 2,
          name: "Sarah Mitchell",
          title: "Marketing Director & Mother of 2",
          results: "Lost 35 lbs • Size 14 to Size 8",
          timeframe: "16 weeks",
          wistiaId: "def456ghi789",
          thumbnail: "https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=600&h=800",
          featured: false
        }
      ];
      setVideoReviews(defaultVideoReviews);
      localStorage.setItem('admin-video-reviews', JSON.stringify(defaultVideoReviews));
    }

    // Load testimonials
    const storedTestimonials = localStorage.getItem('admin-testimonials');
    if (storedTestimonials) {
      setTestimonials(JSON.parse(storedTestimonials));
    } else {
      // Initialize with default data
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
        }
      ];
      setTestimonials(defaultTestimonials);
      localStorage.setItem('admin-testimonials', JSON.stringify(defaultTestimonials));
    }

    // Load transformations
    const storedTransformations = localStorage.getItem('admin-transformations');
    if (storedTransformations) {
      setTransformations(JSON.parse(storedTransformations));
    } else {
      // Initialize with default data
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
        }
      ];
      setTransformations(defaultTransformations);
      localStorage.setItem('admin-transformations', JSON.stringify(defaultTransformations));
    }
  };

  const saveVideoReviews = (data: VideoReview[]) => {
    setVideoReviews(data);
    localStorage.setItem('admin-video-reviews', JSON.stringify(data));
  };

  const saveTestimonials = (data: Testimonial[]) => {
    setTestimonials(data);
    localStorage.setItem('admin-testimonials', JSON.stringify(data));
  };

  const saveTransformations = (data: Transformation[]) => {
    setTransformations(data);
    localStorage.setItem('admin-transformations', JSON.stringify(data));
  };

  const openModal = (type: 'video' | 'testimonial' | 'transformation', item?: any) => {
    setModalType(type);
    setEditingItem(item);
    
    if (type === 'video') {
      if (item) {
        setVideoForm(item);
      } else {
        setVideoForm({
          name: '',
          title: '',
          results: '',
          timeframe: '',
          wistiaId: '',
          thumbnail: '',
          featured: false
        });
      }
    } else if (type === 'testimonial') {
      if (item) {
        setTestimonialForm(item);
      } else {
        setTestimonialForm({
          name: '',
          title: '',
          age: 25,
          results: '',
          timeframe: '',
          beforeImage: '',
          afterImage: '',
          story: '',
          featured: false,
          rating: 5
        });
      }
    } else if (type === 'transformation') {
      if (item) {
        setTransformationForm({
          name: item.name,
          age: item.age,
          profession: item.profession,
          timeframe: item.timeframe,
          beforeImage: item.beforeImage,
          afterImage: item.afterImage,
          weightLoss: item.results.weightLoss,
          muscleLoss: item.results.muscleLoss,
          bodyFat: item.results.bodyFat,
          quote: item.quote
        });
      } else {
        setTransformationForm({
          name: '',
          age: 25,
          profession: '',
          timeframe: '',
          beforeImage: '',
          afterImage: '',
          weightLoss: '',
          muscleLoss: '',
          bodyFat: '',
          quote: ''
        });
      }
    }
    
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (modalType === 'video') {
      if (editingItem) {
        // Update existing video
        const updatedVideos = videoReviews.map(video =>
          video.id === editingItem.id ? { ...videoForm, id: editingItem.id } : video
        );
        saveVideoReviews(updatedVideos);
      } else {
        // Add new video
        const newVideo = {
          ...videoForm,
          id: Math.max(...videoReviews.map(v => v.id), 0) + 1
        };
        saveVideoReviews([...videoReviews, newVideo]);
      }
    } else if (modalType === 'testimonial') {
      if (editingItem) {
        // Update existing testimonial
        const updatedTestimonials = testimonials.map((testimonial, index) =>
          index === editingItem.index ? testimonialForm : testimonial
        );
        saveTestimonials(updatedTestimonials);
      } else {
        // Add new testimonial
        saveTestimonials([...testimonials, testimonialForm]);
      }
    } else if (modalType === 'transformation') {
      const transformationData = {
        id: editingItem ? editingItem.id : Math.max(...transformations.map(t => t.id), 0) + 1,
        name: transformationForm.name,
        age: transformationForm.age,
        profession: transformationForm.profession,
        timeframe: transformationForm.timeframe,
        beforeImage: transformationForm.beforeImage,
        afterImage: transformationForm.afterImage,
        results: {
          weightLoss: transformationForm.weightLoss,
          muscleLoss: transformationForm.muscleLoss,
          bodyFat: transformationForm.bodyFat
        },
        quote: transformationForm.quote
      };

      if (editingItem) {
        // Update existing transformation
        const updatedTransformations = transformations.map(transformation =>
          transformation.id === editingItem.id ? transformationData : transformation
        );
        saveTransformations(updatedTransformations);
      } else {
        // Add new transformation
        saveTransformations([...transformations, transformationData]);
      }
    }
    
    closeModal();
  };

  const handleDelete = (type: 'video' | 'testimonial' | 'transformation', id: number | string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    if (type === 'video') {
      const updatedVideos = videoReviews.filter(video => video.id !== id);
      saveVideoReviews(updatedVideos);
    } else if (type === 'testimonial') {
      const updatedTestimonials = testimonials.filter((_, index) => index !== id);
      saveTestimonials(updatedTestimonials);
    } else if (type === 'transformation') {
      const updatedTransformations = transformations.filter(transformation => transformation.id !== id);
      saveTransformations(updatedTransformations);
    }
  };

  const toggleFeatured = (type: 'video' | 'testimonial', id: number | string) => {
    if (type === 'video') {
      const updatedVideos = videoReviews.map(video =>
        video.id === id ? { ...video, featured: !video.featured } : video
      );
      saveVideoReviews(updatedVideos);
    } else if (type === 'testimonial') {
      const updatedTestimonials = testimonials.map((testimonial, index) =>
        index === id ? { ...testimonial, featured: !testimonial.featured } : testimonial
      );
      saveTestimonials(updatedTestimonials);
    }
  };

  // Check if user has admin access
  if (currentUser.role !== 'admin') {
    return (
      <div className="text-center py-12">
        <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Admin Access Required</h3>
        <p className="text-gray-600">You need admin privileges to access the content management panel.</p>
      </div>
    );
  }

  const tabs = [
    { id: 'video-reviews', name: 'Video Reviews', icon: Video, count: videoReviews.length },
    { id: 'testimonials', name: 'Testimonials', icon: MessageSquare, count: testimonials.length },
    { id: 'transformations', name: 'Transformations', icon: Image, count: transformations.length }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Content Management</h2>
        <p className="text-gray-600">Manage videos, testimonials, transformations, and other content</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {tab.name}
                <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                  activeTab === tab.id
                    ? 'bg-orange-100 text-orange-600'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Video Reviews Tab */}
      {activeTab === 'video-reviews' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Video Reviews</h3>
            <button
              onClick={() => openModal('video')}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
              Add Video Review
            </button>
          </div>

          <div className="grid gap-4">
            {videoReviews.map((video) => (
              <div key={video.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <img
                      src={video.thumbnail}
                      alt={video.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-900">{video.name}</h4>
                        {video.featured && (
                          <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full">
                            FEATURED
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm">{video.title}</p>
                      <p className="text-green-600 font-medium text-sm">{video.results}</p>
                      <p className="text-gray-500 text-xs">Wistia ID: {video.wistiaId}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleFeatured('video', video.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        video.featured ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600'
                      }`}
                      title="Toggle Featured"
                    >
                      <Star className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openModal('video', video)}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete('video', video.id)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Testimonials Tab */}
      {activeTab === 'testimonials' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Testimonials</h3>
            <button
              onClick={() => openModal('testimonial')}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
              Add Testimonial
            </button>
          </div>

          <div className="grid gap-4">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="flex gap-2">
                      <img
                        src={testimonial.beforeImage}
                        alt={`${testimonial.name} before`}
                        className="w-16 h-20 rounded-lg object-cover"
                      />
                      <img
                        src={testimonial.afterImage}
                        alt={`${testimonial.name} after`}
                        className="w-16 h-20 rounded-lg object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        {testimonial.featured && (
                          <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full">
                            FEATURED
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm">{testimonial.title} • Age {testimonial.age}</p>
                      <p className="text-green-600 font-medium text-sm">{testimonial.results}</p>
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleFeatured('testimonial', index)}
                      className={`p-2 rounded-lg transition-colors ${
                        testimonial.featured ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600'
                      }`}
                      title="Toggle Featured"
                    >
                      <Star className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openModal('testimonial', { ...testimonial, index })}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete('testimonial', index)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Transformations Tab */}
      {activeTab === 'transformations' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Transformations</h3>
            <button
              onClick={() => openModal('transformation')}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
              Add Transformation
            </button>
          </div>

          <div className="grid gap-4">
            {transformations.map((transformation) => (
              <div key={transformation.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="flex gap-2">
                      <img
                        src={transformation.beforeImage}
                        alt={`${transformation.name} before`}
                        className="w-16 h-20 rounded-lg object-cover"
                      />
                      <img
                        src={transformation.afterImage}
                        alt={`${transformation.name} after`}
                        className="w-16 h-20 rounded-lg object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900">{transformation.name}</h4>
                      <p className="text-gray-600 text-sm">{transformation.profession} • Age {transformation.age}</p>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <span className="text-red-600 font-medium">{transformation.results.weightLoss}</span>
                        <span className="text-green-600 font-medium">{transformation.results.muscleLoss}</span>
                        <span className="text-blue-600 font-medium">{transformation.results.bodyFat}</span>
                      </div>
                      <p className="text-gray-500 text-xs italic">"{transformation.quote.substring(0, 50)}..."</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openModal('transformation', transformation)}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete('transformation', transformation.id)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingItem ? 'Edit' : 'Add'} {modalType === 'video' ? 'Video Review' : modalType === 'testimonial' ? 'Testimonial' : 'Transformation'}
                </h3>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {modalType === 'video' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        value={videoForm.name}
                        onChange={(e) => setVideoForm({ ...videoForm, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <input
                        type="text"
                        value={videoForm.title}
                        onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Results</label>
                      <input
                        type="text"
                        value={videoForm.results}
                        onChange={(e) => setVideoForm({ ...videoForm, results: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Lost 28 lbs • Gained 12 lbs muscle"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Timeframe</label>
                      <input
                        type="text"
                        value={videoForm.timeframe}
                        onChange={(e) => setVideoForm({ ...videoForm, timeframe: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="12 weeks"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Wistia Video ID</label>
                    <input
                      type="text"
                      value={videoForm.wistiaId}
                      onChange={(e) => setVideoForm({ ...videoForm, wistiaId: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="xyz789abc123"
                      required
                    />
                  </div>
                  <ImageUploadField
                    label="Thumbnail Image"
                    currentValue={videoForm.thumbnail}
                    imageType="thumbnail"
                    required
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={videoForm.featured}
                      onChange={(e) => setVideoForm({ ...videoForm, featured: e.target.checked })}
                      className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <label htmlFor="featured" className="text-sm font-medium text-gray-700">Featured Video</label>
                  </div>
                </>
              )}

              {modalType === 'testimonial' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        value={testimonialForm.name}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <input
                        type="text"
                        value={testimonialForm.title}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, title: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                      <input
                        type="number"
                        value={testimonialForm.age}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, age: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Timeframe</label>
                      <input
                        type="text"
                        value={testimonialForm.timeframe}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, timeframe: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="24 weeks"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                      <select
                        value={testimonialForm.rating}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        {[1, 2, 3, 4, 5].map(rating => (
                          <option key={rating} value={rating}>{rating} Star{rating !== 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Results</label>
                    <input
                      type="text"
                      value={testimonialForm.results}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, results: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Lost 35 kg • Built lean muscle"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <ImageUploadField
                      label="Before Image"
                      currentValue={testimonialForm.beforeImage}
                      imageType="beforeImage"
                      required
                    />
                    <ImageUploadField
                      label="After Image"
                      currentValue={testimonialForm.afterImage}
                      imageType="afterImage"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Story</label>
                    <textarea
                      value={testimonialForm.story}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, story: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="testimonial-featured"
                      checked={testimonialForm.featured}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, featured: e.target.checked })}
                      className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <label htmlFor="testimonial-featured" className="text-sm font-medium text-gray-700">Featured Testimonial</label>
                  </div>
                </>
              )}

              {modalType === 'transformation' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        value={transformationForm.name}
                        onChange={(e) => setTransformationForm({ ...transformationForm, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Profession</label>
                      <input
                        type="text"
                        value={transformationForm.profession}
                        onChange={(e) => setTransformationForm({ ...transformationForm, profession: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                      <input
                        type="number"
                        value={transformationForm.age}
                        onChange={(e) => setTransformationForm({ ...transformationForm, age: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Timeframe</label>
                      <input
                        type="text"
                        value={transformationForm.timeframe}
                        onChange={(e) => setTransformationForm({ ...transformationForm, timeframe: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="24 weeks"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <ImageUploadField
                      label="Before Image"
                      currentValue={transformationForm.beforeImage}
                      imageType="beforeImage"
                      required
                    />
                    <ImageUploadField
                      label="After Image"
                      currentValue={transformationForm.afterImage}
                      imageType="afterImage"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Weight Loss</label>
                      <input
                        type="text"
                        value={transformationForm.weightLoss}
                        onChange={(e) => setTransformationForm({ ...transformationForm, weightLoss: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="35 kg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Muscle Gain</label>
                      <input
                        type="text"
                        value={transformationForm.muscleLoss}
                        onChange={(e) => setTransformationForm({ ...transformationForm, muscleLoss: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="+5 kg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Body Fat</label>
                      <input
                        type="text"
                        value={transformationForm.bodyFat}
                        onChange={(e) => setTransformationForm({ ...transformationForm, bodyFat: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="-18%"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quote</label>
                    <textarea
                      value={transformationForm.quote}
                      onChange={(e) => setTransformationForm({ ...transformationForm, quote: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>
                </>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {editingItem ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;