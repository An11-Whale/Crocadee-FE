import { createLazyFileRoute } from '@tanstack/react-router';
//trang chủ
export const Route = createLazyFileRoute('/')({
  component: () => (
    <h1 className="text-6xl font-bold text-green-400 drop-shadow-lg">
      Hello World 👋
    </h1>
  ),
});
