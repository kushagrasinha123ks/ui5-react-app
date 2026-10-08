import { MapPin } from 'lucide-react';
import { locations } from '../data/locations';

export default function MapBoard({ selectedId, onSelect, counts = {} }) {
  return (
    <div className="campus-map" role="group" aria-label="Campus location map">
      <svg viewBox="0 0 900 520" className="absolute inset-0 h-full w-full" role="img" aria-label="Schematic campus layout with four buildings">
        <defs><pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M 28 0 L 0 0 0 28" fill="none" stroke="#d8e2d8" strokeWidth="1" /></pattern></defs>
        <rect width="900" height="520" fill="#edf3eb" /><rect width="900" height="520" fill="url(#grid)" opacity="0.65" />
        <path d="M0 235 H900 M447 0 V520" stroke="#d4dfd2" strokeWidth="50" fill="none" />
        <path d="M0 235 H900 M447 0 V520" stroke="#fafcf9" strokeWidth="41" fill="none" />
        <rect x="105" y="70" width="280" height="125" rx="18" fill="#c2d8cd" stroke="#9fbea9" strokeWidth="3" />
        <rect x="560" y="70" width="240" height="125" rx="18" fill="#d8e7d4" stroke="#aec7a9" strokeWidth="3" />
        <rect x="100" y="320" width="295" height="140" rx="18" fill="#d8e7d4" stroke="#aec7a9" strokeWidth="3" />
        <rect x="545" y="318" width="260" height="145" rx="18" fill="#c2d8cd" stroke="#9fbea9" strokeWidth="3" />
        <circle cx="449" cy="240" r="46" fill="#d8eac2" stroke="#aec59e" strokeWidth="3" />
        <path d="M410 240 H488 M449 201 V279" stroke="#8aab85" strokeWidth="3" />
        <text x="55" y="45" fill="#678073" fontSize="18" fontWeight="700" letterSpacing="4">SITE PLAN / A</text>
      </svg>
      {locations.map((location) => (
        <button key={location.id} type="button" onClick={() => onSelect?.(location.id)} style={{ left: `${location.x}%`, top: `${location.y}%` }} className={`map-pin ${selectedId === location.id ? 'map-pin-selected' : ''}`} aria-label={`${location.name}, ${counts[location.id] ?? 0} requests`} aria-pressed={selectedId === location.id}>
          <span className="map-pin-icon"><MapPin size={18} fill="currentColor" /></span>
          <span className="map-pin-label">{location.shortName}<b>{counts[location.id] ?? 0}</b></span>
        </button>
      ))}
      <div className="absolute bottom-3 left-3 rounded-lg bg-white/90 px-3 py-2 text-[10px] font-semibold text-slate-600 shadow-sm sm:bottom-5 sm:left-5">Illustrative campus map · select a pin</div>
    </div>
  );
}
