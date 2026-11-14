/* ==========================================================================
   content.js — the site's records. Edit this file to add or revise work;
   work.js renders whatever is here and never needs touching for content.

   Adding a paper: copy a record in WORK. Fields:
     venue     short venue label incl. year, in carnelian small caps
     title     full title
     href      where the title points (project page if there is one)
     authors   "Plain Name, [Linked Name](url), **Adnan Armouti**"
     note      one sentence on the contribution, set in the caption voice
     honours   ["Oral", "Best Paper Finalist"] or omit
     figure    path to a ~1.19:1 crop (the desktop slot is 188x158); .mp4/.webm plays inline (muted, looped);
               add fit:'contain' to letterbox instead
     wide      optional 21:9 crop of the same figure for the phone band, where
               the slot is a wide strip rather than the near-square desktop one
     poster    still shown before/if the video does not play (video only)
     clips     instead of figure: two { src, poster } clips. Desktop plays
               them one after the other in the single slot; phones show them
               side by side, governed by `pair`
     pair      'alternate' — one plays while the other waits, faded, then swap
               'together'  — both play at once, in step
     A clip may carry dark: { src, poster } — used while the page is dark
     resources [{ label, href }] — rendered in RESOURCE_ORDER, rule-separated
     featured  true to also list it on the front page
   ========================================================================== */

