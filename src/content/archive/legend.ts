import type { ArchiveEntry } from '../schema';

/**
 * The Legend archive (ADR-0016): every catalogued item from the two capability
 * decks I authored at Legend Technologies / ENTI Innovations, written from the
 * redacted transcripts under source/decks/. Each entry cites its slides; the
 * coverage test requires every slide of both decks to be cited here or listed
 * in ./exclusions.ts. Dates are tri-state; `requested` names the row in
 * source/records/legend-programmes.md that asks me for the record.
 */
const L = 'legend-company-v5.5' as const;
const E = 'enti-corporate-v1.4-taml' as const;
const LP = 'Photo: Legend Technologies (India) Pvt. Ltd. — capability deck v5.5';
const LR = 'Render: Legend Technologies (India) Pvt. Ltd. — capability deck v5.5';
const EP = 'Photo: ENTI Innovations Pvt. Ltd. — corporate deck v1.4';
const ER = 'Render: ENTI Innovations Pvt. Ltd. — corporate deck v1.4';
const known = (label: string) => ({ status: 'known', label }) as const;
const REQUESTED = { status: 'requested' } as const;
const ENTI_DATE = 'ENTI deck v1.4 — compiled 2016 or later; its event photographs are from 2013';
/** Eleven of the twelve configurations share one records row: which were mine, and when. */
const CONFIGS = 'slipring-configurations';

