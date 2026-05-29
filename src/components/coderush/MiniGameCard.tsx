import codeCopyIconUrl from '../../assets/icons/coderush-code-copy.svg';
// import coinIconUrl from '../../assets/icons/coderush-reward-coin.svg';
import xpIconUrl from '../../assets/icons/coderush-reward-xp.svg';
import type {
  MiniGame,
  MiniGameTemplate,
} from '../../features/coderush/data/miniGames';

interface MiniGameCardProps {
  game: MiniGame;
  isFeatured?: boolean;
}

interface RewardItemProps {
  iconUrl: string;
  label: string;
  textColor: string;
}

const rearrangePlaceholderPattern = /^(\s*)\[\[(.+?)\]\]$/;

function getIconBadgeColor(template: MiniGameTemplate) {
  switch (template) {
    case 'spot-bug':
      return '#BA1A1A';
    case 'guess-output':
      return '#1ABAB7';
    default:
      return '#6C63FF';
  }
}

function getIconSizeClass(template: MiniGameTemplate) {
  switch (template) {
    case 'spot-bug':
      return 'h-6 w-[21px]';
    case 'guess-output':
      return 'h-[23px] w-[23px]';
    default:
      return 'h-[23px] w-[23px]';
  }
}

function RewardItem({ iconUrl, label, textColor }: RewardItemProps) {
  return (
    <div className="flex items-center gap-2">
      <img src={iconUrl} alt="" aria-hidden="true" className="h-4.5 w-4.5" />
      <span
        className="text-[16px] leading-6.25 font-bold"
        style={{
          color: textColor,
          fontFamily: 'Plus Jakarta Sans, Inter, sans-serif',
        }}
      >
        {label}
      </span>
    </div>
  );
}

export function MiniGameCard({ game, isFeatured = false }: MiniGameCardProps) {
  const cardHeightClass = isFeatured ? 'min-h-[654px] h-full' : 'min-h-[520px]';

  return (
    <article
      className={`relative overflow-hidden rounded-[11px] border border-[#E2E8F8] bg-[#F9F9FF] p-7 shadow-[0px_4px_20px_rgba(15,23,42,0.05)] ${cardHeightClass}`}
    >
      <span
        className="pointer-events-none absolute -top-17.5 -right-17.5 h-71 w-71 rounded-full bg-[#FFDAD6]"
        aria-hidden="true"
      />

      <div className="relative z-10 flex h-full flex-col">
        <div
          className="relative mb-7 flex h-14.25 w-14.25 items-center justify-center rounded-full"
          style={{ backgroundColor: getIconBadgeColor(game.template) }}
        >
          <span
            className="absolute inset-0 rounded-full bg-white/2"
            aria-hidden="true"
          />

          {game.iconUrl ? (
            <img
              src={game.iconUrl}
              alt=""
              aria-hidden="true"
              className={`${getIconSizeClass(game.template)} shrink-0`}
            />
          ) : (
            <span className="h-5.75 w-5.75" aria-hidden="true" />
          )}
        </div>

        <div className="mb-7">
          <h3 className="text-[28px] leading-8.5 font-bold text-[#151C27]">
            {game.title}
          </h3>
          <p className="mt-3 max-w-127.75 whitespace-pre-line text-[16px] leading-[25.5px] text-[#4A4455]">
            {game.subtitle}
          </p>
        </div>

        <div className="rounded-[7px] bg-[#1E1E1E] p-5.25">
          <div className="border-b border-[#374151] pb-1.75">
            <div className="flex items-start gap-3">
              <span className="font-mono text-[10.6px] leading-3.5 text-[#DCE2F3]">
                {game.languageLabel}
              </span>
              <div className="ml-auto">
                <img
                  src={codeCopyIconUrl}
                  alt=""
                  aria-hidden="true"
                  className="h-2.5 w-2.25"
                />
              </div>
            </div>
          </div>

          <pre className="mt-3.5 whitespace-pre-wrap font-mono text-[15.5px] leading-7 text-[#DCE2F3]">
            {game.codeSnippet.split('\n').map((line, index) => {
              const isSpotIfLine =
                game.template === 'spot-bug' &&
                line.trimStart().startsWith('if ');

              const rearrangePlaceholderMatch =
                game.id === 'rearrange-code'
                  ? rearrangePlaceholderPattern.exec(line)
                  : null;

              if (rearrangePlaceholderMatch) {
                const [, indentation, placeholderValue] =
                  rearrangePlaceholderMatch;
                const placeholderWidth = Math.max(
                  120,
                  placeholderValue.length * 8 + 32
                );

                return (
                  <span
                    key={`${game.id}-code-line-${String(index)}`}
                    className="block"
                  >
                    {indentation}
                    <span
                      aria-hidden="true"
                      className="inline-flex h-7 rounded-md border border-white/70 bg-white/70 align-middle backdrop-blur-[3px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.4)]"
                      style={{ width: `${String(placeholderWidth)}px` }}
                    />
                  </span>
                );
              }

              return (
                <span
                  key={`${game.id}-code-line-${String(index)}`}
                  className="block"
                  style={{ color: isSpotIfLine ? '#EF4444' : undefined }}
                >
                  {line}
                </span>
              );
            })}
          </pre>
        </div>

        {game.id === 'rearrange-code' && game.fragmentOptions?.length ? (
          <div className="mt-5.25 rounded-[7px] bg-[#F9F9FF] p-5">
            <div className="flex flex-wrap gap-3">
              {game.fragmentOptions.map((fragment) => (
                <button
                  key={`${game.id}-${fragment}`}
                  type="button"
                  className="inline-flex min-h-11 cursor-grab items-center rounded-[10px] border border-[#CCC3D7] bg-white px-3.5 py-2 font-mono text-[14px] leading-5 text-[#2B3342] shadow-[0px_1px_2px_rgba(15,23,42,0.06)] transition hover:bg-[#F8F4FF]"
                  aria-label={`Code fragment ${fragment}`}
                >
                  {fragment}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {game.template === 'guess-output' && game.choiceOptions?.length ? (
          <div className="mt-5.25 rounded-[7px] bg-[#F9F9FF] p-5">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {game.choiceOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className="flex h-14.75 items-center justify-center rounded-[10px] border border-[#CCC3D7] bg-white"
                  aria-label={`Choice ${option}`}
                >
                  <span className="inline-flex min-w-7.75 items-center justify-center rounded-lg bg-[#EDE9F5] px-2.5 py-2 text-[14.5px] leading-4.5 font-bold text-primary-900">
                    {option}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-auto pt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-7">
            <RewardItem
              iconUrl={xpIconUrl}
              label={game.xpRewardLabel}
              textColor="#5300B7"
            />
            {/* <RewardItem
              iconUrl={coinIconUrl}
              label={game.coinRewardLabel}
              textColor="#FD761A"
            /> */}
          </div>

          <button
            type="button"
            className="inline-flex h-10.75 min-w-41.25 items-center justify-center rounded-xl bg-primary-500 px-6 text-base font-medium text-white transition hover:opacity-95"
          >
            {game.ctaLabel}
          </button>
        </div>
      </div>
    </article>
  );
}