const WORK = [
  {
    featured: true,
    venue: 'Preprint 2026',
    title: '4D Point Splatting for mmWave Radar Micro-Doppler Differentiable Rendering',
    href: 'https://4d-point-splatting.github.io/',
    authors: '**Adnan Armouti**, [Guanyue Qian](https://thooomasqian.github.io/), [Rajalakshmi Nandakumar](https://rajalakshminandakumar.com/)',
    note: 'The first differentiable point splatting renderer to fit a moving person to a real radar capture: points carrying material, normal and velocity splat into range and Doppler bins, so the micro-Doppler matches the recording.',
    clips: [
      // RT-Pose sequence 142, both clips. First the fitted scene, pass by pass —
      // geometry, normals, material, velocity — with the camera tracking the body
      // so it stays whole inside the crop the tile takes. Then the micro-Doppler
      // those velocities render (below) against the real capture (above), r = 0.961.
      { src: 'assets/projects/4dps/4dps_a_scene_light.mp4', poster: 'assets/projects/4dps/4dps_a_scene_light_poster.jpg',
        dark: { src: 'assets/projects/4dps/4dps_a_scene_dark.mp4', poster: 'assets/projects/4dps/4dps_a_scene_dark_poster.jpg' } },
      { src: 'assets/projects/4dps/4dps_b_md_light.mp4', poster: 'assets/projects/4dps/4dps_b_md_light_poster.jpg',
        dark: { src: 'assets/projects/4dps/4dps_b_md_dark.mp4', poster: 'assets/projects/4dps/4dps_b_md_dark_poster.jpg' } },
    ],
    pair: 'alternate',
    resources: [
      { label: 'project page', href: 'https://4d-point-splatting.github.io/' },
      { label: 'paper',        href: 'https://arxiv.org/abs/2611.08342' },
    ],
  },
  {
    featured: true,
    venue: 'NeurIPS 2026',
    title: '3D Point Splatting for mmWave Radar Novel View Synthesis',
    href: 'https://3d-point-splatting.github.io/',
    authors: '**Adnan Armouti**, [Yixuan Gao](https://adamgao1996.github.io/), [Rajalakshmi Nandakumar](https://rajalakshminandakumar.com/)',
    note: 'The first differentiable point splatting renderer for radar novel view synthesis: oriented, material-aware 3D points splat into range bins via a PSF, yielding complex ADC, range profiles and RA maps from one model.',
    clips: [
      // stage 1: the range-splatting sequence from the project page's teaser (points,
      // every range shell, the trace they leave, the points snapped onto rings, the
      // collapse to the range histogram); stage 2: the camera to bird's-eye, the
      // points dropped onto the range-azimuth map, back to the scene. Stage 2 ends on
      // the bare scene that stage 1 begins from, so the pair loops without a cut.
      { src: 'assets/projects/3dps/3dps_a_splat_light.mp4', poster: 'assets/projects/3dps/3dps_a_splat_light_poster.jpg',
        dark: { src: 'assets/projects/3dps/3dps_a_splat_dark.mp4', poster: 'assets/projects/3dps/3dps_a_splat_dark_poster.jpg' } },
      { src: 'assets/projects/3dps/3dps_b_ramap_light.mp4', poster: 'assets/projects/3dps/3dps_b_ramap_light_poster.jpg',
        dark: { src: 'assets/projects/3dps/3dps_b_ramap_dark.mp4', poster: 'assets/projects/3dps/3dps_b_ramap_dark_poster.jpg' } },
    ],
    pair: 'alternate',   // phones: side by side, one plays while the other waits faded
    resources: [
      { label: 'project page', href: 'https://3d-point-splatting.github.io/' },
      { label: 'paper',        href: 'https://arxiv.org/abs/2609.11894' },
      { label: 'code',         href: 'https://github.com/adnan-armouti/3D-Point-Splatting' },
      { label: 'video',        href: 'https://recorder-v3.slideslive.com/?share=115217&s=0eaef98b-ef36-45d9-9c6e-190b46abb0e4' },
      { label: 'poster',       href: 'https://drive.google.com/file/d/1CDRvIcdgemgewgn5o9qEdWCveWDxPmW3/view?usp=sharing' },
    ],
  },
  {
    featured: true,
    venue: 'ECCV 2026',
    title: 'mmIR: Frequency-Space Inverse Rendering for 3D Millimeter-Wave Radar ADC Synthesis',
    href: 'https://mmwave-inverse-rendering.github.io/',
    authors: '**Adnan Armouti**, [Yixuan Gao](https://adamgao1996.github.io/), [Rajalakshmi Nandakumar](https://rajalakshminandakumar.com/)',
    note: 'The first FMCW radar inverse renderer that fits a differentiable, physics-based ray tracing forward model to real captures, then re-renders from dense virtual apertures to synthesise high-resolution 3D radar data.',
    clips: [
      { src: 'assets/projects/mmir/mmir_a_raytrace.mp4', poster: 'assets/projects/mmir/mmir_a_raytrace_poster.jpg',
        dark: { src: 'assets/projects/mmir/mmir_a_raytrace_dark.mp4', poster: 'assets/projects/mmir/mmir_a_raytrace_dark_poster.jpg' } },
      { src: 'assets/projects/mmir/mmir_b_dense.mp4',    poster: 'assets/projects/mmir/mmir_b_dense_poster.jpg',
        dark: { src: 'assets/projects/mmir/mmir_b_dense_dark.mp4',    poster: 'assets/projects/mmir/mmir_b_dense_dark_poster.jpg' } },
    ],
    pair: 'alternate',   // phones: side by side, one plays while the other waits faded
    resources: [
      { label: 'project page', href: 'https://mmwave-inverse-rendering.github.io/' },
      { label: 'paper',        href: 'https://doi.org/10.1007/978-3-032-37359-5_9' },
      { label: 'code',         href: 'https://github.com/adnan-armouti/mmWave-Inverse-Rendering' },
      { label: 'video',        href: 'https://www.youtube.com/watch?v=UjcEwDx3bns' },
      { label: 'poster',       href: 'https://drive.google.com/file/d/1E5c7vM5N7udhou3jiCmoKmwWtcAGs6Rg/view?usp=sharing' },
    ],
  },
  {
    venue: 'MobiCom 2026',
    title: 'mmFHE: mmWave Sensing with End-to-End Fully Homomorphic Encryption',
    href: 'https://tanvir9476.github.io/projects/mmfhe/',
    authors: '[Tanvir Ahmed](https://tanvir9476.github.io), [Yixuan Gao](https://adamgao1996.github.io/), **Adnan Armouti**, [Rajalakshmi Nandakumar](https://rajalakshminandakumar.com/)',
    note: 'The first system to run an end-to-end mmWave radar sensing pipeline — signal processing and ML inference — entirely under fully homomorphic encryption on an untrusted cloud.',
    figure: 'assets/projects/mmfhe/mmfhe_card.jpg',
    resources: [
      { label: 'project page', href: 'https://tanvir9476.github.io/projects/mmfhe/' },
      { label: 'paper', href: 'https://arxiv.org/abs/2603.22437' },
    ],
  },
  {
    venue: 'ECCV 2024',
    title: 'Implicit Neural Models to Extract Heart Rate from Video',
    href: 'https://implicitppg.github.io/',
    authors: '[Pradyumna Chari](https://pradyumnachari.github.io/)*, [Anirudh Bindiganavale Harish](https://anirudhbharish.github.io/)*, **Adnan Armouti**, [Alexander Vilesov](https://asvilesov.github.io/), [Sanjit Sarda](https://sanjit1.github.io/), [Laleh Jalilian](https://www.uclahealth.org/providers/laleh-jalilian), [Achuta Kadambi](https://www.ee.ucla.edu/achuta-kadambi/)',
    note: 'The first implicit decomposition of face video into blood and appearance, state of the art for out of distribution.',
    figure: 'assets/projects/implicit-ppg/implicitppg_card.jpg',
    fit: 'contain',
    resources: [
      { label: 'project page', href: 'https://implicitppg.github.io/' },
      { label: 'paper',        href: 'https://www.ecva.net/papers/eccv_2024/papers_ECCV/papers/10941.pdf' },
      { label: 'code',         href: 'https://github.com/UCLA-VMG/FastImplicitPleth' },
    ],
  },
  {
    venue: 'Preprint 2024',
    title: 'Thermal Imaging and Radar for Remote Sleep Monitoring of Breathing and Apnea',
    href: 'https://arxiv.org/abs/2407.11936',
    authors: 'Kai Del Regno, [Alexander Vilesov](https://asvilesov.github.io/), **Adnan Armouti**, [Anirudh Bindiganavale Harish](https://anirudhbharish.github.io/), Selim Emir Can, [Ashley Kita](https://www.uclahealth.org/providers/ashley-kita), [Achuta Kadambi](https://www.ee.ucla.edu/achuta-kadambi/)',
    note: 'Radar and thermal imaging compared for non-contact sleep apnea monitoring, with a multimodal method.',
    figure: 'assets/projects/sleep-apnea/apnea_card.jpg',
    resources: [
      { label: 'paper', href: 'https://arxiv.org/abs/2407.11936' },
      { label: 'code',  href: 'https://github.com/UCLA-VMG/NonContactApneaDetection' },
    ],
  },
  {
    featured: true,
    venue: 'SIGGRAPH 2022',
    title: 'Blending Camera and 77 GHz Radar Sensing for Equitable, Robust Plethysmography',
    href: 'http://visual.ee.ucla.edu/equi_pleth_camera_rf.htm/',
    authors: '[Alexander Vilesov](https://asvilesov.github.io/)*, [Pradyumna Chari](https://pradyumnachari.github.io/)*, **Adnan Armouti***, [Anirudh Bindiganavale Harish](https://anirudhbharish.github.io/), Kimaya Kulkarni, Ananya Deoghare, [Laleh Jalilian](https://www.uclahealth.org/providers/laleh-jalilian), [Achuta Kadambi](https://www.ee.ucla.edu/achuta-kadambi/)',
    note: 'The first camera-radar fusion for skin-tone-equitable remote plethysmography.',
    figure: 'assets/projects/equipleth/equipleth_card.jpg',
    wide:   'assets/projects/equipleth/equipleth_wide.jpg',
    resources: [
      { label: 'project page', href: 'http://visual.ee.ucla.edu/equi_pleth_camera_rf.htm/' },
      { label: 'paper',        href: 'https://doi.org/10.1145/3528223.3530161' },
      { label: 'code',         href: 'https://github.com/UCLA-VMG/EquiPleth' },
    ],
  },
];

