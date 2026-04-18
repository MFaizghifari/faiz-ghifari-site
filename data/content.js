// =============================================================================
// SITE CONTENT — edit this file to update any text on the site.
// No React knowledge needed. Save the file and redeploy to publish changes.
// =============================================================================

// -----------------------------------------------------------------------------
// NAV — logo mark and navigation links
// -----------------------------------------------------------------------------
export const nav = {
  logoMark: 'FG',                    // The two-letter monogram in the top-left
  logoLabel: 'Faiz Ghifari — home',  // Screen-reader label for the logo link
  links: [
    { label: 'About',     href: '#about' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Media',     href: '#media' },
    { label: 'Topics',    href: '#topics' },
    { label: 'Travel',    href: '#travel' },
    { label: 'Writing',   href: '#writing' },
    { label: 'Contact',   href: '#contact' },
  ],
}

// -----------------------------------------------------------------------------
// HERO — the first thing visitors see
// -----------------------------------------------------------------------------
export const hero = {
  eyebrow: 'CEO & Founder — Belajarlagi',  // Small label above the name
  name: 'Faiz Ghifari',
  tagline: "Building Indonesia's learning culture.",
  cta: {
    label: 'Get in Touch',
    href: '#contact',
  },
  portrait: {
    src: '/faiz-optimized.jpg',
    alt: 'Faiz Ghifari, portrait',
  },
}

// -----------------------------------------------------------------------------
// ABOUT — bio section with stats and social movements
// -----------------------------------------------------------------------------
export const about = {
  label: 'About',    // Small eyebrow label above the heading
  heading: 'A builder of learning culture.',

  // Each string becomes one paragraph in the bio
  bio: [
    'Faiz is the CEO & Founder of Belajarlagi, an edtech startup with 10,000+ alumni and 30+ corporate clients. He has personally trained 30,000+ individuals in Generative AI, critical thinking, project management, digital marketing, startup building, and personal development.',
    'He is an educational content creator on Twitter/X with 100,000 followers, reaching 15–20 million accounts per month.',
    'He has co-initiated social movements that mobilize everyday and impact millions Indonesians around mutual aid, education access, and civic futures.',
  ],

  // Stats shown as large numbers with labels
  // Set xIcon: true on any stat whose label should end with the X (Twitter) logo
  stats: [
    { label: 'Belajarlagi alumni',  value: '10,000+' },
    { label: 'Individuals trained', value: '30,000+' },
    { label: 'Followers on',        value: '100,000', xIcon: true },
  ],

  movements: {
    label: 'Social movements co-initiated',  // Eyebrow label above the list
    // Each item: { name, href? } — items with href render as external links
    items: [
      { name: 'wargabantuwarga', href: 'https://wargabantuwarga.id/' },
      {
        name: 'GratisinBelajar',
        href: 'https://kumparan.com/teman-kumparan/gratisinbelajar-com-platform-kelas-online-gratis-yang-tandingi-prakerja-1tUlWhQMBUs',
      },
      {
        name: 'UrunDaya',
        href: 'https://www.suara.com/news/2021/07/08/121643/urun-daya-covid-situs-inisiatif-masyarakat-bantu-sesama-akses-bantuan-saat-pandemi',
      },
      {
        name: 'ButuhDriver',
        href: 'https://kumparan.com/teman-kumparan/viral-butuhdriver-aplikasi-ini-dibuat-untuk-atasi-ojol-yang-terdampak-pandemi-1tG68eARUWn',
      },
      {
        name: 'Kawal Masa Depan',
        href: 'https://whiteboardjournal.com/ideas/human-interest/untuk-membantu-anak-yatim-piatu-karena-covid-19-lahir-inisiatif-kawal-masa-depan/',
      },
      { name: 'BacaQuran.org', href: 'https://bacaquran.org/' },
    ],
  },
}

// -----------------------------------------------------------------------------
// PORTFOLIO — speaking & training section header
// (the organization cards themselves live in src/data/portfolio.js)
// -----------------------------------------------------------------------------
export const portfolio = {
  label: 'Speaking & Training',  // Eyebrow label
  heading: "Organizations I've worked with.",
}

// -----------------------------------------------------------------------------
// MEDIA — press & features section header
// (the outlet list lives in src/data/media.js)
// -----------------------------------------------------------------------------
export const media = {
  label: 'Media Features',  // Eyebrow label
  heading: 'As featured in.',
}

// -----------------------------------------------------------------------------
// TOPICS — expertise section header
// (the topic cards themselves live in src/data/topics.js)
// -----------------------------------------------------------------------------
export const topics = {
  label: 'Topics & Expertise',  // Eyebrow label
  heading: 'What I teach.',
}

// -----------------------------------------------------------------------------
// TRAVEL — map section
// (the pin data lives in src/data/pins.js)
// -----------------------------------------------------------------------------
export const travel = {
  heading: "Places I've been in Indonesia",
  subtitle:
    "Stepping into a place I don't know usually teaches me something I didn't realize I was missing, and makes for better conversations when I get home.",
  map: {
    src: '/indonesia-map-optimized.jpg',
  },
  legend: {
    dive: 'Dive site logged',  // Label for the filled-dot legend entry
    visited: 'Visited',        // Label for the hollow-dot legend entry
  },
}

// -----------------------------------------------------------------------------
// BLOG / WRITING — section header and card label
// (the post data lives in src/data/posts.js)
// -----------------------------------------------------------------------------
export const blog = {
  label: 'Writing',                   // Eyebrow label
  heading: 'Thoughts & field notes.',
  readLabel: 'Read',                  // Text on each post card's read-more link
}

// -----------------------------------------------------------------------------
// FOOTER / CONTACT — the bottom "Let's talk" section
// -----------------------------------------------------------------------------
export const footer = {
  heading: "Let's talk. ☕️",

  // Contact entries rendered in order.
  // - href required → renders as a link
  // - external: true → adds target="_blank" rel="noopener noreferrer"
  // - no href → renders as plain text (e.g. location)
  contact: [
    {
      label: 'Email',
      value: 'faiz@belajarlagi.id',
      href: 'mailto:faiz@belajarlagi.id',
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/faizghifari',
      href: 'https://www.linkedin.com/in/faizghifari/',
      external: true,
    },
    {
      label: 'X',
      value: '@mfaizghifari',
      href: 'https://x.com/mfaizghifari',
      external: true,
    },
    {
      label: 'Instagram',
      value: '@mfaizghifarii',
      href: 'https://instagram.com/mfaizghifarii',
      external: true,
    },
    {
      label: 'Based in',
      value: 'BSD, Indonesia',
      // no href — renders as plain text
    },
  ],

  copyright: '© 2026 Faiz Ghifari',
  tagline: '',
}
