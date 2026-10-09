import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AestheticBackground from './AestheticBackground';
import { useAuth } from '../hooks/useAuth';


const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const days = Array.from({ length: 31 }, (_, i) => i + 1);

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

const SignupForm = () => {
  const navigate = useNavigate();
  const { signUp, isConfigured } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    displayName: '',
    username: '',
    password: '',
    dobMonth: '',
    dobDay: '',
    dobYear: '',
    emailOptIn: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (serverError) setServerError('');
    if (successMessage) setSuccessMessage('');
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'This field is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Not a well formed email';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'This field is required';
    } else if (!/^[a-zA-Z0-9_.]+$/.test(formData.username)) {
      newErrors.username = 'Only letters, numbers, and periods';
    }

    if (!formData.password) {
      newErrors.password = 'This field is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Must be at least 8 characters';
    }

    if (!formData.dobMonth || !formData.dobDay || !formData.dobYear) {
      newErrors.dob = 'This field is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setServerError('');
    setSuccessMessage('');

    try {
      const data = await signUp({
        email: formData.email.trim(),
        password: formData.password,
        username: formData.username.trim(),
        displayName: formData.displayName.trim(),
        dobMonth: formData.dobMonth,
        dobDay: formData.dobDay,
        dobYear: formData.dobYear,
        emailOptIn: formData.emailOptIn,
      });

      // If email verification is enabled on Supabase, user exists but session is null until confirmed
      if (data?.user && !data?.session) {
        setSuccessMessage(
          'Account created! We sent a confirmation link to your email. Please check your inbox to activate your account.'
        );
      } else {
        // Automatically signed in!
        navigate('/app');
      }
    } catch (err) {
      setServerError(err?.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AestheticBackground badgeTo="/login" badgeText="sign in">
      <div className="relative max-w-lg mx-auto bg-white/75 backdrop-blur-md border border-white/80 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.08)] p-6 sm:p-9 transition-all">
        
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif text-2xl text-[#6e8f52] leading-none select-none">*</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
              create an account
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1 font-normal">
            join your favorite spaces and chat with friends
          </p>
        </div>

        {/* Setup notice if Supabase keys aren't in .env yet */}
        {!isConfigured && (
          <div className="mb-4 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs leading-relaxed text-left">
            <strong>Backend Setup:</strong> To connect to your real database, add your Supabase project URL &amp; anon key to the <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">.env</code> file.
          </div>
        )}

        {serverError && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs font-medium text-left">
            {serverError}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium text-left leading-relaxed">
            {successMessage}
            <div className="mt-2">
              <Link to="/login" className="underline font-bold text-emerald-900">
                Go to Sign in &rarr;
              </Link>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {/* Email */}
          <div>
            <label 
              htmlFor="email"
              className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-neutral-600 mb-1.5"
            >
              <span>
                Email <span className="text-[#f57b9f]">*</span>
              </span>
              {errors.email && (
                <span className="text-red-500 normal-case italic font-normal text-xs">
                  {errors.email}
                </span>
              )}
            </label>
            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@domain.com"
              className={`w-full bg-white/90 text-neutral-900 px-3.5 py-2.5 rounded-lg text-sm outline-none transition duration-150 border ${
                errors.email 
                  ? 'border-red-400 focus:border-red-500' 
                  : 'border-neutral-200/90 focus:border-[#78a85c] focus:ring-4 focus:ring-[#95c578]/25'
              }`}
              disabled={isLoading}
            />
          </div>

          {/* Display Name */}
          <div>
            <label 
              htmlFor="displayName"
              className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-neutral-600 mb-1.5"
            >
              <span>Display Name</span>
            </label>
            <input
              id="displayName"
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              placeholder="What should people call you?"
              className="w-full bg-white/90 text-neutral-900 placeholder-neutral-400 px-3.5 py-2.5 rounded-lg text-sm outline-none transition duration-150 border border-neutral-200/90 focus:border-[#78a85c] focus:ring-4 focus:ring-[#95c578]/25"
              disabled={isLoading}
            />
          </div>

          {/* Username */}
          <div>
            <label 
              htmlFor="username"
              className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-neutral-600 mb-1.5"
            >
              <span>
                Username <span className="text-[#f57b9f]">*</span>
              </span>
              {errors.username && (
                <span className="text-red-500 normal-case italic font-normal text-xs">
                  {errors.username}
                </span>
              )}
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-neutral-400 font-medium text-sm pointer-events-none select-none">
                @
              </span>
              <input
                id="username"
                type="text"
                name="username"
                autoComplete="username"
                value={formData.username}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, username: e.target.value.toLowerCase() }));
                  if (errors.username) setErrors((prev) => ({ ...prev, username: '' }));
                }}
                placeholder="username"
                className={`w-full bg-white/90 text-neutral-900 pl-8 pr-3.5 py-2.5 rounded-lg text-sm outline-none transition duration-150 border ${
                  errors.username 
                    ? 'border-red-400 focus:border-red-500' 
                    : 'border-neutral-200/90 focus:border-[#78a85c] focus:ring-4 focus:ring-[#95c578]/25'
                }`}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password */}
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
                autoComplete="new-password"
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
          </div>

          {/* Date of Birth */}
          <div>
            <label className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-neutral-600 mb-1.5">
              <span>
                Date of Birth <span className="text-[#f57b9f]">*</span>
              </span>
              {errors.dob && (
                <span className="text-red-500 normal-case italic font-normal text-xs">
                  {errors.dob}
                </span>
              )}
            </label>
            <div className="grid grid-cols-3 gap-2">
              <div className="relative">
                <select
                  name="dobMonth"
                  value={formData.dobMonth}
                  onChange={handleChange}
                  className={`w-full bg-white/90 text-neutral-800 appearance-none px-3 py-2.5 rounded-lg text-xs sm:text-sm outline-none transition cursor-pointer border ${
                    errors.dob 
                      ? 'border-red-400' 
                      : 'border-neutral-200/90 focus:border-[#78a85c] focus:ring-2 focus:ring-[#95c578]/25'
                  }`}
                  disabled={isLoading}
                >
                  <option value="" disabled className="text-neutral-400">
                    Month
                  </option>
                  {months.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-400">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div className="relative">
                <select
                  name="dobDay"
                  value={formData.dobDay}
                  onChange={handleChange}
                  className={`w-full bg-white/90 text-neutral-800 appearance-none px-3 py-2.5 rounded-lg text-xs sm:text-sm outline-none transition cursor-pointer border ${
                    errors.dob 
                      ? 'border-red-400' 
                      : 'border-neutral-200/90 focus:border-[#78a85c] focus:ring-2 focus:ring-[#95c578]/25'
                  }`}
                  disabled={isLoading}
                >
                  <option value="" disabled className="text-neutral-400">
                    Day
                  </option>
                  {days.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-400">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div className="relative">
                <select
                  name="dobYear"
                  value={formData.dobYear}
                  onChange={handleChange}
                  className={`w-full bg-white/90 text-neutral-800 appearance-none px-3 py-2.5 rounded-lg text-xs sm:text-sm outline-none transition cursor-pointer border ${
                    errors.dob 
                      ? 'border-red-400' 
                      : 'border-neutral-200/90 focus:border-[#78a85c] focus:ring-2 focus:ring-[#95c578]/25'
                  }`}
                  disabled={isLoading}
                >
                  <option value="" disabled className="text-neutral-400">
                    Year
                  </option>
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-400">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Opt-in Checkbox */}
          <div className="pt-1">
            <label className="flex items-start gap-2.5 text-xs text-neutral-500 cursor-pointer group">
              <input
                type="checkbox"
                name="emailOptIn"
                checked={formData.emailOptIn}
                onChange={handleChange}
                className="mt-0.5 w-4 h-4 rounded border-neutral-300 text-[#78a85c] focus:ring-0 cursor-pointer accent-[#78a85c]"
              />
              <span className="leading-snug group-hover:text-neutral-800 transition-colors">
                (Optional) Send me product updates, news, and special announcements.
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 bg-neutral-900 hover:bg-neutral-800 active:bg-black text-white py-2.5 px-4 rounded-lg font-medium text-sm transition duration-150 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-md cursor-pointer"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>Creating account...</span>
              </div>
            ) : (
              'Continue'
            )}
          </button>

          {/* Terms notice */}
          <p className="text-[11px] text-neutral-400 leading-relaxed text-center sm:text-left">
            By registering, you agree to Groop&apos;s{' '}
            <a href="#terms" className="text-neutral-700 hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#privacy" className="text-neutral-700 hover:underline">
              Privacy Policy
            </a>
            .
          </p>

          {/* Switch to Login */}
          <div className="text-xs text-neutral-500 pt-1 text-center sm:text-left">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-neutral-900 font-semibold hover:underline"
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </AestheticBackground>
  );
};

export default SignupForm;
