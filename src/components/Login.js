import React, { useState, useEffect } from 'react';

const Login = ({ onLoginSuccess, onBackToMain, onSignUpClick }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [role, setRole] = useState('tenant'); // 'tenant' | 'manager' | 'admin'
  const [isLoaded, setIsLoaded] = useState(false);

  // Trigger animations on component mount
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Simple placeholder validation. Replace with real auth later.
    if (!username || !password) {
      setErrorMessage('Please enter both username and password.');
      return;
    }

    setErrorMessage('');
    if (typeof onLoginSuccess === 'function') {
      onLoginSuccess({ username, rememberMe, role });
    }
  };

  const handleBackClick = () => {
    if (typeof onBackToMain === 'function') {
      onBackToMain();
    }
  };

  const handleSignUpClick = () => {
    if (typeof onSignUpClick === 'function') {
      onSignUpClick();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-4">
      {/* Back Button */}
      <button
        onClick={handleBackClick}
        className={`fixed top-6 left-6 z-50 flex items-center space-x-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 text-gray-700 hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg group ${
          isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
        }`}
        style={{ transitionDelay: '200ms' }}
      >
        <svg className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="text-sm font-medium">Back to Home</span>
      </button>

      <div 
        className={`w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 transform transition-all duration-1000 ease-out ${
          isLoaded 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-8 opacity-0 scale-95'
        }`}
      >
        {/* Left Visual Panel */}
        <div className="relative hidden lg:block">
          <div className="absolute inset-0">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/70 to-black/80"></div>
          </div>
          
          <div className="relative h-full flex flex-col justify-between p-8 text-white">
            {/* Header */}
            <div 
              className={`flex items-center space-x-3 transform transition-all duration-800 delay-200 ease-out ${
                isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
              }`}
            >
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center transform transition-transform duration-300 hover:scale-110 hover:rotate-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold">JACS</h1>
                <p className="text-sm text-gray-300">Property Management</p>
              </div>
            </div>

            {/* Content */}
            <div 
              className={`space-y-6 transform transition-all duration-800 delay-400 ease-out ${
                isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
              }`}
            >
              <div>
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Welcome Back
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Access your property management dashboard and discover the perfect rental spaces for your needs.
                </p>
              </div>
              
              {/* Features */}
              <div className="space-y-4">
                {[
                  { text: "Find your perfect rental space", delay: "delay-500" },
                  { text: "Manage properties efficiently", delay: "delay-700" },
                  { text: "Secure and reliable platform", delay: "delay-900" }
                ].map((feature, index) => (
                  <div 
                    key={index}
                    className={`flex items-center space-x-3 transform transition-all duration-600 ease-out ${feature.delay} ${
                      isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                    } hover:translate-x-2 hover:scale-105`}
                  >
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center transform transition-all duration-300 hover:bg-white/30 hover:scale-110 hover:rotate-12">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-300">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div 
              className={`text-sm text-gray-400 transform transition-all duration-800 delay-1000 ease-out ${
                isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
              }`}
            >
              <p>© 2024 JACS Property Management. All rights reserved.</p>
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="p-8 lg:p-12 flex items-center justify-center">
          <div className="w-full max-w-md">
            {/* Mobile Header */}
            <div 
              className={`lg:hidden text-center mb-8 transform transition-all duration-800 delay-200 ease-out ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-black to-gray-800 rounded-2xl flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:rotate-6">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">JACS</h1>
                  <p className="text-sm text-gray-600">Property Management</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form Header */}
              <div 
                className={`text-center lg:text-left transform transition-all duration-800 delay-300 ease-out ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Sign In
                </h2>
                <p className="text-gray-600">Welcome back! Please enter your details.</p>
              </div>

              {/* Role Selection */}
              <div 
                className={`space-y-3 transform transition-all duration-800 delay-400 ease-out ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-3">Login as</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'tenant', title: 'Tenant', subtitle: 'Find rental spaces', delay: 'delay-500' },
                    { value: 'manager', title: 'Manager', subtitle: 'Manage properties', delay: 'delay-600' },
                    { value: 'admin', title: 'Admin', subtitle: 'System management', delay: 'delay-700' }
                  ].map((roleOption) => (
                    <label 
                      key={roleOption.value}
                      className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg ${roleOption.delay} ${
                        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                      } ${
                        role === roleOption.value 
                          ? 'border-black bg-gray-50 shadow-md scale-105' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={roleOption.value}
                        checked={role === roleOption.value}
                        onChange={(e) => setRole(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-center space-x-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                          role === roleOption.value ? 'border-black scale-110' : 'border-gray-300'
                        }`}>
                          {role === roleOption.value && (
                            <div className="w-2.5 h-2.5 bg-black rounded-full animate-pulse"></div>
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{roleOption.title}</div>
                          <div className="text-xs text-gray-500">{roleOption.subtitle}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Username Field */}
              <div 
                className={`transform transition-all duration-800 delay-600 ease-out ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-all duration-200 group-focus-within:text-black">
                    <svg className="h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 transform focus:scale-105 hover:shadow-md"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div 
                className={`transform transition-all duration-800 delay-700 ease-out ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-all duration-200 group-focus-within:text-black">
                    <svg className="h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 transform focus:scale-105 hover:shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-all duration-200 transform hover:scale-110"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div 
                className={`flex items-center justify-between transform transition-all duration-800 delay-800 ease-out ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              >
                <label className="flex items-center space-x-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black transition-all duration-200 transform group-hover:scale-110"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-black transition-colors">Remember me</span>
                </label>
                <button 
                  type="button" 
                  className="text-sm font-semibold text-black hover:text-gray-700 transition-all duration-200 transform hover:scale-105"
                >
                  Forgot password?
                </button>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 transform transition-all duration-300 animate-bounce">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-red-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-red-700">{errorMessage}</span>
                  </div>
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                className={`w-full bg-gradient-to-r from-black to-gray-800 text-white py-3 px-4 rounded-xl font-semibold hover:from-gray-800 hover:to-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl active:scale-95 ${
                  isLoaded ? 'translate-y-0 opacity-100 delay-900' : 'translate-y-4 opacity-0'
                }`}
              >
                <span className="relative z-10">Sign In</span>
              </button>

              {/* Divider */}
              <div 
                className={`relative transform transition-all duration-800 delay-1000 ease-out ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              >
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              {/* Social Login */}
              <div 
                className={`grid grid-cols-2 gap-3 transform transition-all duration-800 delay-1100 ease-out ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              >
                <button
                  type="button"
                  className="flex items-center justify-center space-x-2 w-full py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 hover:-translate-y-1 hover:shadow-md"
                >
                  <svg className="w-5 h-5 transition-transform duration-200 hover:rotate-12" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Google</span>
                </button>
                
                <button
                  type="button"
                  className="flex items-center justify-center space-x-2 w-full py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 hover:-translate-y-1 hover:shadow-md"
                >
                  <svg className="w-5 h-5 transition-transform duration-200 hover:rotate-12" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Facebook</span>
                </button>
              </div>

              {/* Sign Up Link */}
              <div 
                className={`text-center transform transition-all duration-800 delay-1200 ease-out ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              >
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button 
                    type="button" 
                    onClick={handleSignUpClick}
                    className="font-semibold text-black hover:text-gray-700 transition-all duration-200 transform hover:scale-105"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


