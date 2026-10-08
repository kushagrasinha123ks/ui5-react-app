export const locations = [
  { id: 'north-wing', name: 'North Wing', shortName: 'North', x: 27, y: 28, description: 'Offices and meeting rooms' },
  { id: 'central-hub', name: 'Central Hub', shortName: 'Central', x: 54, y: 43, description: 'Reception and shared spaces' },
  { id: 'west-annex', name: 'West Annex', shortName: 'West', x: 24, y: 72, description: 'IT and support teams' },
  { id: 'south-wing', name: 'South Wing', shortName: 'South', x: 69, y: 72, description: 'Training and operations' },
];

export function locationName(id) {
  return locations.find((location) => location.id === id)?.name ?? 'Unknown location';
}
