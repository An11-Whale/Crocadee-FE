import React from 'react';

// Định nghĩa các Props (Thuộc tính) mà nút này có thể nhận
type ButtonProps = {
  variant?: 'primary' | 'white' | 'ghost'; // Chọn màu (mặc định là primary)
  href?: string; // Dùng khi muốn nút bấm chuyển trang
  className?: string; // Dùng để ghi đè kích thước, khoảng cách...
  children: React.ReactNode; // Nội dung chữ bên trong nút
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const Button = ({
  variant = 'primary',
  href,
  className = '',
  children,
  ...props
}: ButtonProps) => {
  // 1. Các class CỐT LÕI (Luôn có)
  const baseClasses =
    'inline-flex items-center justify-center rounded-xl font-bold transition-all cursor-pointer';

  // 2. Phân loại MÀU SẮC (Variant)
  const variants = {
    primary: 'bg-primary-500 text-shade-white shadow-sm hover:bg-primary-700',
    white:
      'bg-shade-white text-neutral-900 shadow-sm border border-neutral-100 hover:bg-neutral-50',
    ghost:
      'bg-transparent text-neutral-600 hover:bg-primary-100 hover:text-primary-700',
  };

  // 3. KÍCH THƯỚC mặc định (Sẽ bị className của bạn ghi đè nếu cần)
  const defaultSize = 'px-6 py-3 text-base';

  // Gộp tất cả class lại
  const finalClasses = `${baseClasses} ${variants[variant]} ${defaultSize} ${className}`;

  // TỰ ĐỘNG THÔNG MINH: Nếu có truyền link (href), render thẻ <a>
  if (href) {
    return (
      <a href={href} className={finalClasses} {...props}>
        {children}
      </a>
    );
  }

  // Ngược lại, render thẻ <button> thông thường
  return (
    <button className={finalClasses} {...props}>
      {children}
    </button>
  );
};
