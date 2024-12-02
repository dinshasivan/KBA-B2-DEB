import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaRegEyeSlash } from 'react-icons/fa6';
import { FaRegEye } from 'react-icons/fa6';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-green-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Welcome Back</h2>

        <form className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="w-full bg-blue-50 p-2 border rounded outline-none focus:ring-2 focus:ring-green-300"
              name="email"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
              Password:
            </label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:ring-2 focus-within:ring-green-300">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="w-full outline-none bg-transparent"
                name="password"
                placeholder="Enter your password"
              />
              <div
                onClick={() => setShowPassword((prev) => !prev)}
                className="cursor-pointer ml-2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
            <Link to="/forgot-password" className="block text-right text-green-700 hover:text-green-800 mt-2">
              Forgot password?
            </Link>
          </div>

          <button
            type="button"
            className="w-full bg-green-600 text-white py-2 rounded font-semibold tracking-wide hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-700">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-green-700 hover:text-green-800">
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
