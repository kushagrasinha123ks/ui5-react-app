import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPinned } from 'lucide-react';
import { useRequests } from '../context/RequestsContext';
import { locations } from '../data/locations';
import MapBoard from '../components/MapBoard';
import StatusBadge from '../components/StatusBadge';

export default function LocationsPage() {
  const { requests } = useRequests();
  const [selectedId, setSelectedId] = useState(locations[0].id);
  const selected = locations.find((location) => location.id === selectedId);
  const locationRequests = requests.filter((request) => request.locationId === selectedId);
  const counts = useMemo(() => Object.fromEntries(locations.map((location) => [location.id, requests.filter((request) => request.locationId === location.id).length])), [requests]);

  return (
    <div><p className="eyebrow">CAMPUS / LOCATIONS</p><h1 className="page-title">Location map</h1><p className="page-subtitle">Select a building to see its requests.</p>
      <div className="mt-8 grid gap-5 xl:grid-cols-[1.7fr_1fr]"><section className="panel p-4 sm:p-6"><MapBoard selectedId={selectedId} onSelect={setSelectedId} counts={counts} /><div className="mt-4 flex flex-wrap gap-2">{locations.map((location) => <button key={location.id} type="button" onClick={() => setSelectedId(location.id)} className={`rounded-full px-3 py-1.5 text-xs font-bold ${selectedId === location.id ? 'bg-[#183a30] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{location.name}</button>)}</div></section>
      <section className="panel p-6"><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#e9f7c4] text-[#315d32]"><MapPinned size={21} /></span><div><h2 className="section-title">{selected?.name}</h2><p className="text-xs text-slate-500">{selected?.description}</p></div></div><p className="mt-6 text-sm font-semibold text-slate-500"><strong className="text-2xl text-slate-900">{locationRequests.length}</strong> requests on record</p><div className="mt-4 divide-y divide-slate-100 border-t border-slate-100">{locationRequests.length ? locationRequests.map((request) => <Link key={request.id} to={`/requests/${request.id}`} className="flex items-center gap-3 py-4 hover:text-emerald-800"><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{request.title}</p><p className="mt-1 text-xs text-slate-500">{request.id}</p></div><StatusBadge status={request.status} /><ArrowUpRight size={16} className="shrink-0 text-slate-400" /></Link>) : <p className="py-6 text-sm text-slate-500">No requests for this location yet.</p>}</div></section></div>
    </div>
  );
}
