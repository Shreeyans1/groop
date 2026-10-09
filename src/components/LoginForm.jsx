import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AestheticBackground from './AestheticBackground';
import { useAuth } from '../hooks/useAuth';


const LoginForm = () => {
  const navigate = useNavigate();
  const { signIn, isConfigured } = useAuth();

  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (serverError) setServerError('');
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.emailOrPhone.trim()) {
      newErrors.emailOrPhone = 'This field is required';
    }
    if (!formData.password) {
      newErrors.password = 'This field is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setServerError('');

    try {
      await signIn({
        email: formData.emailOrPhone.trim(),
        password: formData.password,
      });

      // On successful login, navigate to the main application
      navigate('/app');
    } catch (err) {
      setServerError(err?.message || 'Invalid login credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AestheticBackground badgeTo="/register" badgeText="sign up">
      <div className="relative bg-white/75 backdrop-blur-md border border-white/80 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.08)] p-6 sm:p-10 flex flex-col md:flex-row gap-8 sm:gap-12 transition-all">
        
        {/* Left Column: Form */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="mb-6">
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-2xl text-[#6e8f52] leading-none select-none">*</span>
              <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">
                welcome back
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1 font-normal">
              we&apos;re so excited to see you again
            </p>
          </div>

          {/* Setup notice if Supabase keys aren't in .env yet */}
          {!isConfigured && (
            <div className="mb-4 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs leading-relaxed">
              <strong>Backend Setup:</strong> To connect to your real database, add your Supabase project URL &amp; anon key to the <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">.env</code> file.
            </div>
          )}

          {serverError && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            {/* Email / Phone Field */}
            <div>
              <label 
                htmlFor="emailOrPhone"
                className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-neutral-600 mb-1.5"
              >
                <span>
                  Email <span className="text-[#f57b9f]">*</span>
                </span>
                {errors.emailOrPhone && (
                  <span className="text-red-500 normal-case italic font-normal text-xs">
                    {errors.emailOrPhone}
                  </span>
                )}
              </label>
              <input
                id="emailOrPhone"
                type="email"
                name="emailOrPhone"
                autoComplete="email"
                value={formData.emailOrPhone}
                onChange={handleChange}
                placeholder="name@domain.com"
                className={`w-full bg-white/90 text-neutral-900 px-3.5 py-2.5 rounded-lg text-sm outline-none transition duration-150 border ${
                  errors.emailOrPhone 
                    ? 'border-red-400 focus:border-red-500' 
                    : 'border-neutral-200/90 focus:border-[#78a85c] focus:ring-4 focus:ring-[#95c578]/25'
                }`}
                disabled={isLoading}
              />
            </div>

            {/* Password Field */}
            <div>
              <label 
                htmlFor="password"
                className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-neutral-600 mb-1.5"
              >
                <span>
                  Password <span className="text-[#f57b9f]">*</span>
                </span>
                {errors.password && (
                  <span className="text-red-500 normal-case italic font-normal text-xs">
                    {errors.password}
                  </span>
                )}
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full bg-white/90 text-neutral-900 pl-3.5 pr-10 py-2.5 rounded-lg text-sm outline-none transition duration-150 border ${
                    errors.password 
                      ? 'border-red-400 focus:border-red-500' 
                      : 'border-neutral-200/90 focus:border-[#78a85c] focus:ring-4 focus:ring-[#95c578]/25'
                  }`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>

              <div className="mt-1 text-right">
                <a 
                  href="#forgot" 
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Password reset instructions will be sent to your email.');
                  }}
                  className="text-xs text-neutral-500 hover:text-neutral-900 transition hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-3 bg-neutral-900 hover:bg-neutral-800 active:bg-black text-white py-2.5 px-4 rounded-lg font-medium text-sm transition duration-150 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-md cursor-pointer"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <span>Signing in...</span>
                </div>
              ) : (
                'Log in'
              )}
            </button>

            {/* Switch to Register */}
            <div className="text-xs text-neutral-500 pt-2 text-center sm:text-left">
              Need an account?{' '}
              <Link
                to="/register"
                className="text-neutral-900 font-semibold hover:underline"
              >
                Create one here
              </Link>
            </div>
          </form>
        </div>

        {/* Right Column: Minimalist Light QR Code (desktop) */}
        <div className="hidden md:flex flex-col items-center justify-center pl-8 border-l border-neutral-200/80 w-[240px] text-center">
          <div className="relative p-3 bg-white/90 border border-neutral-200/90 rounded-xl shadow-xs mb-4">
            <svg 
              className="w-36 h-36" 
              viewBox="0 0 160 160" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="160" height="160" rx="4" fill="white" />
              <rect x="16" y="16" width="36" height="36" rx="4" fill="#18181b" />
              <rect x="22" y="22" width="24" height="24" rx="2" fill="white" />
              <rect x="28" y="28" width="12" height="12" rx="1" fill="#18181b" />

              <rect x="108" y="16" width="36" height="36" rx="4" fill="#18181b" />
              <rect x="114" y="22" width="24" height="24" rx="2" fill="white" />
              <rect x="120" y="28" width="12" height="12" rx="1" fill="#18181b" />

              <rect x="16" y="108" width="36" height="36" rx="4" fill="#18181b" />
              <rect x="22" y="114" width="24" height="24" rx="2" fill="white" />
              <rect x="28" y="120" width="12" height="12" rx="1" fill="#18181b" />

              <rect x="60" y="20" width="8" height="16" fill="#18181b" />
              <rect x="76" y="16" width="16" height="8" fill="#18181b" />
              <rect x="72" y="32" width="12" height="12" fill="#18181b" />
              <rect x="92" y="28" width="8" height="20" fill="#18181b" />
              <rect x="20" y="60" width="12" height="8" fill="#18181b" />
              <rect x="36" y="68" width="16" height="12" fill="#18181b" />
              <rect x="20" y="88" width="16" height="12" fill="#18181b" />
              <rect x="60" y="60" width="40" height="40" rx="8" fill="#78a85c" />
              <rect x="108" y="60" width="12" height="16" fill="#18181b" />
              <rect x="128" y="68" width="16" height="8" fill="#18181b" />
              <rect x="116" y="84" width="28" height="12" fill="#18181b" />
              <rect x="60" y="108" width="16" height="8" fill="#18181b" />
              <rect x="84" y="116" width="12" height="20" fill="#18181b" />
              <rect x="68" y="132" width="20" height="8" fill="#18181b" />
              <rect x="108" y="108" width="16" height="16" fill="#18181b" />
              <rect x="132" y="120" width="12" height="20" fill="#18181b" />
              <rect x="116" y="136" width="20" height="8" fill="#18181b" />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-[#78a85c] flex items-center justify-center p-1 border border-white shadow">
                <img src="/groop.png" alt="Groop" className="w-full h-full object-contain" />
              </div>
            </div>
          </div>

          <h2 className="text-sm font-bold text-neutral-900 mb-1">
            Log in with QR Code
          </h2>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Scan with the <strong className="text-neutral-800">Groop app</strong> to sign in instantly.
          </p>
        </div>
      </div>
    </AestheticBackground>
  );
};

export default LoginForm;
