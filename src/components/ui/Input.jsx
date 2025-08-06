'use client';
import React from 'react';

export default function Input({
  label = '',
  type = 'text',
  name,
  value,
  placeholder = '',
  error = '',
  disabled = false,
  icon = null,
  onChange,
}) {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block mb-1 font-semibold">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</span>}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          onChange={onChange}
          className={`w-full border ${
            error ? 'border-red-500' : 'border-gray-300'
          } rounded-md py-2 px-3 ${icon ? 'pl-10' : ''} focus:border-primary focus:outline-none`}
        />
      </div>
      {error && <p className="mt-1 text-red-600 text-sm">{error}</p>}
    </div>
  );
}
