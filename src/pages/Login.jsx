import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, User, Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('isAdmin', 'true');
        navigate('/profile');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(`Connection failed. Error: ${err.message}. API URL: ${API_URL || '(relative)'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 flex items-center justify-center relative z-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-effect w-full max-w-md p-10 rounded-[32px] border border-white/10 relative overflow-hidden shadow-2xl bg-black/60"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-heading font-extrabold text-white mb-2 uppercase tracking-tight">
            Admin <span className="text-primary">Login</span>
          </h1>
          <p className="text-gray-400 text-sm tracking-wide">Welcome back, please login to your account.</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-red-600/10 border border-red-500/30 rounded-2xl flex items-center gap-3 text-red-500 text-sm"
          >
            <AlertCircle size={18} />
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <div className="relative group">
              <User 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" 
                size={20} 
              />
              <input
                type="text"
                placeholder="Enter your username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary focus:bg-black/60 transition-all font-light"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative group">
              <Lock 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" 
                size={20} 
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Your security .."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white focus:outline-none focus:border-primary focus:bg-black/60 transition-all font-light"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              <div className="absolute inset-0 border-2 border-emerald-500/50 rounded-2xl pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity blur-[2px]"></div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-10 py-4 bg-gradient-to-r from-emerald-500 via-yellow-500 to-yellow-600 rounded-2xl text-white font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_-5px_#10b981] hover:shadow-[0_0_30px_-5px_#10b981] transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <LogIn size={20} />
                <span>Login</span>
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
