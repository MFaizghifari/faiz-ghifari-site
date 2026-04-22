import { config, fields, singleton, collection } from '@keystatic/core'

// -----------------------------------------------------------------------------
// Keystatic CMS configuration for faizghifari.com
// Admin UI lives at /keystatic. Content is stored as JSON + Markdown under the
// repo, imported by data/*.js wrappers that feed the React components.
// -----------------------------------------------------------------------------

const linkItem = fields.object({
  label: fields.text({ label: 'Label' }),
  href: fields.text({ label: 'Link (href)' }),
})

// Storage mode:
// - In dev (npm run dev): 'local' — edits write directly to files on your Mac
// - In production (Vercel): 'github' — edits become commits via GitHub OAuth,
//   Vercel auto-deploys, site updates without touching your laptop
//
// Must use NODE_ENV (not a custom env var) because Keystatic's config is read
// on the client too, and Next.js only inlines NODE_ENV/NEXT_PUBLIC_* on the client.
const storage =
  process.env.NODE_ENV === 'production'
    ? {
        kind: 'github',
        repo: { owner: 'MFaizghifari', name: 'faiz-ghifari-site' },
      }
    : { kind: 'local' }

export default config({
  storage,

  ui: {
    brand: { name: 'faizghifari.com' },
    navigation: {
      'Site content': ['siteContent'],
      'Lists': ['portfolio', 'media', 'topics', 'pins', 'books'],
      'Writing': ['posts'],
    },
  },

  singletons: {
    // ------------------------------------------------------------------
    // SITE CONTENT — all text on the page (nav, hero, about, headers, footer)
    // ------------------------------------------------------------------
    siteContent: singleton({
      label: 'Site content',
      path: 'data/content/site/',
      format: { data: 'json' },
      schema: {
        nav: fields.object(
          {
            logoMark: fields.text({ label: 'Logo monogram', description: 'Two-letter mark shown top-left' }),
            logoLabel: fields.text({ label: 'Logo aria-label' }),
            links: fields.array(linkItem, {
              label: 'Nav links',
              itemLabel: (props) => props.fields.label.value,
            }),
          },
          { label: 'Nav' }
        ),

        hero: fields.object(
          {
            eyebrow: fields.text({ label: 'Eyebrow (small label above name)' }),
            name: fields.text({ label: 'Name' }),
            tagline: fields.text({ label: 'Tagline', multiline: true }),
            ctaLabel: fields.text({ label: 'CTA button label' }),
            ctaHref: fields.text({ label: 'CTA button link' }),
            portraitSrc: fields.text({ label: 'Portrait image path', description: 'e.g. /faiz-optimized.jpg' }),
            portraitAlt: fields.text({ label: 'Portrait alt text' }),
          },
          { label: 'Hero' }
        ),

        about: fields.object(
          {
            label: fields.text({ label: 'Section label' }),
            heading: fields.text({ label: 'Heading' }),
            bio: fields.array(fields.text({ label: 'Paragraph', multiline: true }), {
              label: 'Bio paragraphs',
              itemLabel: (props) => (props.value || '').slice(0, 80),
            }),
            stats: fields.array(
              fields.object({
                label: fields.text({ label: 'Label' }),
                value: fields.text({ label: 'Value (e.g. 10,000+)' }),
                xIcon: fields.checkbox({ label: 'Append X (Twitter) logo after label' }),
              }),
              {
                label: 'Stats',
                itemLabel: (props) =>
                  `${props.fields.value.value} — ${props.fields.label.value}`,
              }
            ),
            movementsLabel: fields.text({ label: 'Movements section label' }),
            movements: fields.array(
              fields.object({
                name: fields.text({ label: 'Name' }),
                href: fields.text({ label: 'Link (optional)' }),
              }),
              {
                label: 'Movements',
                itemLabel: (props) => props.fields.name.value,
              }
            ),
          },
          { label: 'About' }
        ),

        portfolioHeader: fields.object(
          {
            label: fields.text({ label: 'Section label' }),
            heading: fields.text({ label: 'Heading' }),
          },
          { label: 'Portfolio section header' }
        ),

        mediaHeader: fields.object(
          {
            label: fields.text({ label: 'Section label' }),
            heading: fields.text({ label: 'Heading' }),
          },
          { label: 'Media section header' }
        ),

        topicsHeader: fields.object(
          {
            label: fields.text({ label: 'Section label' }),
            heading: fields.text({ label: 'Heading' }),
          },
          { label: 'Topics section header' }
        ),

        travel: fields.object(
          {
            heading: fields.text({ label: 'Heading' }),
            subtitle: fields.text({ label: 'Subtitle', multiline: true }),
            mapSrc: fields.text({ label: 'Map image path' }),
            legendDive: fields.text({ label: 'Legend: dive site label' }),
            legendVisited: fields.text({ label: 'Legend: visited label' }),
          },
          { label: 'Travel' }
        ),

        blog: fields.object(
          {
            label: fields.text({ label: 'Section label' }),
            heading: fields.text({ label: 'Heading' }),
            readLabel: fields.text({ label: 'Read-more link label' }),
          },
          { label: 'Blog section header' }
        ),

        footer: fields.object(
          {
            heading: fields.text({ label: 'Heading' }),
            contact: fields.array(
              fields.object({
                label: fields.text({ label: 'Label' }),
                value: fields.text({ label: 'Displayed value' }),
                href: fields.text({ label: 'Link (leave blank for plain text)' }),
                external: fields.checkbox({ label: 'Open in new tab' }),
              }),
              {
                label: 'Contact entries',
                itemLabel: (props) =>
                  `${props.fields.label.value} — ${props.fields.value.value}`,
              }
            ),
            copyright: fields.text({ label: 'Copyright line' }),
            tagline: fields.text({ label: 'Tagline (optional)' }),
          },
          { label: 'Footer' }
        ),
      },
    }),

    // ------------------------------------------------------------------
    // PORTFOLIO — speaking & training clients
    // ------------------------------------------------------------------
    portfolio: singleton({
      label: 'Portfolio',
      path: 'data/content/portfolio/',
      format: { data: 'json' },
      schema: {
        items: fields.array(
          fields.object({
            name: fields.text({ label: 'Client name' }),
            detail: fields.text({ label: 'Detail line', multiline: true }),
            logo: fields.text({
              label: 'Logo path',
              description: 'e.g. /logos/bca.svg — leave blank to show a wordmark',
            }),
            size: fields.select({
              label: 'Card size',
              options: [
                { label: 'Default', value: 'default' },
                { label: 'Wide (logo)', value: 'wide' },
                { label: 'Seal (small round)', value: 'seal' },
              ],
              defaultValue: 'default',
            }),
          }),
          {
            label: 'Clients',
            itemLabel: (props) => props.fields.name.value,
          }
        ),
      },
    }),

    // ------------------------------------------------------------------
    // MEDIA — press outlets
    // ------------------------------------------------------------------
    media: singleton({
      label: 'Media features',
      path: 'data/content/media/',
      format: { data: 'json' },
      schema: {
        items: fields.array(
          fields.object({
            name: fields.text({ label: 'Outlet name' }),
            outlet: fields.text({ label: 'Subtitle / section (optional)' }),
            href: fields.text({
              label: 'Article URL',
              description: 'If present, the card becomes a clickable link',
            }),
          }),
          {
            label: 'Outlets',
            itemLabel: (props) => props.fields.name.value,
          }
        ),
      },
    }),

    // ------------------------------------------------------------------
    // TOPICS — expertise cards
    // ------------------------------------------------------------------
    topics: singleton({
      label: 'Topics',
      path: 'data/content/topics/',
      format: { data: 'json' },
      schema: {
        items: fields.array(
          fields.object({
            title: fields.text({ label: 'Title' }),
            blurb: fields.text({ label: 'One-line description', multiline: true }),
          }),
          {
            label: 'Topics',
            itemLabel: (props) => props.fields.title.value,
          }
        ),
      },
    }),

    // ------------------------------------------------------------------
    // BOOKS — "Books I love" shelf
    // ------------------------------------------------------------------
    books: singleton({
      label: 'Books',
      path: 'data/content/books/',
      format: { data: 'json' },
      schema: {
        items: fields.array(
          fields.object({
            slug: fields.text({
              label: 'Slug',
              description: 'Unique id, kebab-case, e.g. thinking-with-type',
            }),
            title: fields.text({ label: 'Title' }),
            author: fields.text({ label: 'Author' }),
            cover: fields.text({
              label: 'Cover image path',
              description: 'e.g. /books/thinking-with-type.jpg (place file in /public/books/)',
            }),
            quote: fields.text({
              label: 'Personal quote / note',
              multiline: true,
            }),
            spineColor: fields.text({
              label: 'Spine color',
              description: 'CSS color, e.g. #7a1f1f or rebeccapurple',
            }),
            spineTextColor: fields.text({
              label: 'Spine text color (optional)',
              description: 'Defaults to white. Use a dark hex for light spines.',
            }),
          }),
          {
            label: 'Books',
            itemLabel: (props) =>
              `${props.fields.title.value}${props.fields.author.value ? ' — ' + props.fields.author.value : ''}`,
          }
        ),
      },
    }),

    // ------------------------------------------------------------------
    // PINS — travel map (regions, places, dive sites)
    // ------------------------------------------------------------------
    pins: singleton({
      label: 'Travel pins',
      path: 'data/content/pins/',
      format: { data: 'json' },
      schema: {
        divesLogged: fields.integer({
          label: 'Total dives logged',
          description: 'Shown as a stat under the map',
        }),
        regions: fields.array(
          fields.object({
            name: fields.text({ label: 'Region name' }),
            places: fields.array(
              fields.object({
                name: fields.text({ label: 'Place name' }),
                lng: fields.number({ label: 'Longitude' }),
                lat: fields.number({ label: 'Latitude' }),
                dive: fields.checkbox({ label: 'Dive site' }),
                highlights: fields.array(fields.text({ label: 'Highlight' }), {
                  label: 'Highlights',
                  itemLabel: (p) => p.value,
                }),
                diveSpots: fields.array(fields.text({ label: 'Dive spot' }), {
                  label: 'Dive spots',
                  itemLabel: (p) => p.value,
                }),
              }),
              {
                label: 'Places',
                itemLabel: (props) => props.fields.name.value,
              }
            ),
          }),
          {
            label: 'Regions',
            itemLabel: (props) => props.fields.name.value,
          }
        ),
      },
    }),
  },

  // ------------------------------------------------------------------
  // BLOG POSTS — one Markdown file per post under content/posts/
  // ------------------------------------------------------------------
  collections: {
    posts: collection({
      label: 'Blog posts',
      path: 'content/posts/*',
      slugField: 'title',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({
          name: { label: 'Title' },
          slug: {
            label: 'URL slug',
            description: 'Filename and /blog/ path segment (no spaces)',
          },
        }),
        tag: fields.text({
          label: 'Tag',
          description: 'Short uppercase category, e.g. EDUCATION',
        }),
        date: fields.text({
          label: 'Display date',
          description: 'Shown on the card, e.g. "March 2026"',
        }),
        order: fields.integer({
          label: 'Order',
          description: 'Higher numbers appear first on the homepage',
          defaultValue: 0,
        }),
        excerpt: fields.text({
          label: 'Excerpt',
          description: 'One-line description shown on the homepage card',
          multiline: true,
        }),
        content: fields.markdoc({ label: 'Body', extension: 'md' }),
      },
    }),
  },
})
