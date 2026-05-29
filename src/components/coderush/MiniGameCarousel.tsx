import { useEffect, useState } from 'react';
import arrowLeftUrl from '../../assets/icons/coderush-carousel-arrow-left-featured.svg';
import { miniGames } from '../../features/coderush/data/miniGames';
import { MiniGameCard } from './MiniGameCard';

const AUTO_SLIDE_INTERVAL_MS = 7000;

function getWrappedIndex(index: number, length: number) {
  return ((index % length) + length) % length;
}

export function MiniGameCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoSlidePaused, setIsAutoSlidePaused] = useState(false);

  const lastIndex = miniGames.length - 1;
  const isFirstSlide = activeIndex === 0;
  const isLastSlide = activeIndex === lastIndex;

  const goPrev = () => {
    setActiveIndex((current) => Math.max(current - 1, 0));
  };

  const goNext = () => {
    setActiveIndex((current) => Math.min(current + 1, lastIndex));
  };

  useEffect(() => {
    if (isAutoSlidePaused) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) =>
        getWrappedIndex(current + 1, miniGames.length)
      );
    }, AUTO_SLIDE_INTERVAL_MS);

    return () => {
      window.clearInterval(timer);
    };
  }, [isAutoSlidePaused]);

  const renderCarouselViewport = () => (
    <div className="overflow-hidden rounded-[11px]">
      <div
        className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
        style={{
          transform: `translateX(-${String(activeIndex * 100)}%)`,
        }}
      >
        {miniGames.map((game) => (
          <div key={game.id} className="flex w-full shrink-0">
            <div className="h-full w-full">
              <MiniGameCard game={game} isFeatured />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section aria-label="CodeRush mini-game carousel" className="mt-1">
      <div
        className="mx-auto max-w-255.5"
        onMouseEnter={() => {
          setIsAutoSlidePaused(true);
        }}
        onMouseLeave={() => {
          setIsAutoSlidePaused(false);
        }}
      >
        <div className="hidden items-center gap-7 md:flex">
          <button
            type="button"
            onClick={goPrev}
            disabled={isFirstSlide}
            aria-label="Previous mini-game"
            className={`flex h-10.75 w-10.75 shrink-0 items-center justify-center rounded-full transition ${
              isFirstSlide
                ? 'border border-[#CCC3D7] bg-[#F9F9FF]'
                : 'bg-primary-900'
            }`}
          >
            <img
              src={arrowLeftUrl}
              alt=""
              aria-hidden="true"
              className={`h-2.75 w-1.75 ${
                isFirstSlide ? '' : 'brightness-0 invert'
              }`}
            />
          </button>

          <div className="min-w-0 flex-1">{renderCarouselViewport()}</div>

          <button
            type="button"
            onClick={goNext}
            disabled={isLastSlide}
            aria-label="Next mini-game"
            className={`flex h-10.75 w-10.75 shrink-0 items-center justify-center rounded-full transition ${
              isLastSlide
                ? 'border border-[#CCC3D7] bg-[#F9F9FF]'
                : 'bg-primary-900'
            }`}
          >
            <img
              src={arrowLeftUrl}
              alt=""
              aria-hidden="true"
              className={`h-2.75 w-1.75 rotate-180 ${
                isLastSlide ? '' : 'brightness-0 invert'
              }`}
            />
          </button>
        </div>

        <div className="relative md:hidden">
          {renderCarouselViewport()}

          <div className="pointer-events-none absolute inset-x-3 top-1/2 flex -translate-y-1/2 items-center justify-between">
            <button
              type="button"
              onClick={goPrev}
              disabled={isFirstSlide}
              aria-label="Previous mini-game"
              className={`pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full transition ${
                isFirstSlide
                  ? 'border border-[#CCC3D7] bg-[#F9F9FF]'
                  : 'bg-primary-900'
              }`}
            >
              <img
                src={arrowLeftUrl}
                alt=""
                aria-hidden="true"
                className={`h-2.5 w-1.5 ${
                  isFirstSlide ? '' : 'brightness-0 invert'
                }`}
              />
            </button>

            <button
              type="button"
              onClick={goNext}
              disabled={isLastSlide}
              aria-label="Next mini-game"
              className={`pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full transition ${
                isLastSlide
                  ? 'border border-[#CCC3D7] bg-[#F9F9FF]'
                  : 'bg-primary-900'
              }`}
            >
              <img
                src={arrowLeftUrl}
                alt=""
                aria-hidden="true"
                className={`h-2.5 w-1.5 rotate-180 ${
                  isLastSlide ? '' : 'brightness-0 invert'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="mt-3.5 flex items-center justify-center gap-3.5">
          {miniGames.map((game, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={game.id}
                type="button"
                aria-label={`Go to ${game.title}`}
                aria-current={isActive ? 'true' : undefined}
                onClick={() => {
                  setActiveIndex(index);
                }}
                className={`rounded-full transition ${
                  isActive
                    ? 'h-1.75 w-7 bg-primary-900'
                    : 'h-1.75 w-1.75 bg-[#CCC3D7] hover:bg-[#B4ABBF]'
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
