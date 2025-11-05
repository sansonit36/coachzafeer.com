import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, LogIn } from 'lucide-react';

interface LoginFormProps {
  onLogin: (user: { id: string; name: string; email: string; role: string }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Demo users for testing
  const demoUsers = [
    { id: '1', name: 'Coach Zafeer', email: 'coach@zafeer.com', password: 'admin123', role: 'admin' },
    { id: '2', name: 'Sarah Manager', email: 'sarah@zafeer.com', password: 'manager123', role: 'manager' },
    { id: '3', name: 'John Assistant', email: 'john@zafeer.com', password: 'user123', role: 'user' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      // Check both demo users and registered users
      const registeredUsers = JSON.parse(localStorage.getItem('dashboard-login-users') || '[]');
      const allUsers = [...demoUsers, ...registeredUsers];
      const user = allUsers.find(u => u.email === email && u.password === password);
      
      if (user) {
        const { password: _, ...userWithoutPassword } = user;
        localStorage.setItem('dashboard-user', JSON.stringify(userWithoutPassword));
        
        // Log login activity
        const activity = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          userId: user.id,
          userName: user.name,
          action: 'login',
          targetType: 'system',
          details: 'Logged into dashboard',
          timestamp: new Date().toISOString(),
          ipAddress: '192.168.1.' + Math.floor(Math.random() * 255)
        };
        
        const existingActivities = JSON.parse(localStorage.getItem('dashboard-activities') || '[]');
        existingActivities.unshift(activity);
        localStorage.setItem('dashboard-activities', JSON.stringify(existingActivities));
        
        onLogin(userWithoutPassword);
      } else {
        setError('Invalid email or password');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Login</h1>
            <p className="text-gray-600 mt-2">Access your lead management dashboard</p>
          </div>

          {/* Demo Credentials */}
          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">Demo Credentials:</h3>
            <div className="space-y-1 text-sm text-blue-800">
              <p><strong>Admin:</strong> coach@zafeer.com / admin123</p>
              <p><strong>Manager:</strong> sarah@zafeer.com / manager123</p>
              <p><strong>User:</strong> john@zafeer.com / user123</p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;