# NAMS 2015 — “A Typical Development of High Amperage Slip Ring”

The one peer-reviewed publication from my mechanical years, and the most checkable single source on
this site for the Godrej / IGCAR slip ring (ADR-0013: a published paper outranks a capability deck).

|                |                                                                                                                       |
| -------------- | --------------------------------------------------------------------------------------------------------------------- |
| Title          | A Typical Development of High Amperage Slip Ring                                                                      |
| Authors        | Ranga Reddy (Legend Technologies Pvt Ltd & Enti Innovations Pvt Ltd) and **B. Vivekanand** (Enti Innovations Pvt Ltd) |
| In             | _NAMS 2015 — Proceedings of the National Aerospace Manufacturing Seminar_, “Make in India: the Aerospace Scenario”    |
| Organised by   | Society of Aerospace Manufacturing Engineers (SAME), Thiruvananthapuram                                               |
| Held           | 27–28 November 2015                                                                                                   |
| Paper          | F 17, pages 288–295, in the **Design and Fabrication** section                                                        |
| Presented      | By me, at Thiruvananthapuram                                                                                          |
| Served PDF     | `public/papers/nams-2015-high-amperage-slip-ring.pdf` — linked from the credentials section                           |
| PDF sha256     | `4d5b26e66b1a0b4ca31deaf5715e33862daa17cba17dc70ec6ed8878b88aee68`                                                    |
| Assembled with | `scripts/paper-pdf.py` (deterministic; `--verify` reproduces it byte-for-byte from the same photographs)              |

## What the PDF contains, and why only this much

Ten pages: the volume cover, the contents page carrying this paper's index line, and the paper itself
(288–295). Reproducing my own paper is ordinary self-archiving. The contents page is included because
it is the context — it shows the paper sitting among work from ISRO centres — and a page of titles and
author names from a published proceedings is bibliographic record, not personal data. The rest of the
volume is other people's work and is not reproduced.

The page photographs the PDF is built from were taken by me on 2026-09-14 from my own copy of the
book. They are not in the repository: each is about 3 MB, over the 2 MiB hygiene ceiling, and the PDF
is the artefact the site serves. The book itself is the archival copy.

## Transcript of the substance

Quoted and summarised from the paper so its numbers can be cited in a content-file comment without
opening the PDF. Page numbers are the printed ones.

**Abstract (p288, verbatim).** “Godrej & Boyce Manufacturing Limited had approached us to develop a
high amperage slip ring for commercial applications with specifications of 300A & 5V DC [1]. Legend
Technologies Pvt Ltd has been involved in Slip Ring Design, Development & Testing for almost 25 years,
but this was a unique challenge to us. We had a transfer of technology from ISRO about the basic design
of slip rings [2].”

**Introduction (p288).** The problems with the earlier technology: silver-graphite powder formation
after a period of use leading to short circuits between channels; continuity problems between rotor and
stator; water ingress; frequent maintenance and lubrication; slippage of brush blocks between channels;
more power required because of friction. The answer: beryllium-copper wire against electrode-grade
copper rings with U-groove technology; special epoxy potting compound with fixtures for insulation;
gold plating on rings and brush wires; a printed circuit board designed for the application; ingress
protection sealing. Stated results: no powder formation and better conductivity, high conductivity and
long life from the gold plating, continuity and better assembly from the PC board, protection from dust
and water, wear avoided, better insulation from the potting compounds, **life increased to 15 years**,
maintenance free.

**Design and materials (p289).** Critical parameters: bearings, brush wires, electrical, lead wires,
structural and thermal. **11 unique components** were developed for the application. The shaft is
stainless steel for the rotating stresses; shaft insulation is polyurethane compound for adherence and
curing; sleeves, skeleton and most non-loaded components are aluminium to keep weight down; brush wires
are beryllium copper, gold plated, to prevent dust formation and for conductivity and life.

**Preliminary design (p289–290).** Done in spreadsheets. Table 1 sample thermal calculation: 5 V DC,
wire length 0.1 m, loss 5%, area 0.5 mm², 30 A, 30 hr, copper density 8960 kg/m³, Cp 390 J/kg·K, Be-Cu
modulus 1.38 × 10¹¹ N/m², static friction (Au–Au) 0.3, **200 rpm**, contact radius 34 mm, resistivity
1.68 × 10⁻⁸ Ω·m, diameter 0.797885 mm, resistance 3.36 × 10⁻⁹ Ω, power loss 3.02 × 10⁻⁶ W, 0.326592 J,
volume 5 × 10⁻⁸ m³, mass 0.000448 kg, **temperature rise 1.869231 K**.

