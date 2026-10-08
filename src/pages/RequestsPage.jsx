import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, SlidersHorizontal, ClipboardList } from 'lucide-react';
import { useRequests } from '../context/RequestsContext';
import { PRIORITIES, STATUSES, sortNewest } from '../utils/requests';
import RequestCard from '../components/RequestCard';

export default function RequestsPage() {
  const { requests } = useRequests();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All statuses');
  const [priority, setPriority] = useState('All priorities');

  const filtered = useMemo(() => sortNewest(requests).filter((request) => {
    const text = `${request.title} ${request.id} ${request.category} ${request.requester}`.toLowerCase();
    return text.includes(query.toLowerCase().trim())
      && (status === 'All statuses' || request.status === status)
      && (priority === 'All priorities' || request.priority === priority);
  }), [requests, query, status, priority]);

  function clearFilters() { setQuery(''); setStatus('All statuses'); setPriority('All priorities'); }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-5"><div><p className="eyebrow">REQUESTS / ALL</p><h1 className="page-title">All requests</h1><p className="page-subtitle">Search, filter, and open any facilities request.</p></div><Link to="/requests/new" className="btn-primary"><Plus size={17} /> New request</Link></div>
      <section aria-label="Request filters" className="panel mt-8 grid gap-3 p-4 sm:grid-cols-[1fr_auto_auto] sm:p-5">
        <label className="relative block"><span className="sr-only">Search requests</span><Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" /><input className="field-input pl-10" type="search" placeholder="Search title, ID, category, or requester" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
        <label><span className="sr-only">Filter by status</span><select className="field-input sm:min-w-40" value={status} onChange={(event) => setStatus(event.target.value)}><option>All statuses</option>{STATUSES.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label><span className="sr-only">Filter by priority</span><select className="field-input sm:min-w-40" value={priority} onChange={(event) => setPriority(event.target.value)}><option>All priorities</option>{PRIORITIES.map((item) => <option key={item}>{item}</option>)}</select></label>
      </section>
      <div className="mt-5 flex items-center justify-between"><p className="text-sm font-semibold text-slate-500">Showing <strong className="text-slate-900">{filtered.length}</strong> of {requests.length} requests</p><span className="flex items-center gap-2 text-xs font-semibold text-slate-400"><SlidersHorizontal size={15} /> Newest first</span></div>
      {filtered.length > 0 ? <div className="mt-4 grid gap-4 md:grid-cols-2 2xl:grid-cols-3">{filtered.map((request) => <RequestCard key={request.id} request={request} />)}</div> : <div className="panel mt-4 flex flex-col items-center px-6 py-16 text-center"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-slate-500"><ClipboardList size={25} /></span><h2 className="mt-5 text-lg font-bold">No requests found</h2><p className="mt-2 max-w-sm text-sm text-slate-500">Try a different search or clear the filters to see all requests.</p><button type="button" className="btn-secondary mt-5" onClick={clearFilters}>Clear filters</button></div>}
    </div>
  );
}
