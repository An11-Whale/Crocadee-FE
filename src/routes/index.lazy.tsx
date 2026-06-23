import { createLazyFileRoute } from '@tanstack/react-router';
import { LandingPage } from '../features/landing/pages/LandingPage';
//trang chủ
export const Route = createLazyFileRoute('/')({
  component: LandingPage,
});
