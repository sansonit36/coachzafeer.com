import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VideoSection from './components/VideoSection';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import TransformationGallery from './components/TransformationGallery';
import Testimonials from './components/Testimonials';
import VideoReviews from './components/VideoReviews';
import About from './components/About';
import FAQ from './components/FAQ';
import InstagramJourney from './components/InstagramJourney';
import FinalCTA from './components/FinalCTA';
import LeadCapture from './components/LeadCapture';
import LeadDashboard from './components/LeadDashboard';
import ThankYou from './components/ThankYou';
import ThankYouNurture from './components/ThankYouNurture';
import CalendlySuccess from './components/CalendlySuccess';

const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Global error:', event.error);
      setError(event.error?.message || 'Unknown error');
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
          <p className="text-gray-700 mb-4">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

const HomePage = () => (
  <div className="min-h-screen">
    <VideoSection />
    <Hero />
    <Testimonials />
    <VideoReviews />
    <TransformationGallery />
   
    <Benefits />
    <About />
    <FAQ />
    <InstagramJourney />
    <FinalCTA />
  </div>
);

function App() {
  useEffect(() => {
    console.log('App component mounted');
    console.log('Environment:', import.meta.env.MODE);
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lead-capture" element={<LeadCapture />} />
          <Route path="/dashboard" element={<LeadDashboard />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/thank-you-nurture" element={<ThankYouNurture />} />
          <Route path="/calendly-success" element={<CalendlySuccess />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;