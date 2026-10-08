import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CheckCircle2, ClipboardList, Clock3, MapPinned, Plus, AlertTriangle } from 'lucide-react';
import { useRequests } from '../context/RequestsContext';
import { locations, locationName } from '../data/locations';
import { formatDate, sortNewest, summarizeRequests } from '../utils/requests';
import StatusBadge from '../components/StatusBadge';
import MapBoard from '../components/MapBoard';

export default function Dashboard() {
  const { requests } = useRequests();
  const [selectedId, setSelectedId] = useState('central-hub');
  const summary = useMemo(() => summarizeRequests(requests), [requests]);
  const recent = useMemo(() => sortNewest(requests).slice(0, 5), [requests]);
  const counts = useMemo(() => Object.fromEntries(locations.map((location) => [location.id, requests.filter((request) => request.locationId === location.id).length])), [requests]);
  const selectedLocation = locations.find((location) => location.id === selectedId);
  const today = new Intl.DateTimeFormat('en-IN', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date());

  const stats = [
    { label: 'Total requests', value: summary.total, icon: ClipboardList, iconClass: 'bg-slate-100 text-slate-700' },
    { label: 'Open', value: summary.open, icon: AlertTriangle, iconClass: 'bg-amber-100 text-amber-700' },
    { label: 'In progress', value: summary.inProgress, icon: Clock3, iconClass: 'bg-blue-100 text-blue-700' },
    { label: 'Resolved', value: summary.resolved, icon: CheckCircle2, iconClass: 'bg-emerald-100 text-emerald-700' },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div><p className="eyebrow">FACILITIES WORKSPACE <span className="mx-2 text-slate-300">/</span> {today}</p><h1 className="page-title">Overview</h1><p className="page-subtitle">A clear view of what needs attention across the campus.</p></div>
        <Link to="/requests/new" className="btn-primary"><Plus size={17} /> New request</Link>
      </div>

      <section aria-label="Request summary" className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, iconClass }) => (
          <div key={label} className="panel flex items-start justify-between p-5"><div><p className="text-sm font-medium text-slate-500">{label}</p><p className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900">{value}</p></div><span className={`grid h-11 w-11 place-items-center rounded-xl ${iconClass}`}><Icon size={21} /></span></div>
        ))}
      </section>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.65fr_1fr]">
        <section className="panel min-w-0 overflow-hidden" aria-labelledby="recent-title">
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-5 sm:px-6"><div><h2 id="recent-title" className="section-title">Recent requests</h2><p className="mt-1 text-sm text-slate-500">Latest activity across all locations</p></div><Link to="/requests" className="text-link shrink-0">View all <ArrowRight size={16} /></Link></div>
          <div className="divide-y divide-slate-100">
            {recent.map((request) => (
              <Link key={request.id} to={`/requests/${request.id}`} className="flex items-center gap-3 px-5 py-4 transition hover:bg-slate-50 sm:px-6">
                <span className={`hidden h-9 w-1 shrink-0 rounded-full sm:block ${request.priority === 'High' ? 'bg-rose-400' : request.priority === 'Medium' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                <div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-slate-800">{request.title}</p><p className="mt-1 text-xs text-slate-500">{request.id} · {locationName(request.locationId)} · {formatDate(request.createdAt)}</p></div>
                <span className="hidden sm:block"><StatusBadge status={request.status} /></span><ArrowUpRight size={17} className="shrink-0 text-slate-400" />
              </Link>
            ))}
          </div>
        </section>

        <div className="space-y-5">
          <section className="panel p-5 sm:p-6" aria-labelledby="map-title"><div className="flex items-start justify-between gap-3"><div><h2 id="map-title" className="section-title">Location snapshot</h2><p className="mt-1 text-sm text-slate-500">Requests by campus area</p></div><span className="rounded-xl bg-emerald-50 p-2.5 text-emerald-700"><MapPinned size={20} /></span></div><div className="mt-5"><MapBoard selectedId={selectedId} onSelect={setSelectedId} counts={counts} /></div><div className="mt-4 flex items-center justify-between gap-3"><div><p className="text-sm font-bold">{selectedLocation?.name}</p><p className="text-xs text-slate-500">{counts[selectedId] ?? 0} requests on record</p></div><Link to="/locations" className="text-link">Explore map <ArrowRight size={16} /></Link></div></section>
          <section className="rounded-2xl bg-[#d9f36a] p-5 sm:p-6"><p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#426022]">Priority check</p><p className="mt-3 text-3xl font-extrabold tracking-tight text-[#173126]">{summary.urgent} high priority</p><p className="mt-2 text-sm leading-6 text-[#43583a]">Unresolved high-priority requests need a closer look.</p><Link to="/requests" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#173126] underline underline-offset-4">Review requests <ArrowRight size={16} /></Link></section>
        </div>
      </div>
    </div>
  );
}
