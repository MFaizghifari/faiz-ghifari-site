// Edit via /keystatic or data/content/pins/index.json.
import data from './content/pins/index.json'

// Rebuild the shape components expect: each place has `coords: [lng, lat]` plus
// optional `dive`, `highlights`, `diveSpots`. Empty arrays and `dive: false`
// are dropped so the runtime shape matches what TravelMap.jsx originally had.
export const regions = data.regions.map((region) => ({
  name: region.name,
  places: region.places.map((p) => {
    const place = { name: p.name, coords: [p.lng, p.lat] }
    if (p.dive) place.dive = true
    if (p.highlights && p.highlights.length) place.highlights = p.highlights
    if (p.diveSpots && p.diveSpots.length) place.diveSpots = p.diveSpots
    return place
  }),
}))

export const flatPins = regions.flatMap((r) =>
  r.places.map((p) => ({ ...p, region: r.name }))
)

export const stats = {
  regions: regions.length,
  places: flatPins.length,
  dives: data.divesLogged,
}
