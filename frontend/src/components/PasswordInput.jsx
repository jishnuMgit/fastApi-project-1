import React, { useState } from 'react';

const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const EyeSlashedIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 1.274-4.057 5.064-7 9.542-7 .847 0 1.67.111 2.458.322M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2 2l20 20"
    />
  </svg>
);

const PasswordInput = ({
  value,
  onChange,
  placeholder = 'Password',
  id = 'password',
  error,
  className = '',
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className="relative">
      <input
        type={isPasswordVisible ? 'text' : 'password'}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className={`
          w-full
          px-4
          py-3
          pr-11
          border
          rounded-lg
          bg-gray-50
          dark:bg-gray-700/50
          text-gray-900
          dark:text-gray-100
          placeholder-gray-400
          dark:placeholder-gray-500
          focus:outline-none
          focus:ring-2
          transition-all
          duration-200
          ${
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-transparent'
          }
          ${className}
        `}
      />

      <button
        type="button"
        onClick={() =>
          setIsPasswordVisible((prev) => !prev)
        }
        aria-label={
          isPasswordVisible
            ? 'Hide password'
            : 'Show password'
        }
        className="
          absolute
          inset-y-0
          right-0
          flex
          items-center
          pr-3
          text-gray-400
          dark:text-gray-500
          hover:text-gray-600
          dark:hover:text-gray-300
          transition-colors
          duration-200
        "
      >
        {isPasswordVisible ? (
          <EyeSlashedIcon />
        ) : (
          <EyeIcon />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;