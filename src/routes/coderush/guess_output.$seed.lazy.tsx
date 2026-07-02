import { createLazyFileRoute } from '@tanstack/react-router';
import { GuessOutputScreen } from '../../features/coderush/guess-output/GuessOutputScreen';

export const Route = createLazyFileRoute('/coderush/guess_output/$seed')({
  component: GuessOutputRoute,
});

function GuessOutputRoute() {
  return (
    <main className="flex h-dvh flex-col bg-[#F9F9FF] text-neutral-900">
      <GuessOutputScreen />
    </main>
  );
}
