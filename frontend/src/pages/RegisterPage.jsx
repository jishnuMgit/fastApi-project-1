import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import PasswordInput from '../components/PasswordInput';
import {
  HiMail,
  HiArrowRight,
  HiCheckCircle,
  HiXCircle,
  HiUser,
  HiPhone,
  HiCalendar,
} from 'react-icons/hi';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { signup } = useAuth();

  const getPasswordStrength = () => {
    if (!password) return null;

    const hasLength = password.length >= 8 && password.length <= 16;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSymbol = /[\W_]/.test(password);

    const criteria = [hasLength, hasLetter, hasDigit, hasSymbol];
    const metCriteria = criteria.filter(Boolean).length;

    return {
      hasLength,
      hasLetter,
      hasDigit,
      hasSymbol,
      strength: metCriteria,
    };
  };

  const passwordStrength = getPasswordStrength();

  const validate = () => {
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    }

    if (!age) {
      newErrors.age = 'Age is required.';
    } else if (Number(age) < 1 || Number(age) > 120) {
      newErrors.age = 'Please enter a valid age.';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^\+?[0-9]{10,15}$/.test(phone)) {
      newErrors.phone = 'Please enter a valid phone number.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    } else {
      const domain = email.split('@')[1];
      const blockedDomains = ['example.com', 'test.com', 'invalid.com'];

      if (blockedDomains.includes(domain)) {
        newErrors.email = 'This email domain is not allowed.';
      }
    }

    if (password.length < 8 || password.length > 16) {
      newErrors.password = 'Password must be 8-16 characters long.';
    } else {
      const passwordRegex =
        /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_])/;

      if (!passwordRegex.test(password)) {
        newErrors.password =
          'Password must contain an alphabet, a digit, and a symbol.';
      }
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setServerError('');

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      await signup({
        full_name: fullName,
        age: Number(age),
        phone,
        email,
        password,
      });
    } catch (error) {
      setServerError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const PasswordCriterion = ({ met, text }) => (
    <div className="flex items-center gap-2 text-sm">
      {met ? (
        <HiCheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
      ) : (
        <HiXCircle className="h-4 w-4 text-gray-300 flex-shrink-0" />
      )}

      <span
        className={
          met
            ? 'text-gray-700 dark:text-gray-300'
            : 'text-gray-400 dark:text-gray-500'
        }
      >
        {text}
      </span>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 py-8">

      <Link
        to="/"
        className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent mb-12"
      >
        Paisable
      </Link>

      <div className="px-8 py-8 text-left bg-white dark:bg-gray-800 shadow-2xl rounded-2xl w-full max-w-md border border-gray-200 dark:border-gray-700">

        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Create Account
          </h3>

          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Start managing your finances today
          </p>
        </div>

        {serverError && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800">
            <p className="text-sm text-red-600 dark:text-red-400 text-center font-medium">
              {serverError}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Full Name */}
          <div>
            <label
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              htmlFor="fullName"
            >
              Full Name
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiUser className="h-5 w-5 text-gray-400" />
              </div>

              <input
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 ${
                  errors.fullName
                    ? 'border-red-500'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
                required
              />
            </div>

            {errors.fullName && (
              <p className="text-xs text-red-500 mt-2">
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Age */}
          <div>
            <label
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              htmlFor="age"
            >
              Age
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiCalendar className="h-5 w-5 text-gray-400" />
              </div>

              <input
                id="age"
                type="number"
                min="1"
                max="120"
                placeholder="21"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 ${
                  errors.age
                    ? 'border-red-500'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
                required
              />
            </div>

            {errors.age && (
              <p className="text-xs text-red-500 mt-2">
                {errors.age}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              htmlFor="phone"
            >
              Phone Number
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiPhone className="h-5 w-5 text-gray-400" />
              </div>

              <input
                id="phone"
                type="tel"
                placeholder="+919876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 ${
                  errors.phone
                    ? 'border-red-500'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
                required
              />
            </div>

            {errors.phone && (
              <p className="text-xs text-red-500 mt-2">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              htmlFor="email"
            >
              Email Address
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiMail className="h-5 w-5 text-gray-400" />
              </div>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 ${
                  errors.email
                    ? 'border-red-500'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
                required
              />
            </div>

            {errors.email && (
              <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                <HiXCircle className="h-4 w-4" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              htmlFor="password"
            >
              Password
            </label>

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />

            {errors.password && (
              <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                <HiXCircle className="h-4 w-4" />
                {errors.password}
              </p>
            )}

            {password && passwordStrength && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">

                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Password Requirements:
                </p>

                <div className="space-y-2">
                  <PasswordCriterion
                    met={passwordStrength.hasLength}
                    text="8-16 characters"
                  />

                  <PasswordCriterion
                    met={passwordStrength.hasLetter}
                    text="At least one letter"
                  />

                  <PasswordCriterion
                    met={passwordStrength.hasDigit}
                    text="At least one number"
                  />

                  <PasswordCriterion
                    met={passwordStrength.hasSymbol}
                    text="At least one symbol"
                  />
                </div>

                <div className="mt-3 flex gap-1">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`h-1 flex-1 rounded-full ${
                        passwordStrength.strength >= level
                          ? passwordStrength.strength === 4
                            ? 'bg-green-500'
                            : passwordStrength.strength === 3
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                          : 'bg-gray-200 dark:bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-3 text-white font-semibold bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg hover:from-blue-700 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />

                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>

                Creating account...
              </>
            ) : (
              <>
                Create Account
                <HiArrowRight className="h-5 w-5" />
              </>
            )}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>

            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-gray-800 text-gray-500">
                Already have an account?
              </span>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-semibold"
            >
              Sign in instead
              <HiArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </form>
      </div>

      <p className="mt-8 text-sm text-gray-500 dark:text-gray-400 text-center">
        By signing up, you agree to our Terms & Privacy Policy
      </p>
    </div>
  );
}