import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router';
import { registerUser, clearError } from '../authSlice';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Lock, Mail, Eye, EyeOff, User, ShieldAlert } from 'lucide-react';

const signupSchema = z.object({
  firstName: z.string().min(3, "First name must be at least 3 characters"),
  emailId: z.string().email("Invalid Email address"),
  password: z.string().min(8, "Password must be at least 8 characters")
});

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);


  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#020617] relative overflow-hidden">
      {/* Decorative Gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] h-[350px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <Card className="w-full max-w-md border-slate-800/80 bg-[#090d16]/80 shadow-2xl relative z-10 gradient-glow overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Accent Top Border */}
        <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
        
        <CardHeader className="space-y-2 text-center pt-8">
          <CardTitle className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Create Account
          </CardTitle>
          <CardDescription className="text-slate-400">
            Join ApexCode to start climbing the leaderboard
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <div className="flex items-center gap-3 p-3 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 text-sm animate-in slide-in-from-top-2">
              <ShieldAlert className="h-5 w-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <Input
                  type="text"
                  placeholder="John"
                  className={`pl-10 ${errors.firstName ? 'border-red-500/50 focus-visible:ring-red-500/50 focus-visible:border-red-500' : ''}`}
                  {...register('firstName')}
                />
              </div>
              {errors.firstName && (
                <p className="text-red-400 text-xs mt-1">{errors.firstName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <Input
                  type="email"
                  placeholder="john@example.com"
                  className={`pl-10 ${errors.emailId ? 'border-red-500/50 focus-visible:ring-red-500/50 focus-visible:border-red-500' : ''}`}
                  {...register('emailId')}
                />
              </div>
              {errors.emailId && (
                <p className="text-red-400 text-xs mt-1">{errors.emailId.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`pl-10 pr-10 ${errors.password ? 'border-red-500/50 focus-visible:ring-red-500/50 focus-visible:border-red-500' : ''}`}
                  {...register('password')}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="default"
              className="w-full mt-6 bg-indigo-600 hover:bg-indigo-500 font-semibold"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <span className="loading loading-spinner loading-xs"></span>
                  Signing up...
                </div>
              ) : (
                'Sign Up'
              )}
            </Button>
          </form>

          <div className="text-center text-sm text-slate-400 mt-6 pt-4 border-t border-slate-900/60">
            Already have an account?{' '}
            <NavLink to="/login" className="text-indigo-400 hover:text-indigo-300 hover:underline font-medium">
              Log in
            </NavLink>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Signup;