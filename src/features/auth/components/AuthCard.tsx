import type { ReactNode } from 'react';
import codebiteLogoUrl from '../../../assets/logo/Codebite logo.svg';

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <main className="flex min-h-screen items-start justify-center overflow-y-auto bg-primary-100 px-4 py-8 font-sans text-neutral-900 sm:px-6">
      <section className="my-auto w-full max-w-115 rounded-3xl border border-primary-300 bg-shade-white px-6 py-7 shadow-2xl shadow-primary-300/30 sm:px-9 sm:py-8">
        <div className="mb-7 flex flex-col items-center text-center">
          <img
            src={codebiteLogoUrl}
            alt="CodeBite logo"
            className="mb-3 h-16 w-16 object-contain"
          />
          <p className="text-xl font-bold text-primary-900">CodeBite</p>
          <h1 className="mt-4 text-2xl font-bold text-neutral-900 sm:text-3xl">
            {title}
          </h1>
          <p className="mt-2 text-sm font-medium text-neutral-600 sm:text-base">
            {subtitle}
          </p>
        </div>

        {children}

        <div className="mt-6 text-center text-sm font-medium text-neutral-700">
          {footer}
        </div>
      </section>
    </main>
  );
}
