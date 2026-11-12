import BrutalistHero from '@/components/hero/BrutalistHero';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#020617] text-[#F8FAFC] overflow-x-clip">
      {/* Milestone 1: Editorial Brutalist Hero Section */}
      <BrutalistHero />

      {/* Anchor targets and staging placeholders for Milestones 2-5 */}
      <div id="about" className="sr-only" aria-hidden="true" />
      <div id="disciplines" className="sr-only" aria-hidden="true" />
      <div id="projects" className="sr-only" aria-hidden="true" />
      <div id="xai" className="sr-only" aria-hidden="true" />
      <div id="telemetry" className="sr-only" aria-hidden="true" />
      <div id="contact" className="sr-only" aria-hidden="true" />
    </main>
  );
}
