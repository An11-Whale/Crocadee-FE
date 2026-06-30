import React from 'react';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'white' | 'ghost';
  href?: string;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const Button = ({
  variant = 'primary',
  href,
  className = '',
  children,
  ...props
}: ButtonProps) => {
  const baseClasses =
    'inline-flex items-center justify-center rounded-xl font-bold transition-all cursor-pointer';

  const variants = {
    primary: 'bg-primary-500 text-shade-white shadow-sm hover:bg-primary-700',
    secondary:
      'bg-secondary-500 text-shade-white shadow-sm hover:bg-secondary-700',
    white:
      'bg-shade-white text-neutral-900 shadow-sm border border-neutral-100 hover:bg-neutral-50',
    ghost:
      'bg-transparent text-neutral-600 hover:bg-primary-100 hover:text-primary-700',
  };

  const defaultSize = 'px-6 py-3 text-base';

  const finalClasses = `${baseClasses} ${variants[variant]} ${defaultSize} ${className}`;

  if (href) {
    return (
      <a href={href} className={finalClasses} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={finalClasses} {...props}>
      {children}
    </button>
  );
};
