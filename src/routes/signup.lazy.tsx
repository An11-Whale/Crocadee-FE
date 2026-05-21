import { createLazyFileRoute } from '@tanstack/react-router';
import { SignUpPage } from '../features/auth/pages/SignUpPage';

export const Route = createLazyFileRoute('/signup')({
  component: SignUpPage,
});