const PATENTS = [
  {
    title: 'Systems and Methods for Measuring Vital Signs Using Multimodal Health Sensing Platforms',
    number: 'U.S. Patent Application 2023/0233091',
    href: 'https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/20230233091',
    authors: '[Achuta Kadambi](https://www.ee.ucla.edu/achuta-kadambi/), [Laleh Jalilian](https://www.uclahealth.org/providers/laleh-jalilian), [Pradyumna Chari](https://pradyumnachari.github.io/), Chinmay Talegaonkar, Doruk Karinca, Maxime Cannesson, Krish Kabra, Omid Salehi-Abari, [Ashley Kita](https://www.uclahealth.org/providers/ashley-kita), **Adnan Armouti**',
  },
  {
    title: 'Methods and Apparatus to Detect and Classify Forms of Sleep Apnea',
    number: 'U.S. Provisional Application',
    href: null,
    authors: '[Achuta Kadambi](https://www.ee.ucla.edu/achuta-kadambi/), [Ashley Kita](https://www.uclahealth.org/providers/ashley-kita), [Alexander Vilesov](https://asvilesov.github.io/), Kai Del Regno, Selim Emir Can, [Laleh Jalilian](https://www.uclahealth.org/providers/laleh-jalilian), [Anirudh Bindiganavale Harish](https://anirudhbharish.github.io/), **Adnan Armouti**',
  },
];
