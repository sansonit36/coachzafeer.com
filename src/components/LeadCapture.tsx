import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle, Calendar, User, Briefcase, Target, DollarSign, Clock, Phone } from 'lucide-react';
import { leadsService } from '../services/leadsService';
import type { Lead } from '../lib/supabase';

// User journey tracking
interface JourneyStep {
  step: string;
  timestamp: string;
  data?: any;
}

const trackJourneyStep = (step: string, data?: any) => {
  const sessionId = sessionStorage.getItem('lead-session-id') || 
    Date.now().toString() + Math.random().toString(36).substr(2, 9);
  
  if (!sessionStorage.getItem('lead-session-id')) {
    sessionStorage.setItem('lead-session-id', sessionId);
  }

  const journeyStep: JourneyStep = {
    step,
    timestamp: new Date().toISOString(),
    data
  };

  const existingJourney = JSON.parse(sessionStorage.getItem('user-journey') || '[]');
  existingJourney.push(journeyStep);
  sessionStorage.setItem('user-journey', JSON.stringify(existingJourney));
};

interface FormData extends Omit<Lead, 'id' | 'created_at' | 'updated_at' | 'status' | 'notes' | 'qualified' | 'qualification_score' | 'facebook_pixel_tracked'> {
  // Personal Info
}