export const legendArchive: ArchiveEntry[] = [
  // ------------------------------------------------------------- company context
  {
    id: 'legend-founded-1998',
    era: 'legend',
    title: 'Legend Technologies founded, 1998',
    category: 'company',
    summary:
      'E. Ranga Reddy founded Legend Technologies in 1998 to design and fabricate aerospace assembly jigs end to end; both decks describe twenty-five years of aerospace design, manufacturing, assembly and tool-making behind it, with special-purpose machines and test rigs built and commissioned for programmes across India. This is the company I joined in January 2013.',
    when: known('1998'),
    role: 'company-before',
    sources: [
      { deck: L, slides: [74] },
      { deck: E, slides: [21] },
    ],
  },
  {
    id: 'legend-company-profile',
    era: 'legend',
    title: 'What the company was: medium-scale precision engineering for aerospace and defence',
    category: 'company',
    summary:
      'A medium-scale precision engineering industry offering end-to-end, cost-effective solutions for the aerospace and defence markets: design and fabrication of aerospace tooling, manufacture and assembly of aerospace structures, design and fabrication of high-tech slip rings, and turnkey projects — design, development, installation and testing of tools, jigs and fixtures with component fabrication and assembly. Fourteen years of programmes by the deck’s date: LCA, ALH, SARAS, IJT, PSLV and GSLV. The deck also states the company’s position as the only VSSC/ISRO licensee for the design and manufacture of precision slip rings — its claim, cited as such.',
    when: known('as stated in the 2017–18 deck'),
    role: 'workplace',
    sources: [{ deck: L, slides: [3, 4, 6] }],
    project: 'legend-technologies',
  },
  {
    id: 'legend-factory-and-shop',
    era: 'legend',
    title: 'The factory: admin block, hangar, machine shop, clean room, inspection',
    category: 'facilities',
    summary:
      'Where the work happened. An aircraft hangar for the large jigs; a CNC turning centre (270 mm maximum diameter, 550 mm turning length) and a HAAS CNC machining centre (X 1016 mm, Y 635 mm, Z 508 mm); a radial drilling machine and a heat-treatment oven; a class 10,000 clean room for assembly, testing and inspection; an assembly section with fitting and soldering benches; and a quality room. The shop floor I sat on with the lathe, CNC, milling and welding operators.',
    when: known('my workplace, 2013–2018 — photographed for the 2017–18 deck'),
    role: 'workplace',
    recordsId: 'factory-facilities',
    sources: [{ deck: L, slides: [80, 81, 82, 83, 84, 85] }],
    media: [
      {
        file: 'media/legend-admin-block.jpg',
        alt: 'The company’s admin block: a two-storey cream building with red trim and a glazed façade behind garden beds',
        credit: `The admin block. ${LP}, slide 80`,
      },
      {
        file: 'media/legend-aircraft-hangar.jpg',
        alt: 'The aircraft hangar: a tall steel-framed bay with assembly jigs on the floor',
        credit: `The hangar. ${LP}, slide 81`,
      },
      {
        file: 'media/legend-cnc-turning-centre.jpg',
        alt: 'A CNC turning centre in the machine shop, its cream-and-blue enclosure closed, a red stop button on the door',
        credit: `The CNC turning centre — 270 mm diameter, 550 mm length. ${LP}, slide 82`,
      },
      {
        file: 'media/legend-haas-cnc-machining-centre.jpg',
        alt: 'The HAAS CNC machining centre in the machine shop',
        credit: `The HAAS machining centre — X 1016, Y 635, Z 508 mm. ${LP}, slide 82`,
      },
      {
        file: 'media/legend-radial-drilling-machine.jpg',
        alt: 'A radial drilling machine in the machine shop, its arm and table over a slotted base, asset-tagged',
        credit: `The radial drilling machine. ${LP}, slide 83`,
      },
      {
        file: 'media/legend-heating-oven.jpg',
        alt: 'A heat-treatment furnace with its control panel: a cylindrical pit furnace beside a blue cabinet of gauges and indicator lamps',
        credit: `The heating oven and its control panel. ${LP}, slide 83`,
      },
      {
        file: 'media/legend-clean-room-entrance.jpg',
        alt: 'The entrance to the clean room, a glazed door with an air-lock vestibule',
        credit: `The clean room entrance. ${LP}, slide 84`,
      },
      {
        file: 'media/legend-inspection-room.jpg',
        alt: 'The inspection room: a granite surface table and measuring instruments under fluorescent light',
        credit: `The quality room. ${LP}, slide 85`,
      },
    ],
  },
  {
    id: 'legend-awards-2001-2012',
    era: 'legend',
    title: 'Awards and recognitions, 2001–2012',
    category: 'company',
    summary:
      'The SIATI excellence award in aerospace indigenisation (2001), the Udyog Bharti award (2011), a Best Alumni award (2011) and the IIFS award (2012) — the company’s, all before my time. The award-ceremony photographs show identifiable people and were not extracted; the names and years are kept as text.',
    when: known('2001 – 2012'),
    role: 'company-before',
    sources: [{ deck: L, slides: [92, 93, 94, 95] }],
  },
  {
    id: 'legend-certifications-2018',
    era: 'legend',
    title: 'ISO 9001:2015 and AS9100D certification — 30 May 2018',
    category: 'company',
    summary:
      'Both certificates are dated 30 May 2018, four months after I left, so the site does not claim them. Their scope is worth recording because it describes the company I worked in: design, manufacture and servicing of assembly jigs and tools; manufacture of components and assemblies of aerospace projects and slip rings for space vehicles and other applications. The deck’s slide title still says ISO 9001:2008; the certificate it shows is 9001:2015. The certificate images carry the certifying body’s signatory’s signature and were removed from the source tree.',
    when: known('30 May 2018 — after my time (to Jan 2018); not claimed'),
    role: 'company-after',
    sources: [{ deck: L, slides: [97, 98] }],
  },

  // ------------------------------------------------------------- turnkey jigs
  {
    id: 'lca-front-fuselage-jig',
    era: 'legend',
    title: 'Front fuselage assembly jig for the LCA',
    customer: 'ARDC, HAL',
    category: 'turnkey-jigs',
    summary:
      'A 7 m × 5 m × 4 m assembly jig for the Tejas front fuselage — the CAD model, the jig as built and the jig in its bay. Shown in the hub gallery as a company programme before my time; the records table asks me to confirm the date.',
    when: REQUESTED,
    role: 'company-before',
    recordsId: 'lca-front-fuselage-jig',
    sources: [{ deck: L, slides: [7] }],
    media: [
      {
        file: 'media/legend-lca-front-fuselage-jig-cad.jpg',
        alt: 'CAD model of the LCA front fuselage assembly jig: a boxed steel frame with locating stations around the fuselage envelope',
        credit: `Front fuselage jig for the LCA — CAD. ${LR}, slide 7`,
      },
    ],
    project: 'legend-technologies',
  },
  {
    id: 'lch-coupling-jig',
    era: 'legend',
    title: 'Coupling jig for the LCH',
    customer: 'RWRDC, HAL',
    category: 'turnkey-jigs',
    summary:
      'A 14 m × 5 m × 4 m coupling jig for the Light Combat Helicopter — the largest jig in the deck — in CAD and as built. Undated in the deck; the records table asks me for the year and whether it was before or during my time.',
    when: REQUESTED,
    role: 'company-undated',
    recordsId: 'lch-coupling-jig',
    sources: [{ deck: L, slides: [8] }],
    media: [
      {
        file: 'media/legend-lch-coupling-jig.jpg',
        alt: 'The LCH coupling jig as built: a long yellow steel frame spanning the hangar floor with locating stations along its length',
        wide: true,
        credit: `LCH coupling jig, 14 m long. ${LP}, slide 8`,
      },
      {
        file: 'media/legend-lch-coupling-jig-cad.jpg',
        alt: 'CAD model of the LCH coupling jig',
        credit: `LCH coupling jig — CAD. ${LR}, slide 8`,
      },
    ],
    project: 'legend-technologies',
  },
  {
    id: 'lch-tail-boom-jig',
    era: 'legend',
    title: 'Tail-boom assembly jig for the LCH',
    customer: 'ARDC, HAL',
    category: 'turnkey-jigs',
    summary:
      'An inclined assembly jig holding the helicopter’s tail-boom frames on a stepped base, in CAD and as built with its access stair. Not shown anywhere else on the site until now; undated in the deck.',
    when: REQUESTED,
    role: 'company-undated',
    recordsId: 'lch-tail-boom-jig',
    sources: [{ deck: L, slides: [9] }],
    media: [
      {
        file: 'media/legend-lch-tail-boom-jig-cad.jpg',
        alt: 'CAD model of the LCH tail-boom assembly jig: an inclined orange frame holding the tail-boom’s coloured frames and a horizontal boom on a stepped base',
        credit: `LCH tail-boom jig — CAD. ${LR}, slide 9`,
      },
    ],
  },
  {
    id: 'rlv-td-assembly-jig',
    era: 'legend',
    title: 'Assembly jig for the RLV-TD — “the Indian space shuttle”',
    customer: 'VSSC, ISRO',
    category: 'turnkey-jigs',
    summary:
      'The reusable launch vehicle technology demonstrator sitting in its assembly jig, and the jig empty. The RLV-TD flew in May 2016, inside my time at Legend, which is why the hub shows it as supported; the deck’s own speaker note calls it the Indian space shuttle. The records table asks me for the month and my part.',
    when: REQUESTED,
    role: 'supported',
    recordsId: 'rlv-td-jig',
    sources: [{ deck: L, slides: [10] }],
    media: [
      {
        file: 'media/legend-rlv-td-on-jig.jpg',
        alt: 'The RLV-TD winged vehicle sitting in its yellow assembly jig inside the hangar',
        wide: true,
        credit: `RLV-TD in its assembly jig. ${LP}, slide 10`,
      },
      {
        file: 'media/legend-rlv-td-assembly-jig.jpg',
        alt: 'The RLV-TD assembly jig empty: a yellow frame of locating stations on the hangar floor',
        credit: `The jig, empty. ${LP}, slide 10`,
      },
    ],
    project: 'legend-technologies',
  },
  {
    id: 'ijt-rudder-assembly',
    era: 'legend',
    title: 'Rudder assembly for the IJT',
    customer: 'ARDC, HAL',
    category: 'turnkey-jigs',
    summary:
      'Rudder assembly tooling for the Intermediate Jet Trainer. The three photographs on the slide show identifiable people and were not extracted, so the item is text only here; undated in the deck.',
    when: REQUESTED,
    role: 'company-undated',
    recordsId: 'ijt-rudder-assembly',
    sources: [{ deck: L, slides: [11] }],
  },
  {
    id: 'alh-deck-jig',
    era: 'legend',
    title: 'Engine and transmission deck jig for the ALH',
    customer: 'Helicopter Division, HAL',
    category: 'turnkey-jigs',
    summary:
      'The assembly jig for the Advanced Light Helicopter’s engine and transmission deck, with its machined details. Shown in the hub gallery as a company programme before my time; to be confirmed.',
    when: REQUESTED,
    role: 'company-before',
    recordsId: 'alh-deck-jig',
    sources: [{ deck: L, slides: [12] }],
    media: [
      {
        file: 'media/legend-alh-deck-assembly-jig.jpg',
        alt: 'The ALH engine and transmission deck assembly jig: a welded steel frame with machined locators, in the hangar',
        credit: `ALH deck jig. ${LP}, slide 12`,
      },
    ],
    project: 'legend-technologies',
  },
  {
    id: 'gslv-mk3-middle-assembly-jig',
    era: 'legend',
    title: '½M (middle) assembly jig for GSLV Mk III',
    customer: 'Aerospace Division, HAL',
    category: 'turnkey-jigs',
    summary:
      'The assembly jig for the middle segment of the GSLV Mk III launch vehicle, and the structure it held. Undated in the deck; the records table asks.',
    when: REQUESTED,
    role: 'company-undated',
    recordsId: 'gslv-mk3-half-m-jig',
    sources: [{ deck: L, slides: [13] }],
    media: [
      {
        file: 'media/legend-gslv-mk3-middle-assembly-jig.jpg',
        alt: 'The GSLV Mk III middle-segment assembly jig: a ring of steel stations around a large cylindrical structure',
        credit: `GSLV Mk III ½M assembly jig. ${LP}, slide 13`,
      },
    ],
    project: 'legend-technologies',
  },
  {
    id: 'gslv-fin-assembly',
    era: 'legend',
    title: 'GSLV fin assembly panel',
    customer: 'VSSC, ISRO',
    category: 'turnkey-jigs',
    summary:
      'A fin assembly panel for the GSLV. It appears in the VSSC tooling gallery without a stated role; the records table asks for the year and my part.',
    when: REQUESTED,
    role: 'company-undated',
    recordsId: 'gslv-fin-panel',
    sources: [{ deck: L, slides: [14] }],
    media: [
      {
        file: 'media/legend-gslv-fin-panel.jpg',
        alt: 'A GSLV fin panel, a flat riveted aluminium structure, on a stand',
        credit: `GSLV fin panel. ${LP}, slide 14`,
      },
    ],
    project: 'vssc-tooling',
  },
  {
    id: 'lca-centre-fuselage-jig',
    era: 'legend',
    title: 'Centre fuselage jig for the LCA',
    customer: 'ARDC, HAL',
    category: 'turnkey-jigs',
    summary:
      'The centre fuselage assembly jig for the Tejas, in CAD. Shown in the hub gallery as a company programme before my time; to be confirmed.',
    when: REQUESTED,
    role: 'company-before',
    recordsId: 'lca-centre-fuselage-jig',
    sources: [{ deck: L, slides: [18] }],
    media: [
      {
        file: 'media/legend-lca-centre-fuselage-jig-cad.jpg',
        alt: 'CAD model of the LCA centre fuselage jig: a rectangular steel frame with locating stations around the centre fuselage',
        credit: `LCA centre fuselage jig — CAD. ${LR}, slide 18`,
      },
    ],
    project: 'legend-technologies',
  },
  {
    id: 'jaguar-station-25-fixture',
    era: 'legend',
    title: 'Assembly fixture, station 25, Jaguar aircraft',
    customer: 'Aircraft Division, HAL',
    category: 'turnkey-jigs',
    summary:
      'An assembly fixture for station 25 of the Jaguar. Shown in the hub gallery as a company programme before my time; to be confirmed.',
    when: REQUESTED,
    role: 'company-before',
    recordsId: 'jaguar-station-25-fixture',
    sources: [{ deck: L, slides: [19] }],
    media: [
      {
        file: 'media/legend-jaguar-station-25-fixture.jpg',
        alt: 'The Jaguar station-25 assembly fixture: a welded frame with machined locators, on the hangar floor',
        credit: `Jaguar station-25 fixture. ${LP}, slide 19`,
      },
    ],
    project: 'legend-technologies',
  },
  {
    id: 'boeing-cargo-door-jig-iai',
    era: 'legend',
    title: 'All-aluminium Boeing cargo under-carriage door assembly jig',
    customer: 'IAI, Israel',
    category: 'turnkey-jigs',
    summary:
      'An all-aluminium assembly jig for a Boeing cargo under-carriage door, built for Israel Aerospace Industries — the deck’s one export tooling job. The photograph’s embedded date is 2004, so the hub shows it as before my time.',
    when: REQUESTED,
    role: 'company-before',
    recordsId: 'boeing-cargo-door-jig-iai',
    sources: [{ deck: L, slides: [20] }],
    media: [
      {
        file: 'media/legend-boeing-cargo-door-jig.jpg',
        alt: 'The all-aluminium Boeing cargo-door assembly jig: an aluminium frame with locating stations, in the shop',
        credit: `Boeing cargo-door jig for IAI. ${LP}, slide 20`,
      },
    ],
    project: 'legend-technologies',
  },

  // ------------------------------------------------------------- assembly tooling & fixtures
  {
    id: 'pslv-nose-cone-tooling',
    era: 'legend',
    title:
      'PSLV strap-on nose cones and aft shrouds — SITVC, SONC/PSOM: jigs, process sheets, manufacture',
    customer: 'VSSC, ISRO',
    category: 'assembly-tooling',
    summary:
      'Assembly jigs for the PSLV’s strap-on nose cones and aft shrouds, and the cones and shrouds themselves. The ENTI deck describes the scope as creating detailed process sheets and carrying out manufacture for the highly critical strap-on nose cones (PSOM, SITVC and non-SITVC) to the client’s standards, after a study of the cones and standards — process sheets that ensured the manufacture “was carried out flawlessly”. The project page tells the story.',
    when: known(
      '2016 – 2018 · project page (LinkedIn Projects dates the nose-cone jigs from Jun 2017)',
    ),
    role: 'led',
    sources: [
      { deck: L, slides: [15, 16] },
      { deck: E, slides: [30, 31] },
    ],
    media: [
      {
        file: 'media/legend-sitvc-nose-cone-jig.jpg',
        alt: 'The SITVC nose-cone assembly jig with a cone in it, in the shop',
        credit: `SITVC nose-cone jig. ${LP}, slide 15`,
      },
      {
        file: 'media/legend-sitvc-cones-and-shrouds.jpg',
        alt: 'Finished SITVC nose cones and aft shrouds lined up on the floor',
        wide: true,
        credit: `Cones and shrouds, finished. ${LP}, slide 15`,
      },
      {
        file: 'media/enti-strap-on-nose-cone-cad.jpg',
        alt: 'CAD model of a PSLV strap-on nose cone',
        credit: `Strap-on nose cone — CAD. ${ER}, slide 30`,
      },
    ],
    project: 'vssc-tooling',
  },
  {
    id: 'cfm56-workstation-adapter',
    era: 'legend',
    title: 'CFM56 engine maintenance workstation adapter',
    customer: 'Air India (MRO)',
    category: 'assembly-tooling',
    summary:
      'An airline MRO group asked for a replica of its existing CFM56 workstation adapter with neither drawings nor models — only photographs. Design and analysis of the adapter assembly, then manufacture and erection at the client’s premises; the data was extrapolated from the team’s expertise, the incompatibilities of the original design overcome with known solutions, outdated parts replaced with current technology, and the production team brought in from inception to cut design iterations. The reverse-engineering project page tells the story.',
    when: known('2015 · project page (start month inferred — records row 21)'),
    role: 'led',
    sources: [
      { deck: L, slides: [21] },
      { deck: E, slides: [24, 25] },
    ],
    media: [
      {
        file: 'media/legend-cfm56-workstation-adapter.jpg',
        alt: 'The CFM56 workstation adapter erected at the client’s premises',
        credit: `CFM56 workstation adapter, erected. ${LP}, slide 21`,
      },
      {
        file: 'media/legend-cfm56-workstation-adapter-cad.jpg',
        alt: 'CAD model of the CFM56 workstation adapter',
        credit: `CFM56 adapter — CAD. ${LR}, slide 21`,
      },
    ],
    project: 'aero-reverse-engineering',
  },
  {
    id: 'spacecraft-stores-lifting-fixture',
    era: 'legend',
    title: 'Lifting and tilting fixture for loading stores on a spacecraft',
    customer: 'VSSC, ISRO',
    category: 'assembly-tooling',
    summary:
      'A fixture to lift and tilt stores for loading onto a spacecraft. In the VSSC tooling gallery without a stated role; the records table asks for the year and my part.',
    when: REQUESTED,
    role: 'company-undated',
    recordsId: 'spacecraft-stores-fixture',
    sources: [{ deck: L, slides: [22] }],
    media: [
      {
        file: 'media/legend-vssc-lifting-tilting-fixture.jpg',
        alt: 'The lifting and tilting fixture: a steel frame with a pivoting cradle for spacecraft stores',
        credit: `Lifting and tilting fixture. ${LP}, slide 22`,
      },
    ],
    project: 'vssc-tooling',
  },
  {
    id: 'beml-metro-spot-weld-fixture',
    era: 'legend',
    title: 'Metro side-panel spot-welding fixture',
    customer: 'BEML',
    category: 'assembly-tooling',
    summary:
      'A spot-welding fixture for metro-coach side panels — rail tooling before my rail years at Tech Mahindra. Undated in the deck; the records table asks.',
    when: REQUESTED,
    role: 'company-undated',
    recordsId: 'beml-metro-spot-weld-fixture',
    sources: [{ deck: L, slides: [23] }],
    media: [
      {
        file: 'media/legend-beml-metro-spot-welding-fixture.jpg',
        alt: 'The BEML metro side-panel spot-welding fixture: a long steel frame with clamps along a side panel',
        wide: true,
        credit: `Metro side-panel spot-welding fixture. ${LP}, slide 23`,
      },
    ],
    project: 'legend-technologies',
  },
  {
    id: 's200-integration-fixture',
    era: 'legend',
    title: 'S200 workstation integration fixture',
    customer: 'SHAR, ISRO',
    category: 'assembly-tooling',
    summary:
      'A nose-cone workstation integration assembly fixture for a launch vehicle, about 4 m tall, on a schedule of a little over a month including modelling, fabrication and assembly. Non-standard large parts were made in-house, the rest outsourced against the clock, and the project managed in a staggered way to compress the duration — delivered on time. An ENTI design case; my part and the month are in the records table.',
    when: REQUESTED,
    role: 'supported',
    recordsId: 's200-integration-fixture',
    sources: [
      { deck: L, slides: [24] },
      { deck: E, slides: [26, 27] },
    ],
    media: [
      {
        file: 'media/legend-s200-integration-fixture-cad.jpg',
        alt: 'CAD model of the S200 integration fixture: a tall steel structure with platforms around a nose-cone workstation',
        credit: `S200 integration fixture — CAD. ${LR}, slide 24`,
      },
      {
        file: 'media/legend-s200-integration-fixture.jpg',
        alt: 'The S200 integration fixture as built, about four metres tall',
        credit: `S200 integration fixture, built. ${LP}, slide 24`,
      },
    ],
    project: 'vssc-tooling',
  },
  {
    id: 'pw1100g-augmenter-extension',
    era: 'legend',
    title: 'Augmenter extension fixture for the PW1100G test cell',
    customer: 'Safran, CENCO',
    category: 'assembly-tooling',
    summary:
      'The augmenter extension for a PW1100G engine test cell. The ENTI deck’s slide for this item carries template text copied from another case; the photographs are its content. The project page tells the story with the record behind it.',
    when: known('Jun 2016 – Jun 2017 (LinkedIn Projects)'),
    role: 'led',
    sources: [
      { deck: L, slides: [25] },
      { deck: E, slides: [41] },
    ],
    media: [
      {
        file: 'media/legend-pw1100g-test-cell.jpg',
        alt: 'The PW1100G engine test cell with the augmenter extension fitted',
        credit: `PW1100G test cell. ${LP}, slide 25`,
      },
      {
        file: 'media/legend-pw1100g-augmenter-detail.jpg',
        alt: 'Detail of the augmenter extension: a large fabricated duct section with flanges',
        credit: `Augmenter detail. ${LP}, slide 25`,
      },
    ],
    project: 'pw-augmenter',
  },
  {
    id: 'nagpur-airflow-ramp-test-cell',
    era: 'legend',
    title: 'Air-flow ramp test-cell structure, Nagpur',
    customer: 'Safran, CENCO',
    category: 'assembly-tooling',
    summary:
      'The structural steelwork of an air-flow ramp for an engine test cell at Nagpur — the related cell job on the augmenter project page. The records table asks for the month and my part.',
    when: REQUESTED,
    role: 'supported',
    recordsId: 'nagpur-test-cell',
    sources: [{ deck: L, slides: [26] }],
    media: [
      {
        file: 'media/legend-nagpur-test-cell-1.jpg',
        alt: 'The Nagpur test-cell air-flow ramp structure under erection: heavy steel columns and inclined ramps',
        credit: `Nagpur test-cell structure. ${LP}, slide 26`,
      },
    ],
    project: 'pw-augmenter',
  },
  {
    id: 'gslv-access-platform',
    era: 'legend',
    title: 'GSLV access platform',
    customer: 'ISRO',
    category: 'assembly-tooling',
    summary:
      'An access platform for the GSLV. In the VSSC tooling gallery without a stated role; the records table asks.',
    when: REQUESTED,
    role: 'company-undated',
    recordsId: 'gslv-access-platform',
    sources: [{ deck: L, slides: [69] }],
    media: [
      {
        file: 'media/legend-gslv-access-platform.jpg',
        alt: 'The GSLV access platform: a multi-level steel platform with stairs and railings',
        credit: `GSLV access platform. ${LP}, slide 69`,
      },
    ],
    project: 'vssc-tooling',
  },

  // ------------------------------------------------------------- machined components
  {
    id: 'racing-car-components',
    era: 'legend',
    title: 'Racing-car product development — export components',
    category: 'machined-components',
    summary:
      'Machined components developed for a racing-car customer abroad: a webbed alloy housing, a turned steel hub and an anodised flanged part among them. Not shown elsewhere on the site; undated in the deck.',
    when: REQUESTED,
    role: 'company-undated',
    recordsId: 'racing-car-components',
    sources: [{ deck: L, slides: [28] }],
    media: [
      {
        file: 'media/legend-racing-car-components.jpg',
        alt: 'Machined racing-car components: a silver alloy housing with webbed ribs, a turned steel hub and a black anodised flanged part on a bench',
        credit: `Racing-car components. ${LP}, slide 28`,
      },
    ],
  },
  {
    id: 'uav-launch-canisters',
    era: 'legend',
    title: 'UAV launch canisters',
    customer: 'ADE, DRDO',
    category: 'machined-components',
    summary:
      'Components for UAV launch canisters for the Aeronautical Development Establishment. Not shown elsewhere on the site; undated in the deck.',
    when: REQUESTED,
    role: 'company-undated',
    recordsId: 'uav-launch-canisters',
    sources: [{ deck: L, slides: [29] }],
    media: [
      {
        file: 'media/legend-uav-launch-canister-component.jpg',
        alt: 'A machined UAV launch-canister component: a stainless bracket with a curved arm, a spring-loaded pin and an angled base plate, on green cloth',
        credit: `UAV launch-canister component. ${LP}, slide 29`,
      },
    ],
  },
  {
    id: 'a320-emergency-door-components',
    era: 'legend',
    title: 'A320 emergency-door detail components',
    customer: 'Aircraft Division, HAL',
    category: 'machined-components',
    summary:
      'Detail components for the A320 emergency door, machined for HAL’s aircraft division. Not shown elsewhere on the site; undated in the deck.',
    when: REQUESTED,
    role: 'company-undated',
    recordsId: 'a320-emergency-door-parts',
    sources: [{ deck: L, slides: [30] }],
    media: [
      {
        file: 'media/legend-a320-emergency-door-component.jpg',
        alt: 'An A320 emergency-door detail component: a machined aluminium panel with stiffening ribs and a bored hole, on a shelf',
        credit: `A320 emergency-door component. ${LP}, slide 30`,
      },
    ],
  },
  {
    id: 'cnc-turned-components',
    era: 'legend',
    title: 'CNC turned components',
    category: 'machined-components',
    summary:
      'Batches of CNC turned components — polished stainless discs stacked for inspection among them. The shop’s bread-and-butter work; undated in the deck.',
    when: REQUESTED,
    role: 'company-undated',
    recordsId: 'cnc-turned-components',
    sources: [{ deck: L, slides: [31] }],
    media: [
      {
        file: 'media/legend-cnc-turned-components.jpg',
        alt: 'CNC turned components: rows of polished stainless discs stacked in columns, awaiting inspection',
        credit: `CNC turned components. ${LP}, slide 31`,
      },
    ],
  },

  // ------------------------------------------------------------- composites & mockups
  {
    id: 'tejas-trainer-mockup-republic-day',
    era: 'legend',
    title: 'Tejas trainer mockup for the Republic Day parade, New Delhi',
    category: 'composites-mockups',
    summary:
      'A full-scale Tejas trainer mockup built for a Republic Day parade in New Delhi. Undated in the deck; the records table asks which parade and my part.',
    when: REQUESTED,
    role: 'company-undated',
    recordsId: 'republic-day-tejas-mockup',
    sources: [{ deck: L, slides: [33] }],
    media: [
      {
        file: 'media/legend-tejas-trainer-mockup-republic-day.jpg',
        alt: 'The Tejas trainer mockup on its float at the Republic Day parade',
        wide: true,
        credit: `Tejas trainer mockup, Republic Day. ${LP}, slide 33`,
      },
    ],
    project: 'legend-technologies',
  },
  {
    id: 'lca-mockup-aero-india-2015',
    era: 'legend',
    title: 'LCA mockup modification for Aero India 2015',
    category: 'composites-mockups',
    summary:
      'Modification of the LCA mockup for the Aero India show of February 2015 — inside my time, shown in the hub gallery as supported. The records table asks for my part in it.',
    when: known('Feb 2015 (Aero India)'),
    role: 'supported',
    recordsId: 'lca-mockup-aero-india-2015',
    sources: [{ deck: L, slides: [34, 36] }],
    media: [
      {
        file: 'media/legend-lca-mockup-aero-india-2015.jpg',
        alt: 'The LCA mockup under modification for Aero India 2015, in the shop',
        credit: `LCA mockup modification, Aero India 2015. ${LP}, slide 34`,
      },
    ],
    project: 'legend-technologies',
  },
  {
    id: 'dasara-mysore-display',
    era: 'legend',
    title: 'Dasara, Mysore — display mockup',
    category: 'composites-mockups',
    summary:
      'A display mockup for the Dasara festival in Mysore. The photographs show identifiable people and were not extracted, so the item is text only here; undated in the deck.',
    when: REQUESTED,
    role: 'company-undated',
    recordsId: 'dasara-mysore-display',
    sources: [{ deck: L, slides: [35] }],
  },
  {
    id: 'minsk-square-mockup-move',
    era: 'legend',
    title: 'LCA mockup by road to Minsk Square, Bangalore',
    category: 'composites-mockups',
    summary:
      'The Tejas mockup on a low-bed trailer through Bangalore traffic, for display at Minsk Square. Undated in the deck; the records table asks. The photograph was cropped to remove cars’ number plates and two faces were blurred before it was extracted.',
    when: REQUESTED,
    role: 'company-undated',
    recordsId: 'minsk-square-mockup-move',
    sources: [{ deck: L, slides: [37] }],
    media: [
      {
        file: 'media/legend-lca-mockup-road-transport.jpg',
        alt: 'The LCA Tejas mockup on a low-bed trailer in Bangalore traffic',
        wide: true,
        credit: `The mockup on the road (cropped; faces blurred). ${LP}, slide 37`,
      },
    ],
    project: 'legend-technologies',
  },
  {
    id: 'lca-td1-rcs-transport',
    era: 'legend',
    title: 'LCA TD1 modification and transport for RCS',
    category: 'composites-mockups',
    summary:
      'Modification and transport of the LCA technology demonstrator TD1 for radar-cross-section work, shown on its display pylon. Undated in the deck; the records table asks.',
    when: REQUESTED,
    role: 'company-undated',
    recordsId: 'lca-td1-rcs-transport',
    sources: [{ deck: L, slides: [66] }],
    media: [
      {
        file: 'media/legend-lca-td1-display-pylon.jpg',
        alt: 'The LCA TD1 airframe mounted on a display pylon',
        credit: `LCA TD1 on its pylon. ${LP}, slide 66`,
      },
    ],
    project: 'legend-technologies',
  },
  {
    id: 'lca-td2-aero-india-2017',
    era: 'legend',
    title: 'LCA TD2 modification and transport for Aero India 2017',
    category: 'composites-mockups',
    summary:
      'Modification and transport of the LCA technology demonstrator TD2 for the Aero India show of February 2017 — inside my time. The deck’s two photographs show identifiable people and were not extracted; a people-free photograph would let it in. The records table asks for my part.',
    when: known('Feb 2017 (Aero India)'),
    role: 'supported',
    recordsId: 'lca-td2-aero-india-2017',
    sources: [{ deck: L, slides: [67] }],
    project: 'legend-technologies',
  },
  {
    id: 'lca-composite-canopy-trolley',
    era: 'legend',
    title: 'Composite canopy trolley for the LCA',
    category: 'composites-mockups',
    summary:
      'An OEM asked for canopy trolleys for a fighter aircraft that had to be light — they travel in the aircraft — and durable, so they were made in composites. Detailed design and manufacture; discussions to finalise the resin and laminates; design changes finalised by the client before manufacture; delivered on time by staggering the project. An ENTI design case the deck does not date; the records table asks for the month and my part.',
    when: REQUESTED,
    role: 'supported',
    recordsId: 'lca-canopy-trolley',
    sources: [
      { deck: L, slides: [68] },
      { deck: E, slides: [28, 29] },
    ],
    media: [
      {
        file: 'media/enti-composite-canopy-trolley-cad.jpg',
        alt: 'CAD model of the composite canopy trolley: a barrel-vaulted cover on a low wheeled frame with a tow handle',
        credit: `Canopy trolley — CAD. ${ER}, slide 28`,
      },
      {
        file: 'media/enti-composite-canopy-trolleys.jpg',
        alt: 'Four finished composite canopy trolleys in red on yellow wheeled frames, lined up in the shop',
        credit: `Canopy trolleys, finished. ${EP}, slide 29`,
      },
      {
        file: 'media/legend-lca-composite-canopy-trolley.jpg',
        alt: 'A composite canopy trolley for the LCA, its curved cover on a wheeled frame',
        credit: `LCA canopy trolley. ${LP}, slide 68`,
      },
    ],
    project: 'legend-technologies',
  },
  {
    id: 'filament-wound-shells',
    era: 'legend',
    title: 'Filament-wound carbon-epoxy shells and laminates for gas pipelines',
    customer: 'Siemens',
    category: 'composites-mockups',
    summary:
      'Filament winding of carbon-epoxy shells and laminates for gas pipelines. The ENTI deck’s slide carries template text copied from another case; its two photographs are the content. The project page tells the story.',
    when: known('Mar – Aug 2015 (LinkedIn Projects)'),
    role: 'led',
    sources: [{ deck: E, slides: [40] }],
    media: [
      {
        file: 'media/enti-filament-wound-shells-1.jpg',
        alt: 'Filament-wound carbon-epoxy shells on the winding mandrel',
        credit: `Filament-wound shells. ${EP}, slide 40`,
      },
    ],
    project: 'filament-composites',
  },

  // ------------------------------------------------------------- slip rings
  {
    id: 'legend-slipring-division',
    era: 'legend',
    title: 'The slip-ring division — where my design seat was',
    category: 'slip-rings',
    summary:
      'Design, development, installation, testing and production of high-precision slip rings. Designed in-house to each customer’s requirement in AutoCAD and UG; machined only on precision machining centres from aerospace-grade materials; soldered at a micro-soldering station by a skilled few; assembled in a class 10,000 clean room; proved on a rotational test rig with a digital oscilloscope, a regulated DC supply with rheostat, an RF signal generator, a multimeter and a precision weighing scale. The division team table lists eight seats — marketing, planning and methods, design, purchase, production, fitting and assembly, testing and inspection, and overall management — and “Design — Vivekanand B” is mine.',
    when: known('2013 – 2018 · the division team table names the seat'),
    role: 'designed',
    sources: [{ deck: L, slides: [38, 44, 45, 59, 60, 61, 86] }],
    media: [
      {
        file: 'media/legend-slipring-division-building.jpg',
        alt: 'The slip-ring division’s cream two-storey building with orange trim among trees',
        credit: `The division’s building. ${LP}, slide 59`,
      },
      {
        file: 'media/legend-slipring-rotational-test-rig.jpg',
        alt: 'The rotational test rig: a slip ring coupled to a drive motor on a bench, harnessed for continuity and noise measurement',
        credit: `The rotational test rig. ${LP}, slide 86`,
      },
    ],
    project: 'slipring-line',
  },
  {
    id: 'slipring-tot-2000',
    era: 'legend',
    title: 'Technology transfer from VSSC, 2000 — the silver-graphite generation',
    category: 'slip-rings',
    summary:
      'The technology ISRO transferred in 2000 made contact between stator and rotor with coin-silver rings and silver-graphite brush blocks, insulated with a modified epoxy. In service it formed silver-graphite powder that short-circuited channels, lost continuity between rotor and stator, let water in, slipped brush blocks between channels, needed frequent maintenance and lubrication, and drew more power through friction — the problem list the upgraded architecture answered.',
    when: known('2000'),
    role: 'company-before',
    sources: [{ deck: L, slides: [39, 41] }],
    project: 'slipring-line',
  },
  {
    id: 'slipring-upgraded-architecture',
    era: 'legend',
    title: 'The upgraded slip-ring architecture',
    category: 'slip-rings',
    summary:
      'Beryllium-copper brush wire running in U-grooves on electrode-grade copper rings; gold plating on rings and brush wires; a printed circuit board designed for each application to carry the channels; a special epoxy potting compound applied in fixtures for insulation; ingress-protection sealing with sealants and O-rings. The deck’s stated results: no powder formation and better conductivity, continuity ensured at all times, better insulation, operation in all environments, life increased to fifteen years, maintenance-free. The deck does not say when the upgrade was made; the records table asks whether it was mine or inherited.',
    when: {
      status: 'unknown',
      label: 'between the 2000 transfer and the 2017–18 deck — not dated in the deck',
    },
    role: 'company-undated',
    sources: [{ deck: L, slides: [40, 42, 43] }],
    project: 'slipring-line',
  },
  {
    id: 'slipring-miniaturisation',
    era: 'legend',
    title: 'Miniature and high-speed slip rings for the indigenised market',
    category: 'slip-rings',
    summary:
      'Reverse-engineer or develop the miniature and high-speed slip rings the market imported, to work effectively under extreme conditions and transmit movement, electrical power and signals with minimum loss. A detailed study of the AWG standards and of how the slip ring works; tolerances held to 5 microns for smooth, stress-free rotation; the result “very cost effective when compared to the overseas imported versions”. An ENTI design case in the years my seat was the division’s design seat.',
    when: known(ENTI_DATE),
    role: 'designed',
    sources: [{ deck: E, slides: [32, 33] }],
    project: 'slipring-line',
  },
  {
    id: 'slipring-8ch-npol-winch',
    era: 'legend',
    title: '8-channel stacked slip ring for a 5 HP marine winch',
    customer: 'NPOL, Kochi',
    category: 'slip-rings',
    summary:
      'Eight channels in a stacked layout for a 5 HP marine winch at the Naval Physical and Oceanographic Laboratory; three supplied by the deck’s count. One of the twelve configurations; which passed through my hands is in the records table.',
    when: REQUESTED,
    role: 'company-undated',
    recordsId: CONFIGS,
    sources: [{ deck: L, slides: [46] }],
    media: [
      {
        file: 'media/legend-8ch-slipring-cad.jpg',
        alt: 'Exploded CAD render of an 8-channel stacked slip ring: rings, brush boards and a flanged base along one axis',
        credit: `8-channel slip ring — CAD. ${LR}, slide 46`,
      },
    ],
    project: 'slipring-line',
  },
  {
    id: 'slipring-10ch-miniature-vssc',
    era: 'legend',
    title: '10-channel miniature stacked slip ring for satellites',
    customer: 'VSSC, ISRO',
    category: 'slip-rings',
    summary:
      'A ten-channel miniature stacked slip ring for satellite applications, for the licensor itself. One of the twelve configurations.',
    when: REQUESTED,
    role: 'company-undated',
    recordsId: CONFIGS,
    sources: [{ deck: L, slides: [47] }],
    media: [
      {
        file: 'media/legend-10ch-miniature-slipring.jpg',
        alt: 'A small stainless 10-channel miniature slip ring with a black cable, a “Legend” label on its body',
        credit: `10-channel miniature slip ring. ${LP}, slide 47`,
      },
    ],
    project: 'slipring-line',
  },
  {
    id: 'slipring-6ch-power-manipulator',
    era: 'legend',
    title: '6-channel slip ring for a power manipulator',
    customer: 'PARI, Pune',
    category: 'slip-rings',
    summary:
      'Six channels, stacked, for a power manipulator built by PARI in Pune. One of the twelve configurations.',
    when: REQUESTED,
    role: 'company-undated',
    recordsId: CONFIGS,
    sources: [{ deck: L, slides: [48] }],
    media: [
      {
        file: 'media/legend-6ch-slipring-cad.jpg',
        alt: 'CAD render of a 6-channel stacked slip ring in a red housing with a yellow mounting tab',
        credit: `6-channel slip ring for a power manipulator — CAD. ${LR}, slide 48`,
      },
    ],
    project: 'slipring-line',
  },
  {
    id: 'slipring-24ch-robotics',
    era: 'legend',
    title: '24-channel stacked slip ring for robotics',
    customer: 'PARI, Pune',
    category: 'slip-rings',
    summary:
      'Twenty-four channels, stacked, for a robotics application at PARI. One of the twelve configurations.',
    when: REQUESTED,
    role: 'company-undated',
    recordsId: CONFIGS,
    sources: [{ deck: L, slides: [49] }],
    media: [
      {
        file: 'media/legend-24ch-slipring-cad.jpg',
        alt: 'CAD render of a 24-channel stacked slip ring in a translucent pink housing showing the ring stack and brush boards',
        credit: `24-channel slip ring — CAD. ${LR}, slide 49`,
      },
    ],
    project: 'slipring-line',
  },
  {
    id: 'slipring-6ch-windmill',
    era: 'legend',
    title: '6-channel slip ring for a windmill',
    customer: 'Wind Turbines Systems, Bangalore',
    category: 'slip-rings',
    summary:
      'Six channels in a squat stacked housing for a wind turbine — the one configuration in the deck built for the energy market rather than aerospace, defence or industry. Not shown elsewhere on the site until now.',
    when: REQUESTED,
    role: 'company-undated',
    recordsId: 'windmill-6ch-slipring',
    sources: [{ deck: L, slides: [50] }],
    media: [
      {
        file: 'media/legend-6ch-windmill-slipring-cad.jpg',
        alt: 'CAD render of the 6-channel windmill slip ring: a squat cylindrical housing in gold with a green top plate and a cyan base ring',
        credit: `6-channel windmill slip ring — CAD. ${LR}, slide 50`,
      },
    ],
    project: 'slipring-line',
  },
  {
    id: 'slipring-6ch-rotary-tables',
    era: 'legend',
    title: '6-channel slip ring for rotary tables',
    customer: 'Avasarala Technologies, Bangalore',
    category: 'slip-rings',
    summary:
      'Six channels for rotary tables at Avasarala Technologies; the photograph on the slide shows a miniature unit labelled as manufactured under licence from ISRO. One of the twelve configurations.',
    when: REQUESTED,
    role: 'company-undated',
    recordsId: CONFIGS,
    sources: [{ deck: L, slides: [51] }],
    media: [
      {
        file: 'media/legend-6ch-miniature-slipring.jpg',
        alt: 'A miniature 6-channel slip ring on a towel, its white leads looped either side, labelled as made under licence from ISRO',
        wide: true,
        credit: `6-channel miniature slip ring. ${LP}, slide 51`,
      },
    ],
    project: 'slipring-line',
  },
  {
    id: 'slipring-27ch-badawe',
    era: 'legend',
    title: '27-channel stacked slip ring',
    customer: 'Badawe Engineers, Pune',
    category: 'slip-rings',
    summary:
      'Twenty-seven channels, stacked, for Badawe Engineers in Pune — CAD and finished units. One of the twelve configurations.',
    when: REQUESTED,
    role: 'company-undated',
    recordsId: CONFIGS,
    sources: [{ deck: L, slides: [52] }],
    media: [
      {
        file: 'media/legend-27ch-slipring-cad.jpg',
        alt: 'CAD render of a 27-channel stacked slip ring, a long stack of red and green rings inside a pink housing with a green PCB',
        wide: true,
        credit: `27-channel slip ring — CAD. ${LR}, slide 52`,
      },
      {
        file: 'media/legend-27ch-slipring-units.jpg',
        alt: 'Two finished 27-channel slip rings in black housings with their lead bundles, on a dark cloth',
        credit: `27-channel units, finished. ${LP}, slide 52`,
      },
    ],
    project: 'slipring-line',
  },
  {
    id: 'slipring-57ch-naval-bel',
    era: 'legend',
    title: '57-channel stacked slip ring — naval',
    customer: 'BEL, Chennai',
    category: 'slip-rings',
    summary:
      'Fifty-seven channels for a naval system at Bharat Electronics, Chennai — the line’s volume product: sixty-seven supplied by the deck’s count, plus four of a 59-channel variant. Cut-away CAD, the unit under assembly and its housing.',
    when: REQUESTED,
    role: 'company-undated',
    recordsId: CONFIGS,
    sources: [{ deck: L, slides: [53] }],
    media: [
      {
        file: 'media/legend-57ch-naval-slipring-cad.jpg',
        alt: 'Cut-away CAD render of a 57-channel naval slip ring inside its translucent housing, the contact stack and green brush boards visible',
        wide: true,
        credit: `57-channel naval slip ring — cut-away CAD. ${LR}, slide 53`,
      },
      {
        file: 'media/legend-57ch-naval-slipring-assembly.jpg',
        alt: 'A 57-channel slip ring under assembly, white leads fanned out from its contact stack on a bench',
        credit: `Under assembly. ${LP}, slide 53`,
      },
    ],
    project: 'slipring-line',
  },
  {
    id: 'slipring-108ch-aerospace-rci',
    era: 'legend',
    title: '108-channel stacked slip ring — aerospace',
    customer: 'Research Centre Imarat, Hyderabad',
    category: 'slip-rings',
    summary:
      'The largest configuration: one hundred and eight channels stacked along a long contact stack, for an aerospace application at RCI, Hyderabad — exploded and transparent CAD, and a 109-channel capsule photographed beside its bundle of leads.',
    when: REQUESTED,
    role: 'company-undated',
    recordsId: CONFIGS,
    sources: [{ deck: L, slides: [54] }],
    media: [
      {
        file: 'media/legend-108ch-slipring-cad.jpg',
        alt: 'Exploded CAD view of a 108-channel stacked slip ring: the long contact stack, brush blocks and end flanges laid out along its axis',
        wide: true,
        credit: `108-channel slip ring, exploded. ${LR}, slide 54`,
      },
      {
        file: 'media/legend-109ch-slipring-capsule.jpg',
        alt: 'A slim black slip-ring capsule with a bundle of over a hundred white leads coiled beside it on green cloth',
        credit: `109-channel capsule. ${LP}, slide 54`,
      },
    ],
    project: 'slipring-line',
  },
  {
    id: 'slipring-37ch-pancake-cvrde',
    era: 'legend',
    title: '37-channel pancake slip ring for battle-tank turrets',
    customer: 'CVRDE, Chennai',
    category: 'slip-rings',
    summary:
      'A flat pancake configuration of thirty-seven channels for battle-tank turrets at the Combat Vehicles Research and Development Establishment — CAD and the disc as built, ringed with connector caps.',
    when: REQUESTED,
    role: 'company-undated',
    recordsId: CONFIGS,
    sources: [{ deck: L, slides: [55] }],
    media: [
      {
        file: 'media/legend-37ch-pancake-slipring-cad.jpg',
        alt: 'CAD render of a 37-channel pancake slip ring, a flat orange disc with connector ports around its rim',
        credit: `37-channel pancake slip ring — CAD. ${LR}, slide 55`,
      },
      {
        file: 'media/legend-37ch-pancake-slipring.jpg',
        alt: 'The 37-channel pancake slip ring as built: a black disc ringed with red connector caps on green cloth',
        credit: `As built. ${LP}, slide 55`,
      },
    ],
    project: 'slipring-line',
  },
  {
    id: 'slipring-48ch-iisu',
    era: 'legend',
    title: '48-channel stacked slip ring for INSAT / GSAT antennas',
    customer: 'IISU, Trivandrum',
    category: 'slip-rings',
    summary:
      'Forty-eight channels, stacked, for the INSAT–GSAT antenna systems at the ISRO Inertial Systems Unit; two supplied by the deck’s count. One of the twelve configurations.',
    when: REQUESTED,
    role: 'company-undated',
    recordsId: CONFIGS,
    sources: [{ deck: L, slides: [56] }],
    media: [
      {
        file: 'media/legend-48ch-slipring-cad.jpg',
        alt: 'Exploded CAD render of a 48-channel stacked slip ring in a blue housing with magenta end caps',
        credit: `48-channel slip ring — CAD. ${LR}, slide 56`,
      },
    ],
    project: 'slipring-line',
  },
  {
    id: 'slipring-70ch-naval-repair',
    era: 'legend',
    title: '70-channel naval slip ring — repair',
    customer: 'BEL, Chennai',
    category: 'slip-rings',
    summary:
      'A seventy-channel naval slip ring opened for repair — the line was serviced, not just sold. The records table asks whether I was involved.',
    when: REQUESTED,
    role: 'company-undated',
    recordsId: 'bel-70ch-repair',
    sources: [{ deck: L, slides: [57] }],
    media: [
      {
        file: 'media/legend-70ch-slipring-repair.jpg',
        alt: 'The open housing of a 70-channel slip ring during repair, colour-coded leads and brush boards inside',
        credit: `70-channel unit in for repair. ${LP}, slide 57`,
      },
    ],
    project: 'slipring-line',
  },
  {
    id: 'slipring-igcar-high-amperage',
    era: 'legend',
    title: '8-channel high-amperage slip ring for high-temperature electro-refining',
    customer: 'Godrej / IGCAR',
    category: 'slip-rings',
    summary:
      'The high-amperage unit for the electro-refining rig at the Indira Gandhi Centre for Atomic Research, through Godrej — the deep dive on this site, published at NAMS 2015. The deck holds two installation photographs and the exploded CAD; the records table asks for any photographs I still hold beyond these.',
    when: known('Sep – Dec 2015 (LinkedIn Projects)'),
    role: 'led',
    recordsId: 'igcar-slipring',
    sources: [{ deck: L, slides: [58] }],
    media: [
      {
        file: 'media/legend-igcar-slipring-cad.jpg',
        alt: 'Exploded CAD view of a high-amperage stacked slip ring: end flange, blue rotor housing, contact stack and red brush block laid out along one axis',
        credit: `The high-amperage unit, exploded. ${LR}, slide 58`,
      },
      {
        file: 'media/legend-igcar-slipring-installation-1.jpg',
        alt: 'The high-amperage slip ring installed on the electro-refining rig at IGCAR',
        credit: `Installed on the rig. ${LP}, slide 58`,
      },
    ],
    project: 'igcar-slipring',
  },
  {
    id: 'slipring-supplied-by-customer',
    era: 'legend',
    title: 'Slip rings supplied, by customer and application',
    category: 'slip-rings',
    summary:
      'The deck’s own tally: 6-channel for Avasarala’s rotary tables (1) and PARI’s robotics (2); 8-channel for NPOL’s 5 HP marine winch (3); 10-channel for ADE’s magnetic heading sensor (1) and NPOL’s airborne winch (2); 24-channel for PARI’s power manipulator (2); 30-channel for Avasarala’s rotary tables (1); 37-channel for CVRDE’s tank turrets (1); 48-channel for IISU’s INSAT–GSAT (2); 57-channel for BEL’s naval systems (67); 59-channel for BEL (4); 108-channel for RCI’s aerospace application (1).',
    when: known('as of the 2017–18 deck'),
    role: 'workplace',
    sources: [{ deck: L, slides: [64] }],
    project: 'slipring-line',
  },

  // ------------------------------------------------------------- design services (ENTI)
  {
    id: 'bmp2-turret-modelling',
    era: 'legend',
    title: 'BMP-II turret modelling for BEL’s FICV',
    customer: 'BEL',
    category: 'design-services',
    summary:
      'A large number of drawings to be converted to 3D models in a short span — the deck says 2,000 drawings in four months; my resume and the project page carry 3,000 sheets. Modelled assembly by assembly, each designer given a full assembly, with a team of designers and checkers formed quickly; simulations run for every mechanism in the turret. The project page carries the kinematic clips.',
    when: known('Nov 2014 – Mar 2015 (LinkedIn Projects)'),
    role: 'led',
    sources: [{ deck: E, slides: [34, 35] }],
    media: [
      {
        file: 'media/enti-bmp2-turret-overview.jpg',
        alt: 'CAD overview of the BMP-II turret model',
        credit: `BMP-II turret — CAD overview. ${ER}, slide 35`,
      },
    ],
    project: 'bmp2-turret',
  },
  {
    id: 'lca-navy-opto-electronics',
    era: 'legend',
    title: 'Position light and wander light — indigenised opto-electronics for a fighter aircraft',
    customer: 'LCA-Navy programme',
    category: 'design-services',
    summary:
      'Two imported opto-electronic units indigenised. The position light: aerodynamic placement on the landing gear, components inside 100 × 90 × 50 mm, sturdy enough for the environmental tests — iterations cut by simplifying to the bare minimum, simulations before the real tests, prototypes shown to the pilots, miniaturised with DFM. The wander light: a focused, narrow beam for the pilot with 1.5 m of retractable cable inside 110 × 110 × 50 mm, with fewer parts for easier fabrication. The project page carries the qualification clips.',
    when: known('Jan – Jun 2016 (LinkedIn Projects)'),
    role: 'led',
    sources: [{ deck: E, slides: [36, 37, 38, 39] }],
    media: [
      {
        file: 'media/enti-position-light-cad.jpg',
        alt: 'CAD model of the position light housing',
        credit: `Position light — CAD. ${ER}, slide 36`,
      },
      {
        file: 'media/enti-wander-light-exploded.jpg',
        alt: 'Exploded CAD view of the wander light and its retraction mechanism',
        credit: `Wander light, exploded. ${ER}, slide 39`,
      },
    ],
    project: 'lca-navy',
  },
  {
    id: 'enti-mission',
    era: 'legend',
    title: 'ENTI Innovations — mission, vision, values',
    category: 'design-services',
    summary:
      'The group’s design arm, where I was Technical Manager. Mission: extend the group’s engineering experience to help customers gain competitive advantage. Vision: be trusted partners creating value, however small or complex the problem, through engineering excellence and innovative thinking. Values: focus on innovation, customer first, no problem too small or complex, value for money.',
    when: known(ENTI_DATE),
    role: 'workplace',
    sources: [{ deck: E, slides: [3] }],
  },
  {
    id: 'enti-services',
    era: 'legend',
    title: 'ENTI’s services: five verticals',
    category: 'design-services',
    summary:
      'Design simulation and validation (finite-element, CFD, impact, vibration, acoustic and heat-transfer analysis); reverse engineering and value engineering (re-engineering, product improvement); documentation and certification (illustrated parts catalogues, overhaul and CIR manuals, IETMs, service manuals and bulletins, style guides, digitised drawings); composites selection, design, verification and prototyping with machining and tooling; and end-to-end project management from concept to prototype to manufactured product. Under it, the jig-and-fixture design work I ran: modelling, drafting, GD&T, engineering changes, manufacturing process drawings, inspection documents, assembly floor sheets and acceptance test procedures. Aerospace competency of over a hundred person-years across structures and systems; CAD/CAM/CAE and DFM/DFT tools; rapid-prototyping and 3D-printing tie-ups.',
    when: known(ENTI_DATE),
    role: 'workplace',
    recordsId: 'enti-services',
    sources: [{ deck: E, slides: [4, 5, 10, 11, 12] }],
    media: [
      {
        file: 'media/enti-services-wheel.jpg',
        alt: 'ENTI’s five service verticals as a wheel — design simulation and validation, reverse engineering and value addition, documentation and certification, project management, composite design and prototyping — ringed by its four industries',
        credit: `The services wheel. ${ER}, slide 4`,
      },
    ],
  },
  {
    id: 'enti-industry-focus',
    era: 'legend',
    title:
      'Industry focus: aerospace and defence, heavy engineering, process and manufacturing, energy and power',
    category: 'design-services',
    summary:
      'Four industries, each with the benefits ENTI claimed for it: aerospace and defence — long operational life, green designs, cost reduction, proof of concept through modelling and simulation, quick prototype turnaround; heavy engineering — longer equipment life, robust designs to safety standards, composites and alternate materials; process and manufacturing — plant performance prediction and monitoring, compliance models, SCADA design, build-operate-transfer labs and workshops, vendor development; energy and power — inverter and control-system prototypes, micro-grid designs, composites for equipment and accessories.',
    when: known(ENTI_DATE),
    role: 'workplace',
    sources: [{ deck: E, slides: [6, 7, 8, 9] }],
  },
  {
    id: 'enti-accreditations',
    era: 'legend',
    title: 'ENTI accreditations: CEMILAC, DRDO, ISO 9001:2008',
    category: 'company',
    summary:
      'Certified by the Centre for Military Airworthiness and Certification (CEMILAC) for the detailed design, optimisation and analysis of fixed-wing and rotary-wing airframe structural parts and assemblies for military airborne applications; certified by DRDO to carry out design and FMEA projects; an ISO 9001:2008 certified organisation.',
    when: known(ENTI_DATE),
    role: 'workplace',
    sources: [{ deck: E, slides: [13] }],
  },
  {
    id: 'enti-org-chart',
    era: 'legend',
    title: 'ENTI organisation — my seat: Technical Manager',
    category: 'company',
    summary:
      'The organisation chart the deck carried: the CEO and founder at the top, an advisory board, an associate vice-president, a specialist team of doctorates and post-graduates in aircraft systems and structural design, and the delivery organisation — where “Vivekanand B (Technical Manager)” is the one name the transcript keeps; every other name is withheld.',
    when: known(ENTI_DATE),
    role: 'workplace',
    sources: [{ deck: E, slides: [18] }],
    project: 'legend-technologies',
  },
  {
    id: 'enti-network',
    era: 'legend',
    title: 'Partners and the National Design & Research Forum MOU',
    category: 'events',
    summary:
      'ENTI’s partner ecosystem — the National Design and Research Forum, the Institute on Climate Change and Sustainability, and the Institution of Engineers (India) — and the signing of a memorandum of understanding with the National Design & Research Forum. The event photographs show identifiable people and were not extracted.',
    when: known('2013 (the MOU photographs); the partner list as of the deck'),
    role: 'workplace',
    sources: [{ deck: E, slides: [14, 43] }],
  },
  {
    id: 'enti-events-2013',
    era: 'legend',
    title: 'Aero India 2013 · Indian Technology Congress 2013 · India Composites Show 2013',
    category: 'events',
    summary:
      'Three events the design arm showed at in 2013, my first year: Aero India, the Indian Technology Congress and the India Composites Show. The photographs show identifiable people and were not extracted; the records table asks what my part at each was.',
    when: known('2013'),
    role: 'workplace',
    recordsId: 'enti-events-2013',
    sources: [{ deck: E, slides: [44, 45, 46] }],
  },
];
