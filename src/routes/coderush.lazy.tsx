import { createLazyFileRoute } from '@tanstack/react-router';
import { MiniGameCarousel } from '../components/coderush/MiniGameCarousel';
import { TopNavbar } from '../components/layout/TopNavbar';

export const Route = createLazyFileRoute('/coderush')({
  component: () => (
    <main className="flex h-dvh flex-col overflow-hidden bg-[#F9F9FF] text-neutral-900">
      <TopNavbar activeItem="coderush" />

      <section className="mx-auto flex min-h-0 w-full max-w-275 flex-1 flex-col px-4 py-2.5 sm:px-6 sm:py-3">
        <div className="shrink-0">
          <h1 className="text-[clamp(2rem,4.8vh,3rem)] leading-none font-extrabold text-neutral-900">
            CodeRush
          </h1>
          <p className="mt-1 max-w-3xl text-sm leading-5 text-[#4A4454] sm:text-base sm:leading-6">
            Sharpen your skills with bite-sized mini-games. Earn XP, collect
            badges, and climb the leaderboard.
          </p>
        </div>

        <MiniGameCarousel />
      </section>
    </main>
  ),
});