const LeadCapture = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    age: '',
    occupation: '',
    work_hours: '',
    income: '',
    primary_goal: '',
    timeframe: '',
    previous_experience: '',
    current_challenges: [],
    weekly_commitment: '',
    investment_range: '',
    ready_to_start: '',
    seriousness: '',
    obstacles: '',
    motivation: ''
  });

  const totalSteps = 6;

  // Track initial page load
  React.useEffect(() => {
    trackJourneyStep('form_loaded', { 
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    });
    
    // Ensure Calendly script is loaded
    if (typeof window !== 'undefined' && !window.Calendly) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = false;
      document.head.appendChild(script);
    }
  }, []);

  const updateFormData = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Track form field updates
    trackJourneyStep('form_field_updated', { 
      field, 
      step: currentStep,
      hasValue: value && (Array.isArray(value) ? value.length > 0 : value.length > 0)
    });
  };

  const handleChallengeToggle = (challenge: string) => {
    const current = formData.current_challenges;
    const updated = current.includes(challenge)
      ? current.filter(c => c !== challenge)
      : [...current, challenge];
    updateFormData('current_challenges', updated);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.first_name && formData.last_name && formData.email && formData.phone;
      case 2:
        return formData.occupation && formData.work_hours && formData.income;
      case 3:
        return formData.primary_goal && formData.timeframe && formData.previous_experience;
      case 4:
        return formData.current_challenges.length > 0;
      case 5:
        return formData.weekly_commitment && formData.investment_range && formData.ready_to_start;
      case 6:
        return formData.seriousness && formData.obstacles && formData.motivation;
      default:
        return false;
    }
  };

  const calculateQualificationScore = () => {
    let score = 0;
    
    // Income qualification (30 points)
    if (formData.income === '$100k+') score += 30;
    else if (formData.income === '$75k-$100k') score += 25;
    else if (formData.income === '$50k-$75k') score += 15;
    else if (formData.income === '$30k-$50k') score += 5;
    
    // Investment readiness (25 points)
    if (formData.investment_range === '$5k+') score += 25;
    else if (formData.investment_range === '$3k-$5k') score += 20;
    else if (formData.investment_range === '$1k-$3k') score += 10;
    else if (formData.investment_range === '$500-$1k') score += 5;
    
    // Time commitment (20 points)
    if (formData.weekly_commitment === '6+ hours') score += 20;
    else if (formData.weekly_commitment === '4-6 hours') score += 15;
    else if (formData.weekly_commitment === '2-4 hours') score += 10;
    else if (formData.weekly_commitment === '1-2 hours') score += 5;
    
    // Readiness to start (15 points)
    if (formData.ready_to_start === 'Immediately') score += 15;
    else if (formData.ready_to_start === 'Within 1 week') score += 12;
    else if (formData.ready_to_start === 'Within 1 month') score += 8;
    else if (formData.ready_to_start === 'Just researching') score += 2;
    
    // Seriousness level (10 points)
    if (formData.seriousness === '10') score += 10;
    else if (formData.seriousness === '9') score += 8;
    else if (formData.seriousness === '8') score += 6;
    else if (formData.seriousness === '7') score += 4;
    else if (formData.seriousness === '6') score += 2;
    
    return score;
  };

  const handleSubmit = async () => {
    trackJourneyStep('form_submitted', { 
      qualificationScore: calculateQualificationScore(),
      formData: { ...formData, email: formData.email } // Include key data
    });

    const qualificationScore = calculateQualificationScore();
    const sessionId = sessionStorage.getItem('lead-session-id');
    const userJourney = JSON.parse(sessionStorage.getItem('user-journey') || '[]');
    
    const leadData = {
      ...formData,
      qualification_score: qualificationScore,
      status: 'new',
      notes: '',
      qualified: qualificationScore >= 60,
      facebook_pixel_tracked: false
    };

    try {
      // Try to save lead to Supabase
      let savedLead = null;
      try {
        savedLead = await leadsService.createLead(leadData);
        console.log('Lead saved to Supabase:', savedLead.id);
        
        // Store lead ID for Calendly tracking
        localStorage.setItem('pending-calendly-lead', savedLead.id);
      } catch (supabaseError) {
        console.error('Supabase save failed, using localStorage fallback:', supabaseError);
        
        // Fallback: Save to localStorage
        const fallbackLead = {
          ...leadData,
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        const existingLeads = JSON.parse(localStorage.getItem('fallback-leads') || '[]');
        existingLeads.push(fallbackLead);
        localStorage.setItem('fallback-leads', JSON.stringify(existingLeads));
        
        console.log('Lead saved to localStorage fallback:', fallbackLead.id);
        localStorage.setItem('pending-calendly-lead', fallbackLead.id);
      }
      
      // Always redirect regardless of save method
      if (qualificationScore >= 60) {
        // High-qualified lead - direct to Calendly
        trackJourneyStep('redirected_to_calendly', { qualificationScore });
        const leadId = savedLead?.id || 'fallback-' + Date.now();
        window.location.href = 'https://calendly.com/samiplays95/30min?utm_source=website&utm_medium=form&lead_id=' + leadId;
      } else {
        // Lower qualified - redirect to nurture sequence
        trackJourneyStep('redirected_to_nurture', { qualificationScore });
        window.location.href = '/thank-you-nurture';
      }
    } catch (error) {
      console.error('Error saving lead:', error);
      
      // Last resort: Just redirect to thank you page
      console.log('Using emergency fallback - redirecting to thank you');
      trackJourneyStep('emergency_fallback', { error: error.message });
      
      // Save basic info to localStorage for manual recovery
      const emergencyData = {
        ...leadData,
        timestamp: new Date().toISOString(),
        error: error.message
      };
      localStorage.setItem('emergency-lead-' + Date.now(), JSON.stringify(emergencyData));
      
      // Redirect to appropriate page
      if (qualificationScore >= 60) {
        window.location.href = 'https://calendly.com/samiplays95/30min?utm_source=website&utm_medium=form&emergency=true';
      } else {
        window.location.href = '/thank-you-nurture';
      }
    }
  };

  const nextStep = () => {
    trackJourneyStep('step_completed', { 
      step: currentStep, 
      isValid: isStepValid() 
    });
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      trackJourneyStep('step_advanced', { newStep: currentStep + 1 });
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    trackJourneyStep('step_back', { fromStep: currentStep });
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto">
                <User className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Let's Get Started</h2>
              <p className="text-gray-600">First, tell us a bit about yourself</p>
            </div>
            
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    value={formData.first_name}
                    onChange={(e) => updateFormData('first_name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    value={formData.last_name}
                    onChange={(e) => updateFormData('last_name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Smith"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age Range</label>
                <select
                  value={formData.age}
                  onChange={(e) => updateFormData('age', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select age range</option>
                  <option value="18-25">18-25</option>
                  <option value="26-35">26-35</option>
                  <option value="36-45">36-45</option>
                  <option value="46-55">46-55</option>
                  <option value="55+">55+</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Professional Background</h2>
              <p className="text-gray-600">Help us understand your work situation</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Occupation *</label>
                <input
                  type="text"
                  value={formData.occupation}
                  onChange={(e) => updateFormData('occupation', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="e.g., Software Engineer, CEO, Marketing Director"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Typical Work Hours *</label>
                <select
                  value={formData.work_hours}
                  onChange={(e) => updateFormData('work_hours', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select work hours</option>
                  <option value="30-40 hours">30-40 hours/week</option>
                  <option value="40-50 hours">40-50 hours/week</option>
                  <option value="50-60 hours">50-60 hours/week</option>
                  <option value="60+ hours">60+ hours/week</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Income Range *</label>
                <select
                  value={formData.income}
                  onChange={(e) => updateFormData('income', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select income range</option>
                  <option value="Under $30k">Under 70k</option>
                  <option value="$30k-$50k">70k - 100k</option>
                  <option value="$50k-$75k">100k - 200k</option>
                  <option value="$75k-$100k">200k - 300k</option>
                  <option value="$100k+">300k+</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Your Fitness Goals</h2>
              <p className="text-gray-600">What do you want to achieve?</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Goal *</label>
                <select
                  value={formData.primary_goal}
                  onChange={(e) => updateFormData('primary_goal', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select your primary goal</option>
                  <option value="Lose weight">Lose weight (15+ KGs)</option>
                  <option value="Build muscle">Build muscle and strength</option>
                  <option value="Body recomposition">Lose fat + gain muscle</option>
                  <option value="Improve energy">Improve energy and health</option>
                  <option value="Athletic performance">Athletic performance</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Desired Timeframe *</label>
                <select
                  value={formData.timeframe}
                  onChange={(e) => updateFormData('timeframe', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select timeframe</option>
                  <option value="3 months">3 months</option>
                  <option value="6 months">6 months</option>
                  <option value="1 year">1 year</option>
                  <option value="No rush">No specific timeline</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Previous Fitness Experience *</label>
                <select
                  value={formData.previous_experience}
                  onChange={(e) => updateFormData('previous_experience', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select experience level</option>
                  <option value="Complete beginner">Complete beginner</option>
                  <option value="Some experience">Some experience (1-2 years)</option>
                  <option value="Intermediate">Intermediate (3-5 years)</option>
                  <option value="Advanced">Advanced (5+ years)</option>
                  <option value="Former athlete">Former athlete</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Current Challenges</h2>
              <p className="text-gray-600">What's been holding you back? (Select all that apply)</p>
            </div>
            
            <div className="grid gap-3">
              {[
                'Lack of time',
                'Don\'t know what to eat',
                'Inconsistent workout routine',
                'Low energy/motivation',
                'Work stress',
                'Family obligations',
                'Previous injuries',
                'Tried everything, nothing works',
                'Emotional eating',
                'Travel schedule',
                'No accountability',
                'Confused by conflicting advice'
              ].map((challenge) => (
                <label key={challenge} className="flex items-center p-4 border border-gray-300 rounded-xl hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.current_challenges.includes(challenge)}
                    onChange={() => handleChallengeToggle(challenge)}
                    className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="ml-3 text-gray-700 font-medium">{challenge}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Commitment & Investment</h2>
              <p className="text-gray-600">Let's discuss your availability and budget</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weekly Time Commitment *</label>
                <select
                  value={formData.weekly_commitment}
                  onChange={(e) => updateFormData('weekly_commitment', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select time commitment</option>
                  <option value="1-2 hours">1-2 hours per week</option>
                  <option value="2-4 hours">2-4 hours per week</option>
                  <option value="4-6 hours">4-6 hours per week</option>
                  <option value="6+ hours">6+ hours per week</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Investment Range for Transformation *</label>
                <select
                  value={formData.investment_range}
                  onChange={(e) => updateFormData('investment_range', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select investment range</option>
                  <option value="Under $500">Under 70k</option>
                  <option value="$500-$1k">70k - 150k</option>
                  <option value="$1k-$3k">150k - 250k</option>
                  <option value="$3k-$5k">250k - 500k</option>
                  <option value="$5k+">500k+</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ready to Start? *</label>
                <select
                  value={formData.ready_to_start}
                  onChange={(e) => updateFormData('ready_to_start', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select readiness</option>
                  <option value="Immediately">Immediately</option>
                  <option value="Within 1 week">Within 1 week</option>
                  <option value="Within 1 month">Within 1 month</option>
                  <option value="Just researching">Just researching</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Final Questions</h2>
              <p className="text-gray-600">Help us understand your commitment level</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How serious are you about transforming your body? (1-10) *
                </label>
                <select
                  value={formData.seriousness}
                  onChange={(e) => updateFormData('seriousness', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select seriousness level</option>
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i + 1 === 10 ? '- Extremely serious' : i + 1 >= 8 ? '- Very serious' : i + 1 >= 6 ? '- Moderately serious' : '- Just curious'}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What's the biggest obstacle preventing you from achieving your goals? *
                </label>
                <textarea
                  value={formData.obstacles}
                  onChange={(e) => updateFormData('obstacles', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Be specific about what's been holding you back..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What would achieving your transformation mean to you? *
                </label>
                <textarea
                  value={formData.motivation}
                  onChange={(e) => updateFormData('motivation', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="How would your life change? What would it mean for your confidence, career, relationships?"
                />
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Book Your Consultation</h2>
              <p className="text-gray-600">Select a time that works best for you</p>
            </div>
            
            {/* Calendly Inline Widget */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <div 
                className="calendly-inline-widget" 
                data-url="https://calendly.com/samiplays95/30min?text_color=000000&primary_color=ff7800" 
                style={{ minWidth: '320px', height: '700px', width: '100%' }}
              ></div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-600">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm font-medium text-gray-600">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {renderStep()}
          
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                currentStep === 1 || currentStep === 7
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>
            
            <button
              onClick={nextStep}
              disabled={!isStepValid() && currentStep !== 7}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                (isStepValid() || currentStep === 7)
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white transform hover:scale-105'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              style={{ display: currentStep === 7 ? 'none' : 'flex' }}
            >
              {currentStep === totalSteps - 1 ? (
                <>
                  <Calendar className="w-4 h-4" />
                  Continue to Booking
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-6 space-y-2" style={{ display: currentStep === 7 ? 'none' : 'block' }}>
          <p className="text-sm text-gray-500">🔒 Your information is 100% secure and confidential</p>
          <p className="text-xs text-gray-400">We respect your privacy and will never share your data</p>
        </div>
      </div>
    </div>
  );
};

export default LeadCapture;