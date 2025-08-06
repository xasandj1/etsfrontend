import React from 'react'

export const Button = ({ children, className = "", type = "button", ...props }) => {
   return (
    <button
      type={type}
      className={`px-4 py-2 rounded-[7px] cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
