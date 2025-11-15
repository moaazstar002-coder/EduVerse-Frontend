import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { validateEmail, validatePassword } from '../utils/helpers';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import './Auth.css';

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    // Validate email
    if (!validateEmail(data.email)) {
      toast.error('Please enter a valid email');
      return;
    }

    // Validate password
    if (!validatePassword(data.password)) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    // Check password match
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      try {
        login({
          name: data.name,
          email: data.email,
          password: data.password,
        });
        toast.success('Registration successful!');
        navigate('/dashboard');
      } catch (error) {
        toast.error('Registration failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="auth-container">
      <motion.div
        className="auth-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="auth-header">
          <h1>Create Account</h1>
          <p>Join thousands of learners on EduVerse</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <div className="input-wrapper">
              <User size={20} />
              <input
                {...register('name', { required: 'Name is required' })}
                type="text"
                id="name"
                placeholder="John Doe"
              />
            </div>
            {errors.name && <span className="error">{errors.name.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <Mail size={20} />
              <input
                {...register('email', { required: 'Email is required' })}
                type="email"
                id="email"
                placeholder="you@example.com"
              />
            </div>
            {errors.email && <span className="error">{errors.email.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <Lock size={20} />
              <input
                {...register('password', { required: 'Password is required' })}
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <span className="error">{errors.password.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-wrapper">
              <Lock size={20} />
              <input
                {...register('confirmPassword', { required: 'Please confirm your password' })}
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
          </div>

          <button type="submit" className="btn-submit" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
      </motion.div>
    </div>
  );
}
