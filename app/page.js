
import Navbar from "../components/Navbar";
import HeroSection from "@/components/HeroSection";
import LibrarySection from "@/components/LibrarySection";
export default function Home() {
  return (
    <main className="min-h-screen bg-[#0c0d10]">
      <Navbar />
      <HeroSection />
      <LibrarySection />
    </main>
  );
}
