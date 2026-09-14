---
title: 'Three hundred amps at stirring speed'
date: 2015-12-31
written: 2026-09-14
summary: 'Godrej wanted a slip ring rated three hundred amps for stirring spent nuclear fuel. Everything the ISRO transfer had taught us was about miniature rings carrying almost no current. I was twenty-five, and it took a retired principal, a wire market in Chickpet and two months in Vikroli.'
kind: field-note
tags: [legend-technologies, slip-rings, igcar, nams-2015, manufacturing]
projects: [igcar-slipring]
---

Godrej & Boyce came to us because we had the technology. Legend held a transfer from ISRO's Vikram Sarabhai Space Centre for the design of slip rings, and that made us one of a short list of vendors they would even talk to.

Then they told us the rating: **three hundred amps at five volts DC.**

Everything the transfer had taught us was about the opposite of that. Read the reference on the document itself and it says so — *Technology Transfer Document for Miniature Slip-Ring*. Miniature. Satellite rings, ten channels, signal-level currents. Now we were being asked for a ring to sit on top of a stirrer in the high-temperature electro-refining of spent nuclear fuel, carrying a current the design rules had never been asked to think about.

We bid it, we won it, and delivering it became mine.

## The deviation was not the current. It was the current at that speed.

High amperage generates heat at every contact. Normally some of what saves you is motion — a ring turning quickly spreads the wear and the heat around its circumference.

This one turned at two hundred rpm. It was a stirrer. It had all the time in the world.

So the good news and the bad news were the same fact: low speed meant no violent wear, and it also meant that whatever heat we made at a contact stayed where we made it. Sizing that — how much copper, how much contact area, how much temperature rise we could accept — was the first thing we had to answer, and we answered it in spreadsheets before we drew anything.

## I called my old principal

I did not know how to do this alone, and I was young enough to say so.

My principal from engineering college had retired by then. I went back to him — through the company, properly — and consulted him on the design side. He is the reason some of the early choices are right rather than merely defensible.

I have not named him here. He did not ask to appear on a stranger's website, and being someone's teacher is not consent.

## Eleven components, each with a reason

By the end there were eleven unique components in that ring, and I can still tell you why each one is what it is. Stainless steel for the shaft, because of the rotating stresses. Polyurethane compound for the shaft insulation, because it adheres and cures cleanly. Aluminium for the sleeves and the skeleton and everything not carrying load, because weight is free to add and expensive to remove. Beryllium copper for the brush wires, gold plated — the plating is what stops the powder formation that had been killing the older silver-graphite design in service.

The electrical problem underneath all of it was keeping the channels apart. Each ring needed enough insulation resistance that current could not jump to its neighbour, and the wires leaving the assembly had to carry their current without inducing it into the wire lying beside them. That is not a drawing problem. That is a materials problem, and it is why I spent days in **Chickpet** in Bangalore, walking an industrial market with a specification in my head, looking for wire and insulation that could do what the calculation said they had to.

## What the shop taught me

The shaft needed perpendicularity and concentricity, because the bearings and the contact rings both seat on it. Which means every dimension has to be machined **in one setting** — take the part out of the chuck between operations and the centre moves, however carefully you re-set it.

Electrode-grade copper is soft. Too soft to turn to the tolerance we needed the ordinary way. So the rings were turned while they were still part of the shaft — inner diameter first on the full shaft, then the outer diameter and eight grooves on a mandrel — and only then cut apart, each ring separated from the next by **electro-discharge machining**.

Wire EDM was new to me. Some of the small, intricate features simply could not be reached by conventional machining, and I learned the process on this job because the part demanded it. Same with the keyway that ties the ring's shaft to the customer's hollow shaft, so the whole thing turns as one.

I wrote the process sheets for all of it — the sequence, the work centre, the dimension at each stage — so production could build it without me standing there, and quality could check it against something.

## Nowhere to test it

Then the part that nobody plans for.

The quality plan said we had to demonstrate performance for one hour at rated load. Rated load was three hundred amps at five volts DC. **Even CPRI could not supply it.** The national laboratory people go to for exactly this could not give us the current we needed, at the voltage we needed it, to prove our own product.

We tested everything else — contact resistance under a hundred milliohms per ring static and a hundred and fifty dynamic, insulation over two hundred megohms at five hundred volts, electrical noise, plating thickness by XRF, ultrasonic examination on every unit — in an MSME lab before it left Bangalore. The full-load hour was the one line in the plan the country's infrastructure could not hand us.

## Two months in Vikroli

Then I went to Mumbai and stayed.

Integration at Godrej's Vikroli works took the better part of two months. I sat with their engineers, and we found what a prototype always tells you and a drawing never does. The brush contact we had built as a solid rod was wearing in real use.

So we changed it. We replaced the rod with **fibres** — many fine strands instead of one solid piece, each given its own stiffness, so that contact is shared across dozens of small compliant points rather than one hard one. I found a workshop somewhere in Mumbai that could make them, and went shopping for beryllium copper again, in another city's wire market.

I modified the process sheets there, on site, so that what we had learned in integration became what the shop would build next time.

## The paper

That whole education — the sizing, the materials, the one-setting machining, the EDM, the test plan we could not fully satisfy — went into a paper. *A Typical Development of High Amperage Slip Ring*, with the founder, presented at the National Aerospace Manufacturing Seminar in Thiruvananthapuram in November 2015, and printed in the proceedings alongside work from ISRO's own centres.

I was twenty-five. I went and presented it myself.

The whole thing is on this site now: [the paper as it was printed](/papers/nams-2015-high-amperage-slip-ring.pdf), and [the project page](/work/igcar-slipring/) rebuilt on its numbers rather than on my memory. If you want to know whether any of the above is true, that is where to check.
