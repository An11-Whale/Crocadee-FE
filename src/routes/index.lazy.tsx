import { createLazyFileRoute } from '@tanstack/react-router';
//trang chủ
export const Route = createLazyFileRoute('/')({
  component: () => (
    <main className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <h1 className="text-6xl font-bold text-green-400 drop-shadow-lg">
        Hello World 👋
      </h1>
    </main>
  ),
});
