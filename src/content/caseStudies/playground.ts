import type { CaseStudy } from '../schema';

export const playground: CaseStudy = {
  slug: 'playground',
  projectId: 'playground',
  eyebrow: 'Case Study · Sanas.ai',
  title: 'Playground — real-time audio orchestration at 430k requests a day',
  intro:
    'An ElevenLabs-style interactive web platform where Accent Translation, Noise Cancellation, and Language Translation run concurrently in a single session — on live audio, under a hard real-time latency budget.',
  metrics: [
    { value: '430k/day', label: 'requests in production' },
    { value: '<100ms', label: 'chunk latency' },
    { value: 'H100/T4', label: 'GPU autoscaling' },
  ],
  problem: [
    'An interactive platform for experiencing speech models live means running three heavyweight models concurrently in one session, on streaming audio, without letting any of them block the others.',
    'Audio is unforgiving: a chunk that misses its latency window is audible. The pipeline had to hold sub-100ms chunk latency while daily volume grew to 430k requests.',
  ],
  constraints: [
    'Sub-100ms chunk latency on live streams.',
    'Three concurrent model tracks (Accent Translation, Noise Cancellation, Language Translation) in one session.',
    'GPU capacity split across two platforms and two hardware classes — AWS EKS and Modal, H100 and T4.',
    '430k requests a day with automated autoscaling, not hand-tuned capacity.',
    'A public-facing ingress: hard file limits (30-second / 10MB), signature-based validation, malware scanning, reCAPTCHA v3, and a 10-minute asset TTL to control cost and abuse.',
  ],
  decisions: [
    {
      decision:
        'Triple-track asynchronous orchestration (FastAPI / Asyncio) — core translation alongside VAD masking and NVIDIA Sortformer speaker diarization — instead of a sequential pipeline.',
      tradeoff:
        'Concurrency logic is harder to reason about than a chain, but it is the only way the tracks share one session without head-of-line blocking.',
    },
    {
      decision: 'NVIDIA Triton inference served over gRPC rather than HTTP.',
      tradeoff:
        'A heavier integration than plain HTTP, bought back in wire efficiency and streaming semantics that keep chunk latency under 100ms.',
    },
    {
      decision: 'Automated autoscaling across AWS EKS and Modal (H100/T4 GPUs).',
      tradeoff:
        'Two control planes to operate — in exchange for elastic capacity across both classes of GPU hardware.',
    },
    {
      decision:
        'An eager-ingestion speculative layer: intercept the upload, resample to 16 kHz mono PCM, and pre-compute ElevenLabs voice cloning (IVC) and the core translation in the background before the user hits go.',
      tradeoff:
        'Spends compute on work that may be discarded, so the result is ready the moment the user asks for it.',
    },
    {
      decision:
        'Elementwise binary-mask multiplication between synthesized audio outputs and VAD tracking maps.',
      tradeoff:
        'An extra signal-processing pass on every chunk — it eliminated AI audio hallucinations at the output stage instead of hoping the models behave.',
    },
  ],
  results: [
    { value: '430k/day', label: 'requests in production' },
    { value: '<100ms', label: 'chunk latency held' },
  ],
  resultsNote:
    'Deployed live as the corporate showcase at sanas.ai/#playground — the "Live demo" link on the project card goes straight to it.',
  diagramId: 'playground',
  seoDescription:
    'Case study: a triple-track asynchronous audio orchestration pipeline (FastAPI/Asyncio, Triton gRPC, AWS EKS + Modal) holding sub-100ms chunk latency at 430k requests a day.',
};
