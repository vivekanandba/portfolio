---
title: 'Two wires, and a trade'
date: 2019-12-31
written: 2026-11-07
summary: 'A retired chip-industry veteran brought two wires to my repair bench. I offered a trade — my hardware for his software — and spent six months unable to keep my side. The way in was the part of the system I could already hold in my hands.'
kind: field-note
tags: [aircare, mapshalli, mentorship, raspberry-pi, linux, learning, cad-to-code]
projects: [aircare]
---

[AirCare](/work/aircare/) began, for me, with two wires. A man who had run divisions of a chip company in India walked into my repair store with a sensor board that needed them soldered. He was retired, and building air-quality monitors for the neighbourhood. I soldered them, and then I made him an offer: I will help you with the hardware. Please teach me software.

He agreed, and from then on I went to him once a month and sat beside him. What he gave me in that half hour was more than I could hold — most of it went over my head — but I went every month and let it wash over me. The arrangement was a trade, and for a long time only one side of it was being kept.

## My side

The hardware side I could do from the first week. Gadjoy had put me inside Bangalore's electronics trade, and I knew people who would sell me Raspberry Pis for much less than he would have paid. I looked for cheaper or simpler ways to get the same thing done, and I learned to assemble the unit — a laser particle sensor and a Pi in a modular electrical box, the whole node for about ₹7,500 in parts.

Then the units went out to hosts, and some came back. The sensor was a Chinese part we had opened up ourselves; there was no support for it anywhere in India, so we learned to repair it. And we learned something no datasheet says: a node fails because of *where people put it*. The sensor has to breathe the air it measures, so the node lives outdoors, and hosts would tuck it into a container to protect it; insects found the airflow cut-outs and moved in. We learned to read a dead node for that, clean it out, and debug what was left. That part came easily. A Pi on a bench is a thing you can hold.

The nodes earned their keep. One sat near a polluting industrial plant, and its readings gave the people living around it real evidence of the particulate matter coming off it — numbers instead of complaints, which is what the whole network was for.

## His side

The software was the other half of the trade, and I could not keep it. He handed me the codebase of the web app behind the network and asked for one small change: the charts were built with Bokeh, and he wanted them to show aggregations — readings by day of the week, by month of the year — rather than one long line. It was not a large codebase. I did not yet understand what he meant by an aggregation, and I could not make the change.

I did what I had been doing all year: looked at the code, failed to understand it, decided I needed a course first, and went off to take the course — which took longer than planned, because I was running a business and holding a job. Then the month was up and I went back to him with nothing. That happened, I think, six months in a row. I went every time, with my head down, and every time he gave me the hour anyway.

## The way in

When it came, the breakthrough was not in the app at all. It was in the box. To fix a node I had to get into it, which meant logging in to a Raspberry Pi — and so, finally, Linux: the terminal, the file system, doing things by typing rather than clicking. Everything I had failed to absorb from a screen of tutorials, I absorbed from a machine on my bench that had to work again by the evening.

That is the order it happened in, and I think the order matters. I had spent a year trying to learn software in the abstract. I learned it when it was attached to something physical that was broken — the wiring led me to the brain, not the other way round.

## Maintenance mode

After the build, AirCare settled into what most community projects become: a long stretch of maintenance. Nodes came back; we fixed them; the map stayed up. I was at Tech Mahindra by day and at Gadjoy around it, taking AI tutorials in whatever time was left. It was the pandemic, and [Stop Hunger](/work/stop-hunger/), that gave me enough uninterrupted time to build something software-first from start to finish — and that is where the trade was finally kept on both sides. Alongside the registry I built a route planner in Jupyter notebooks, clustering the settlements by latitude and longitude and routing within each cluster; I never found out whether the NGOs used it, but it was the first time I reached for the tools on purpose rather than because a course told me to.

The rest of that road — the book, the tutorial hell, the services job taken as a side door, and the call in November 2020 — is in [The body, the wiring, the brain](/writing/the-body-the-wiring-the-brain/). The raw account this was written from is in my [dated note of 7 November 2026](https://github.com/vivekanandba/portfolio/blob/main/source/my-notes/2026-11-07-aircare.md).
