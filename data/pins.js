export const regions = [
  {
    name: 'Maluku',
    places: [
      {
        name: 'Ambon',
        coords: [128.181, -3.695],
        dive: true,
        highlights: ['Natsepa', 'Pantai Liang', 'Morella', 'Benteng VOC', 'Masjid tertua di Indonesia'],
        diveSpots: ['Hukurilla', 'Laha', 'Tulehu'],
      },
      {
        name: 'Banda Neira',
        coords: [129.898, -4.523],
        highlights: ['Gunung Api Banda', 'Banda Besar', 'Lava Point', 'Pulau Hatta', 'Benteng mata uang'],
      },
      {
        name: 'Pulau Kei',
        coords: [132.747, -5.701],
        highlights: ['Ngurbloat', 'Ngurvloat', 'Hidden Coral Reef'],
      },
    ],
  },
  {
    name: 'Sulawesi Utara',
    places: [
      { name: 'Manado', coords: [124.841, 1.487] },
      { name: 'Minahasa Utara', coords: [125.036, 1.555] },
    ],
  },
  {
    name: 'Nusa Tenggara Timur',
    places: [
      { name: 'Kupang', coords: [123.608, -10.179] },
      { name: 'Maumere', coords: [122.213, -8.619] },
      { name: 'Ende', coords: [121.659, -8.843], highlights: ['Kelimutu'] },
    ],
  },
  {
    name: 'Nusa Tenggara Barat',
    places: [
      { name: 'Mataram', coords: [116.116, -8.583], highlights: ['Lombok'] },
      { name: 'Sembalun', coords: [116.543, -8.368], highlights: ['Lombok'] },
      { name: 'Gili Trawangan', coords: [116.04, -8.35], dive: true },
    ],
  },
  {
    name: 'Bali',
    places: [
      { name: 'Denpasar', coords: [115.22, -8.671] },
      { name: 'Kuta', coords: [115.17, -8.722] },
      { name: 'Ubud', coords: [115.263, -8.506] },
      { name: 'Gunung Kintamani', coords: [115.36, -8.25] },
      {
        name: 'Nusa Lembongan',
        coords: [115.446, -8.68],
        highlights: ["Devil's Tear", 'Ceningan', 'Yellow Bridge'],
      },
      { name: 'Nusa Penida', coords: [115.544, -8.727], dive: true },
    ],
  },
  {
    name: 'Kalimantan',
    places: [
      { name: 'Tarakan', coords: [117.612, 3.305], highlights: ['Kalimantan Utara'] },
      { name: 'Pontianak', coords: [109.322, -0.026], highlights: ['Kalimantan Barat'] },
    ],
  },
  {
    name: 'Papua',
    places: [
      {
        name: 'Manokwari',
        coords: [134.062, -0.863],
        highlights: ['Gunung Botak', 'Papua Barat'],
      },
      { name: 'Sorong', coords: [131.256, -0.88], highlights: ['Papua Barat Daya'] },
      { name: 'Raja Ampat', coords: [130.517, -0.234], dive: true, highlights: ['Papua Barat Daya'] },
    ],
  },
  {
    name: 'Sumatera',
    places: [
      { name: 'Pekanbaru', coords: [101.445, 0.51], highlights: ['Riau'] },
      { name: 'Bangka', coords: [106.134, -2.049] },
      { name: 'Kepulauan Belitung', coords: [107.646, -2.74] },
      { name: 'Batam', coords: [104.031, 1.12] },
      { name: 'Padang', coords: [100.361, -0.948] },
      { name: 'Lampung', coords: [105.266, -5.45] },
      { name: 'Banda Aceh', coords: [95.322, 5.548] },
      { name: 'Sabang', coords: [95.328, 5.893], dive: true, highlights: ['Pulau Weh'] },
    ],
  },
  {
    name: 'Jawa',
    places: [
      { name: 'Jakarta', coords: [106.816, -6.2] },
      { name: 'Bandung', coords: [107.609, -6.914], highlights: ['Gunung Burangrang'] },
      { name: 'Semarang', coords: [110.423, -6.966] },
      { name: 'Kudus', coords: [110.84, -6.805] },
      {
        name: 'Solo',
        coords: [110.824, -7.556],
        highlights: ['Gunung Lawu (via Cemoro Sewu, Cemoro Kandang, Candi Cetho)'],
      },
      { name: 'Jogja', coords: [110.367, -7.796] },
      {
        name: 'Salatiga',
        coords: [110.492, -7.331],
        highlights: ['Gunung Merapi', 'Gunung Merbabu'],
      },
      { name: 'Bromo', coords: [112.953, -7.942] },
      { name: 'Surabaya', coords: [112.748, -7.25] },
      { name: 'Malang', coords: [112.634, -7.967] },
      { name: 'Subang', coords: [107.762, -6.572] },
      { name: 'Madura', coords: [113.37, -7.0] },
    ],
  },
]

export const flatPins = regions.flatMap((r) =>
  r.places.map((p) => ({ ...p, region: r.name }))
)

export const stats = {
  regions: regions.length,
  places: flatPins.length,
  // Total dives logged (some dive trips aren't represented as separate map pins).
  dives: 25,
}