**Analysis (p291–292).** Vibration testing was a concern; natural frequency and mode shapes were
obtained and cross-referenced for resonant failure. Table 2 load cases: 200 rpm with vibrations at
3 Hz; sinusoidal vibration 5–13 Hz at ±6 mm constant displacement and 13–500 Hz at 15 m/s² constant
acceleration, 1 hour per axis (X, Y, Z), sweep rate 1 octave/minute; temperature 55 °C ± 3 °C with the
equipment ON during the last hour, 16 hours of exposure; temperature 70 °C ± 3 °C, storage 16 hours
OFF, recovery time 3 hours.

**Production (p292–293).** Turning, machining, electro-discharge machining, broaching and drilling.
The shaft needed perpendicularity and concentricity for correct seating of bearings and contact rings,
so **all dimensions had to be machined in one setting** — re-chucking between operations would move the
centre. Copper's low tensile strength makes the contact rings hard to turn to tolerance, so the ID was
turned on the full shaft, the OD and grooving done with a mandrel, and the rings then **cut out of the
shaft with EDM**. Table 3 process plan: inspect raw material; load Ø115 ID × Ø135 OD × 69.5; face
69.5 → 68.5; turn ID 115 → 118; fit mandrel; turn OD 135 → 132; groove to Ø4.5 at eight places, 8.5 mm
apart; face the other side 68.5 → 67.5; EDM to separate each ring; inspect and record.

**Testing (p293–294).** “The most vital part of our problems was in the testing, as even CPRI were
unable to provide us the required 300A at 5VDC.” Table 4 quality assurance plan: static contact
resistance **< 100 mΩ per ring** and dynamic **< 150 mΩ per ring at 200 rpm**, each channel, by test
circuit and oscilloscope; insulation resistance **> 200 MΩ at 500 V DC** by megger, between any two
rings and between ring and body; static and dynamic continuity input to output by multimeter;
electrical noise **< 5 mV/Amp/Ring** with the unit rotated at 200 rpm; plating **> 2 microns** on all
contact rings and brush wires by XRF; performance testing for one hour at rated load, 100%, external
lab report; non-destructive ultrasonic (pulse-echo) examination, 100%.

**Conclusion (p294).** The paper is offered as “a blueprint to others who look for the processes, the
thoughts, the actions that go into developing a functional product”.

**References (p295).** [1] Godrej Precision Engineering, “Material Take Off for Slip Rings”, Mumbai, 2015. [2] Vikram Sarabhai Space Centre, “Technology Transfer Document for Miniature Slip-Ring”,
Thiruvananthapuram, **2001**. [3] Legend Technologies, “Process and Quality Manual for 8 Channel High
Amperage Slipring Assembly REV-01”, Bangalore, 2015. [4] Legend Technologies, “Quality Assurance Plan”,
Bangalore, 2015.

## Contradictions this source creates, recorded not reconciled (CON-DATA-003)

| Point                        | The paper (2015, published)                                     | Elsewhere                                                              | On the site                                                    |
| ---------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------- |
| Paper title                  | “A Typical Development of High Amperage Slip Ring”              | The site said “Design & Development of a High-Amperage Slip Ring”      | **Corrected to the printed title**, with the authors and pages |
| Direct customer              | Godrej & Boyce Manufacturing Limited, “commercial applications” | Legend deck s58: “High Temperature Electro-Refining · Godrej \| IGCAR” | Both: Godrej the customer, IGCAR the end use                   |
| Rating                       | 300 A at 5 V DC                                                 | Not stated anywhere else                                               | **Now stated, cited to the paper**                             |
| ToT year                     | Reference [2] dated 2001                                        | Legend deck s39: “Technology Transfer … By VSSC - Year 2000”           | Both dates named where the transfer is mentioned               |
| Company slip-ring experience | “almost 25 years” as of 2015                                    | Legend founded 1998 (deck s74) — 17 years by 2015                      | Not repeated; it is the paper's own loose phrasing             |

## Reproduce

```sh
python3 scripts/paper-pdf.py --src <folder of page photographs> \
  --out public/papers/nams-2015-high-amperage-slip-ring.pdf            # rebuild
python3 scripts/paper-pdf.py --src <folder> \
  --out public/papers/nams-2015-high-amperage-slip-ring.pdf --verify   # byte-for-byte check
```

CI cannot run this — the photographs are not in the repository — so the sha256 above is the check that
travels with the repo.
