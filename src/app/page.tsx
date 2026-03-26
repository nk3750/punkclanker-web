import Hero from "@/components/Hero";
import ActivityFeed from "@/components/ActivityFeed";
import Projects from "@/components/Projects";
import StatsDashboard from "@/components/StatsDashboard";
import WorkLog from "@/components/WorkLog";
import About from "@/components/About";
import Footer from "@/components/Footer";
import AsciiDivider from "@/components/AsciiDivider";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <AsciiDivider />
      <About />
      <AsciiDivider />
      <Projects />
      <AsciiDivider />
      <StatsDashboard />
      <AsciiDivider />
      <ActivityFeed />
      <AsciiDivider />
      <WorkLog />
      <AsciiDivider />
      <Footer />
    </main>
  );
}
