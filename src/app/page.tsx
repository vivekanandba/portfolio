import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Experience } from '@/components/Experience';
import { Skills } from '@/components/Skills';
import { Timeline } from '@/components/Timeline';
import { Credentials } from '@/components/Credentials';
import { Contact } from '@/components/Contact';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Timeline />
        <Credentials />
      </main>
      <Contact />
    </>
  );
}
