import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { TurningPoints } from '@/components/TurningPoints';
import { Experience } from '@/components/Experience';
import { AiPractice } from '@/components/AiPractice';
import { Skills } from '@/components/Skills';
import { Recommendations } from '@/components/Recommendations';
import { Timeline } from '@/components/Timeline';
import { Now } from '@/components/Now';
import { Credentials } from '@/components/Credentials';
import { Contact } from '@/components/Contact';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TurningPoints />
        <About />
        <Experience />
        <AiPractice />
        <Skills />
        <Recommendations />
        <Timeline />
        <Now />
        <Credentials />
      </main>
      <Contact />
    </>
  );
}
