import React from 'react';

interface ButtonProps {
  type?: 'button' | 'submit';
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  onClick,
  className = '',
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn bg-white border-1 border-secondary-600 rounded-xl flex justify-center items-center gap-3 p-2 lg:p-3 text-secondary-600 hover:bg-secondary-600 hover:text-white transform hover:scale-105 transition duration-300 ease-in-out mb-4 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
