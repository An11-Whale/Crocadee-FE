import type { ButtonHTMLAttributes } from 'react';

type ButtonVariant =
  | 'primary'
  | 'carouselIcon'
  | 'paginationDot'
  | 'codeFragment'
  | 'choice';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isActive?: boolean;
}

function joinClasses(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

const baseButtonClass =
  'inline-flex items-center justify-center transition duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-4 active:scale-[0.98] disabled:cursor-not-allowed disabled:active:scale-100';

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'h-10.75 min-w-41.25 rounded-xl bg-primary-500 px-6 text-base font-medium text-white hover:bg-primary-700 focus-visible:ring-primary-300/50 disabled:bg-[#CCC3D7] disabled:text-white/80',
  carouselIcon:
    'h-10 w-10 shrink-0 rounded-full bg-primary-900 focus-visible:ring-primary-300/50 hover:bg-primary-700 disabled:border disabled:border-[#CCC3D7] disabled:bg-[#F9F9FF] disabled:hover:bg-[#F9F9FF] md:h-10.75 md:w-10.75',
  paginationDot:
    'h-1.75 rounded-full bg-[#CCC3D7] p-0 hover:bg-[#B4ABBF] focus-visible:ring-2 focus-visible:ring-primary-300/50',
  codeFragment:
    'min-h-11 cursor-grab rounded-[10px] border border-[#CCC3D7] bg-white px-3.5 py-2 font-mono text-[14px] leading-5 text-[#2B3342] shadow-[0px_1px_2px_rgba(15,23,42,0.06)] hover:bg-[#F8F4FF] focus-visible:ring-primary-300/40 active:cursor-grabbing',
  choice:
    'h-14.75 w-full rounded-[10px] border border-[#CCC3D7] bg-white focus-visible:ring-primary-300/40 hover:border-primary-300 hover:bg-[#F8F4FF]',
};

const activeVariantClasses: Partial<Record<ButtonVariant, string>> = {
  paginationDot: 'w-7 bg-primary-900 hover:bg-primary-900',
};

const inactiveVariantClasses: Partial<Record<ButtonVariant, string>> = {
  paginationDot: 'w-1.75',
};

export function Button({
  variant = 'primary',
  isActive = false,
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={joinClasses(
        baseButtonClass,
        variantClasses[variant],
        isActive
          ? activeVariantClasses[variant]
          : inactiveVariantClasses[variant],
        className
      )}
      {...props}
    />
  );
}
