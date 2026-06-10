import { Button } from '../../../components/button';
import bigLogoUrl from '../../../assets/logo/Codebite logo.svg';

export function HeroSection() {
  return (
    <section className="mx-auto max-w-7xl px-8 py-20 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 relative overflow-visible">
      {/* Text */}
      <div className="flex flex-col items-start gap-6">
        <span className="rounded-full bg-primary-100 px-4 py-1.5 text-xs font-bold tracking-widest text-primary-700 uppercase">
          Next-Gen Education
        </span>
        <h1 className="text-5xl font-extrabold leading-[1.1] text-neutral-900 md:text-[64px]">
          Master Coding with <br />
          <span className="italic text-primary-500">AI-Powered</span> <br />
          Gamification
        </h1>
        <p className="max-w-[480px] text-lg leading-relaxed text-neutral-700">
          Turn your learning journey into an adventure.{' '}
          <span className="font-bold text-neutral-900">CodeBite</span> blends{' '}
          <span className="font-bold text-neutral-900">
            professional software engineering
          </span>{' '}
          rigor with the addictive rewards of{' '}
          <span className="font-bold text-neutral-900">gaming</span>.
        </p>

        <Button className="mt-4 px-8 py-4 text-lg shadow-lg shadow-primary-500/30">
          Start challenge →
        </Button>
      </div>

      {/* LOGO */}
      <div className="relative flex flex-col items-center justify-center w-full min-h-[450px] overflow-visible">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-primary-500/50 blur-[120px] pointer-events-none select-none"></div>

        <img
          src={bigLogoUrl}
          alt="CodeBite Big Logo"
          className="relative z-10 w-full max-w-[600px] object-contain"
        />

        <h2 className="relative z-10 mt-6 text-[80px] font-extrabold tracking-tight text-primary-500">
          CodeBite
        </h2>
      </div>
    </section>
  );
}
