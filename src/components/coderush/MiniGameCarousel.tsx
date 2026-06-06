import { useEffect, useState } from 'react';
import arrowLeftUrl from '../../assets/icons/coderush-carousel-arrow-left-featured.svg';
import { miniGames } from '../../features/coderush/data/miniGames';
import { Button } from '../ui/Button';
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
    <div className="h-full min-h-0 overflow-hidden rounded-[11px]">
      <div
        className="flex h-full min-h-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
        style={{
          transform: `translateX(-${String(activeIndex * 100)}%)`,
        }}
      >
        {miniGames.map((game) => (
          <div key={game.id} className="flex h-full min-h-0 w-full shrink-0">
            <div className="h-full min-h-0 w-full">
              <MiniGameCard game={game} isFeatured />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section
      aria-label="CodeRush mini-game carousel"
      className="mt-2 flex min-h-0 flex-1"
    >
      <div
        className="mx-auto flex h-full min-h-0 w-full max-w-255.5 flex-col"
        onMouseEnter={() => {
          setIsAutoSlidePaused(true);
        }}
        onMouseLeave={() => {
          setIsAutoSlidePaused(false);
        }}
      >
        <div className="hidden min-h-0 flex-1 items-center gap-4 md:flex lg:gap-7">
          <Button
            variant="carouselIcon"
            onClick={goPrev}
            disabled={isFirstSlide}
            aria-label="Previous mini-game"
          >
            <img
              src={arrowLeftUrl}
              alt=""
              aria-hidden="true"
              className={`h-2.75 w-1.75 ${
                isFirstSlide ? '' : 'brightness-0 invert'
              }`}
            />
          </Button>

          <div className="h-full min-w-0 flex-1">
            {renderCarouselViewport()}
          </div>

          <Button
            variant="carouselIcon"
            onClick={goNext}
            disabled={isLastSlide}
            aria-label="Next mini-game"
          >
            <img
              src={arrowLeftUrl}
              alt=""
              aria-hidden="true"
              className={`h-2.75 w-1.75 rotate-180 ${
                isLastSlide ? '' : 'brightness-0 invert'
              }`}
            />
          </Button>
        </div>

        <div className="relative min-h-0 flex-1 md:hidden">
          {renderCarouselViewport()}

          <div className="pointer-events-none absolute inset-x-3 top-1/2 flex -translate-y-1/2 items-center justify-between">
            <Button
              variant="carouselIcon"
              onClick={goPrev}
              disabled={isFirstSlide}
              aria-label="Previous mini-game"
              className="pointer-events-auto"
            >
              <img
                src={arrowLeftUrl}
                alt=""
                aria-hidden="true"
                className={`h-2.5 w-1.5 ${
                  isFirstSlide ? '' : 'brightness-0 invert'
                }`}
              />
            </Button>

            <Button
              variant="carouselIcon"
              onClick={goNext}
              disabled={isLastSlide}
              aria-label="Next mini-game"
              className="pointer-events-auto"
            >
              <img
                src={arrowLeftUrl}
                alt=""
                aria-hidden="true"
                className={`h-2.5 w-1.5 rotate-180 ${
                  isLastSlide ? '' : 'brightness-0 invert'
                }`}
              />
            </Button>
          </div>
        </div>

        <div className="mt-2.5 flex shrink-0 items-center justify-center gap-3.5">
          {miniGames.map((game, index) => {
            const isActive = index === activeIndex;

            return (
              <Button
                key={game.id}
                variant="paginationDot"
                isActive={isActive}
                aria-label={`Go to ${game.title}`}
                aria-current={isActive ? 'true' : undefined}
                onClick={() => {
                  setActiveIndex(index);
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
