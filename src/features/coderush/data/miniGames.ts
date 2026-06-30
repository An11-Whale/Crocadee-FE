import spotBugIconUrl from '../../../assets/icons/coderush-spotbug-featured.svg';
import guessOutputIconUrl from '../../../assets/icons/coderush-guess-output-featured.svg';
import fillCodeIconUrl from '../../../assets/icons/coderush-fill-code-featured.svg';
import rearrangeCodeIconUrl from '../../../assets/icons/coderush-rearrange-code-featured.svg';

export type MiniGameId =
  | 'spot-bug'
  | 'rearrange-code'
  | 'fill-code'
  | 'guess-output';

export type MiniGameTemplate =
  | 'spot-bug'
  | 'guess-output'
  | 'rearrange-code'
  | 'generic';

export interface MiniGame {
  id: MiniGameId;
  title: string;
  subtitle: string;
  iconUrl?: string;
  template: MiniGameTemplate;
  languageLabel: string;
  codeSnippet: string;
  xpRewardLabel: string;
  // coinRewardLabel: string;
  ctaLabel: string;
  choiceOptions?: string[];
  fragmentOptions?: string[];
}

const fibonacciSnippet = `def fibonacci(n):
    if n == 0:
        return 0
    elif n == 1:
        return 1
    else:
        return fibonacci(n) + fibonacci(n-1)`;

const fibonacciSnippet_blank = `def fibonacci(n):
    if _________:
        return 0
    elif n == 1:
        return 1
    else:
        _________________`;

const fibonacciSnippet_rearrange = `def fibonacci(n):
    [[if n == 0:]]
        return 0
    [[elif n == 1:]]
        return 1
    [[else:]]
        return fibonacci(n-1) + fibonacci(n-2)`;

export const miniGames: MiniGame[] = [
  {
    id: 'spot-bug',
    title: 'Spot It',
    subtitle:
      'Find the logical error preventing this function from terminating.\nBe quick, the clock is ticking!',
    iconUrl: spotBugIconUrl,
    template: 'spot-bug',
    languageLabel: 'python',
    codeSnippet: fibonacciSnippet,
    xpRewardLabel: '+150 XP',
    // coinRewardLabel: '+20 Coins',
    ctaLabel: 'Let Rush!',
  },
  {
    id: 'rearrange-code',
    title: 'Rearrange Code',
    subtitle: 'Drag snippets into the correct order to build valid solutions.',
    iconUrl: rearrangeCodeIconUrl,
    template: 'rearrange-code',
    languageLabel: 'python',
    codeSnippet: fibonacciSnippet_rearrange,
    xpRewardLabel: '+120 XP',
    // coinRewardLabel: '+15 Coins',
    ctaLabel: 'Let Rush!',
    fragmentOptions: ['else:', 'if n == 0:', 'elif n == 1:'],
  },
  {
    id: 'fill-code',
    title: 'Fill Code',
    subtitle: 'Complete missing lines and test your coding intuition.',
    iconUrl: fillCodeIconUrl,
    template: 'generic',
    languageLabel: 'python',
    codeSnippet: fibonacciSnippet_blank,
    xpRewardLabel: '+120 XP',
    // coinRewardLabel: '+15 Coins',
    ctaLabel: 'Let Rush!',
  },
  {
    id: 'guess-output',
    title: 'Guess Output',
    subtitle:
      'Find the the target and hit as hard as u can!\nPick, Click and Tick ✅',
    iconUrl: guessOutputIconUrl,
    template: 'guess-output',
    languageLabel: 'python',
    codeSnippet: fibonacciSnippet,
    xpRewardLabel: '+150 XP',
    // coinRewardLabel: '+20 Coins',
    ctaLabel: 'Let Rush!',
    choiceOptions: ['A', 'B', 'C', 'D'],
  },
];
