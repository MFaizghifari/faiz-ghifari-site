import PackingList from '../../components/PackingList.jsx'

export const metadata = {
  title: 'Packing list — Faiz Ghifari',
  description:
    'Configurable packing list for trips that mix training, diving, leisure, and drone shoots. Set the day count per type and the list filters itself.',
  alternates: { canonical: '/packinglist' },
  // Tools page — not part of the editorial site, no need to surface in
  // search results aggressively.
  robots: { index: true, follow: true },
}

export default function PackingListPage() {
  return (
    <main>
      <PackingList />
    </main>
  )
}
