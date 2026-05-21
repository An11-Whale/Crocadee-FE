import { Link } from '@tanstack/react-router';
import { useState, type ChangeEvent, type SyntheticEvent } from 'react';
import { AuthCard } from '../components/AuthCard';
import { AuthPasswordInput } from '../components/AuthPasswordInput';
import { AuthTextInput } from '../components/AuthTextInput';

interface SignUpFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type SignUpErrors = Partial<Record<keyof SignUpFormValues, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialSignUpValues: SignUpFormValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export function SignUpPage() {
  const [formValues, setFormValues] =
    useState<SignUpFormValues>(initialSignUpValues);
  const [errors, setErrors] = useState<SignUpErrors>({});

  const handleTextChange =
    (field: keyof SignUpFormValues) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setFormValues((current) => ({ ...current, [field]: event.target.value }));
      setErrors((current) => ({ ...current, [field]: undefined }));
    };

  const validateForm = () => {
    const nextErrors: SignUpErrors = {};

    if (!formValues.username.trim()) {
      nextErrors.username = 'Username is required.';
    }

    if (!formValues.email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!emailPattern.test(formValues.email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (!formValues.password) {
      nextErrors.password = 'Password is required.';
    }

    if (!formValues.confirmPassword) {
      nextErrors.confirmPassword = 'Confirm password is required.';
    } else if (formValues.password !== formValues.confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    // TODO: Connect to the real sign-up API when the auth endpoint is ready.
    console.info('Sign up placeholder', formValues);
  };

  return (
    <AuthCard
      title="Create your CodeBite account!"
      subtitle="Sign up and build your coding career!"
      footer={
        <>
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-bold text-primary-700 hover:text-primary-900"
          >
            Sign in
          </Link>
        </>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <AuthTextInput
          id="signup-username"
          label="Username"
          value={formValues.username}
          onChange={handleTextChange('username')}
          placeholder="Choose your username"
          autoComplete="username"
          error={errors.username}
        />

        <AuthTextInput
          id="signup-email"
          label="Email"
          type="email"
          value={formValues.email}
          onChange={handleTextChange('email')}
          placeholder="Enter your email"
          autoComplete="email"
          error={errors.email}
        />

        <AuthPasswordInput
          id="signup-password"
          label="Password"
          value={formValues.password}
          onChange={handleTextChange('password')}
          placeholder="Create a password"
          autoComplete="new-password"
          error={errors.password}
        />

        <AuthPasswordInput
          id="signup-confirm-password"
          label="Confirm password"
          value={formValues.confirmPassword}
          onChange={handleTextChange('confirmPassword')}
          placeholder="Confirm your password"
          autoComplete="new-password"
          error={errors.confirmPassword}
        />

        <button
          type="submit"
          className="h-12 w-full rounded-2xl bg-secondary-500 text-base font-bold text-shade-white shadow-lg shadow-secondary-300/40 transition hover:bg-secondary-700 focus:outline-none focus:ring-4 focus:ring-secondary-300/60"
        >
          Sign up
        </button>
      </form>
    </AuthCard>
  );
}
