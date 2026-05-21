import { useState, type ChangeEventHandler } from 'react';
import eyeOffIconUrl from '../../../assets/icon/Eye off.svg';
import eyeOnIconUrl from '../../../assets/icon/Eye on.svg';

interface AuthPasswordInputProps {
  id: string;
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  error?: string;
  autoComplete?: string;
}

export function AuthPasswordInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  autoComplete,
}: AuthPasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={isVisible ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className="h-12 w-full rounded-2xl border border-neutral-700 bg-primary-100 px-4 pr-12 text-sm font-medium text-neutral-900 outline-none transition placeholder:text-neutral-500 focus:border-primary-500 focus:ring-4 focus:ring-primary-300/40"
        />
        <button
          type="button"
          onClick={() => {
            setIsVisible((current) => !current);
          }}
          className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full transition hover:bg-shade-white focus:outline-none focus:ring-2 focus:ring-primary-300"
          aria-label={isVisible ? 'Hide password' : 'Show password'}
        >
          <img
            src={isVisible ? eyeOffIconUrl : eyeOnIconUrl}
            alt=""
            className="h-5 w-5"
          />
        </button>
      </div>
      {error ? (
        <p
          id={`${id}-error`}
          className="mt-1.5 text-xs font-medium text-danger-700"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
