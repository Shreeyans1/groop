import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';

import { ProtectedRoute, PublicOnlyRoute } from './components/ProtectedRoute';

function Dashboard() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const displayName = 
    user?.user_metadata?.display_name || 
    user?.user_metadata?.username || 
    user?.email?.split('@')[0] || 
    'Member';

  const username = user?.user_metadata?.username || user?.email?.split('@')[0] || 'online';
  const initial = (displayName || user?.email || 'U')[0]?.toUpperCase();

  return (
    <div className="flex h-screen w-screen bg-[#faf9f6] text-neutral-800 overflow-hidden font-sans">
      {/* Left Server Rail */}
      <div className="w-[72px] bg-[#f0eee6] border-r border-neutral-200/80 flex flex-col items-center py-4 space-y-3 select-none z-20">
        <div className="relative group flex items-center justify-center">
          <div className="w-12 h-12 rounded-[20px] group-hover:rounded-[14px] bg-[#789c62] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm">
            <img src="/groop.png" alt="Groop" className="w-7 h-7 object-contain" />
          </div>
        </div>

        <div className="w-8 h-[1px] bg-neutral-300 rounded my-1" />

        {/* Server Icons */}
        {['General', 'Matcha', 'Design', 'Music'].map((server) => (
          <div
            key={server}
            title={server}
            className="w-11 h-11 rounded-[18px] hover:rounded-[12px] bg-white border border-neutral-200 hover:border-[#789c62] hover:bg-[#789c62] text-neutral-600 hover:text-white flex items-center justify-center font-bold text-xs transition-all duration-200 cursor-pointer shadow-xs"
          >
            {server.substring(0, 2).toUpperCase()}
          </div>
        ))}
      </div>

      {/* Channel Sidebar & User Area */}
      <div className="w-60 bg-[#f7f6f0] border-r border-neutral-200/80 flex flex-col">
        <div className="h-12 border-b border-neutral-200/80 px-4 flex items-center justify-between font-semibold text-sm text-neutral-900">
          <span>Groop Community</span>
          <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <div className="flex-1 p-2 space-y-1 overflow-y-auto text-sm text-neutral-600">
          <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 px-2 py-1">
            Text Channels
          </div>
          <div className="px-2.5 py-1.5 rounded-lg bg-white shadow-2xs text-neutral-900 font-medium flex items-center gap-1.5 cursor-pointer border border-neutral-200/60">
            <span className="text-[#789c62] text-sm">#</span> general
          </div>
          <div className="px-2.5 py-1.5 rounded-lg hover:bg-neutral-200/50 text-neutral-600 hover:text-neutral-900 flex items-center gap-1.5 cursor-pointer">
            <span className="text-neutral-400 text-sm">#</span> matcha-lounge
          </div>
          <div className="px-2.5 py-1.5 rounded-lg hover:bg-neutral-200/50 text-neutral-600 hover:text-neutral-900 flex items-center gap-1.5 cursor-pointer">
            <span className="text-neutral-400 text-sm">#</span> showcase
          </div>
        </div>

        {/* User bar at bottom */}
        <div className="h-14 bg-[#eeece4] border-t border-neutral-200/80 px-3 flex items-center justify-between select-none">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="relative flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-[#789c62] flex items-center justify-center font-bold text-xs uppercase text-white shadow-xs">
                {initial}
              </div>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
            </div>
            <div className="flex flex-col truncate leading-tight">
              <span className="text-xs font-semibold text-neutral-800 truncate">
                {displayName}
              </span>
              <span className="text-[10px] text-neutral-500 truncate">
                @{username}
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Log Out"
            className="p-1.5 text-neutral-500 hover:text-red-600 hover:bg-white rounded-lg transition cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Chat / Content Area */}
      <div className="flex-1 flex flex-col bg-[#faf9f6]">
        <div className="h-12 border-b border-neutral-200/80 px-6 flex items-center gap-2">
          <span className="text-[#789c62] text-lg font-mono">#</span>
          <span className="font-semibold text-neutral-900 text-sm">general</span>
        </div>

        <div className="flex-1 p-6 flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 rounded-full bg-[#9bbd88]/20 text-[#789c62] flex items-center justify-center mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 mb-2">
            Welcome to Groop!
          </h2>
          <p className="text-neutral-500 max-w-md text-sm mb-6 leading-relaxed">
            You are signed in as <strong className="text-neutral-800">{user?.email || displayName}</strong>.
            Your live Supabase authentication is active!
          </p>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-sm font-medium transition shadow-sm cursor-pointer"
          >
            Log Out & Return to Login
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicOnlyRoute>
                <LoginForm />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicOnlyRoute>
                <SignupForm />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/signup"
            element={<Navigate to="/register" replace />}
          />
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={<Navigate to="/login" replace />}
          />
          <Route
            path="*"
            element={<Navigate to="/login" replace />}
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;