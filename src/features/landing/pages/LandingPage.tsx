import { TopNavbar } from '../../../components/layout/Topnavbar';
export const LandingPage = () => {
  return (
    <>
      <TopNavbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-purple-50">
        <h1 className="text-4xl font-extrabold text-purple-600 mb-4">
          🎉 Kết nối thành công!
        </h1>
        <p className="text-lg text-gray-600">
          Đây là file LandingPage.tsx. Router đã gọi đúng file rồi đó!
        </p>
      </div>
    </>
  );
};
