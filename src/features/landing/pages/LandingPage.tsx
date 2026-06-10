import { TopNavbar } from '../../../components/layout/TopNavbar';
import { HeroSection } from '../components/HeroSection';
import { MissionSection } from '../components/MissionSection';
import { ToolsSection } from '../components/ToolsSection';
import { FooterSection } from '../components/FooterSection';
export const LandingPage = () => {
  return (
    <>
      <div className="min-h-screen bg-bg-default font-sans text-neutral-900">
        <TopNavbar />
        <HeroSection />
        <MissionSection />
        <ToolsSection />
        <FooterSection />
      </div>
    </>
  );
};
