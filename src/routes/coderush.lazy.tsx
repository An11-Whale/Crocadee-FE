import { createLazyFileRoute } from '@tanstack/react-router';
import { TopNavbar } from '../components/layout/TopNavbar';

export const Route = createLazyFileRoute('/coderush')({
  component: () => (
    <main className="min-h-screen bg-[#F9F9FF] text-neutral-900">
      <TopNavbar activeItem="coderush" />

      <section className="mx-auto w-full max-w-275 px-6 py-8">
        <h1 className="text-5xl font-extrabold text-neutral-900">CodeRush</h1>
        <p className="mt-3 max-w-3xl text-lg text-[#4A4454]">
          Sharpen your skills with bite-sized mini-games. Earn XP, collect
          badges, and climb the leaderboard.
        </p>
      </section>
    </main>
  ),
});
