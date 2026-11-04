
import Navbar from "../components/Navbar";
import HeroSection from "@/components/HeroSection";
import LibrarySection from "@/components/LibrarySection";
import MainFooter from "@/components/MainFooter";
export default function Home() {
  return (
    <main className="min-h-screen bg-[#0c0d10]">
      <Navbar />
      <HeroSection />
      <LibrarySection />
      <MainFooter />
    </main>
  );
}
