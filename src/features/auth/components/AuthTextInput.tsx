import type { ChangeEventHandler, HTMLInputTypeAttribute } from 'react';

interface AuthTextInputProps {
  id: string;
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  error?: string;
  type?: HTMLInputTypeAttribute;
  autoComplete?: string;
}

export function AuthTextInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  type = 'text',
  autoComplete,
}: AuthTextInputProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="h-12 w-full rounded-2xl border border-neutral-700 bg-primary-100 px-4 text-sm font-medium text-neutral-900 outline-none transition placeholder:text-neutral-500 focus:border-primary-500 focus:ring-4 focus:ring-primary-300/40"
      />
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
