import type { Tour } from './schema';

/**
 * Audience paths (ADR-0012). Each tour is an editorial answer to "what should
 * this person see, in what order, and why". Stop targets must resolve
 * (test-enforced) so a renamed section or project cannot silently break a tour.
 */
export const tours: Tour[] = [
  {
    id: 'hiring',
    label: "I'm hiring",
    stops: [
      { target: '#turning-points', note: 'Five decisions — the judgement you are hiring.' },
      {
        target: 'sanas-consumer-app',
        note: 'Zero to a shipped consumer app in under four weeks.',
      },
      { target: '#recommendations', note: 'What managers, a CEO and co-inventors say.' },
      { target: '#credentials', note: 'Granted patent, 34 linked certifications.' },
      { target: '#contact', note: 'The resume, and how to reach me.' },
    ],
  },
  {
    id: 'engineer',
    label: "I'm an engineer",
    stops: [
      {
        target: 'speech-intelligence',
        note: 'A privacy-first analytics platform — architecture included.',
      },
      {
        target: 'healthcare-interop',
        note: 'HL7/DICOM done properly, tested against a virtual hospital.',
      },
      { target: 'vssc-tooling', note: 'Where the rigour comes from: PSLV flight hardware.' },
      { target: '#agents', note: 'How I direct AI agents — the operating loop.' },
      { target: '#skills', note: 'The full stack, grouped honestly.' },
    ],
  },
  {
    id: 'builder',
    label: "I'm building something",
    stops: [
      { target: '#turning-points', note: 'The bets, with their costs stated.' },
      { target: 'gadjoy', note: 'A business built to run without its founder — nine years on.' },
      { target: 'sanas-for-sales', note: 'Concept to enterprise GA inside a company.' },
      { target: 'aircare', note: 'Hardware cheap enough to hand a neighbour.' },
      { target: '#contact', note: "Let's talk." },
    ],
  },
];
