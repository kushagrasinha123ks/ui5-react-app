import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarDays, ClipboardList, MapPin, UserRound, CircleCheck, Clock3 } from 'lucide-react';
import { useRequests } from '../context/RequestsContext';
import { locationName } from '../data/locations';
import { formatDate, STATUSES } from '../utils/requests';
import StatusBadge from '../components/StatusBadge';

export default function RequestDetailPage() {
  const { id } = useParams();
  const { requests, updateStatus } = useRequests();
  const request = requests.find((item) => item.id === id);

  if (!request) return <div className="panel mx-auto max-w-xl p-8 text-center"><h1 className="text-2xl font-bold">Request not found</h1><p className="mt-2 text-sm text-slate-500">It may have been removed from this browser.</p><Link className="btn-primary mt-5" to="/requests">Back to requests</Link></div>;

  return (
    <div className="mx-auto max-w-5xl">
      <Link to="/requests" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900"><ArrowLeft size={16} /> Back to requests</Link>
      <div className="mt-6 flex flex-wrap items-start justify-between gap-4"><div><p className="eyebrow">REQUESTS / {request.id}</p><h1 className="page-title max-w-3xl">{request.title}</h1><p className="page-subtitle">Created {formatDate(request.createdAt)} · {request.category}</p></div><StatusBadge status={request.status} /></div>
      <div className="mt-8 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-5"><section className="panel p-6 sm:p-8"><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-slate-100 text-slate-600"><ClipboardList size={21} /></span><h2 className="section-title">Description</h2></div><p className="mt-5 whitespace-pre-wrap text-sm leading-7 text-slate-600">{request.description}</p></section><section className="panel p-6 sm:p-8"><h2 className="section-title">Activity</h2><div className="mt-6 flex gap-4"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700"><CircleCheck size={18} /></span><div><p className="text-sm font-bold">Request created</p><p className="mt-1 text-xs text-slate-500">{formatDate(request.createdAt)} by {request.requester}</p></div></div>{request.updatedAt !== request.createdAt && <div className="mt-6 flex gap-4"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-blue-100 text-blue-700"><Clock3 size={18} /></span><div><p className="text-sm font-bold">Status updated to {request.status}</p><p className="mt-1 text-xs text-slate-500">{formatDate(request.updatedAt)}</p></div></div>}</section></div>
        <aside className="space-y-5"><section className="panel p-6"><h2 className="section-title">Manage request</h2><label htmlFor="request-status" className="mt-5 block text-xs font-bold uppercase tracking-wide text-slate-500">Status</label><select id="request-status" className="field-input mt-2" value={request.status} onChange={(event) => updateStatus(request.id, event.target.value)}>{STATUSES.map((status) => <option key={status}>{status}</option>)}</select><p className="mt-3 text-xs leading-5 text-slate-500">Changes are saved automatically in this browser.</p></section><section className="panel p-6"><h2 className="section-title">Request information</h2><dl className="mt-5 space-y-5 text-sm"><div className="flex items-start gap-3"><UserRound size={17} className="mt-0.5 text-slate-400" /><div><dt className="text-xs text-slate-500">Requested by</dt><dd className="mt-0.5 font-semibold">{request.requester}</dd></div></div><div className="flex items-start gap-3"><MapPin size={17} className="mt-0.5 text-slate-400" /><div><dt className="text-xs text-slate-500">Location</dt><dd className="mt-0.5 font-semibold">{locationName(request.locationId)}</dd></div></div><div className="flex items-start gap-3"><CalendarDays size={17} className="mt-0.5 text-slate-400" /><div><dt className="text-xs text-slate-500">Last updated</dt><dd className="mt-0.5 font-semibold">{formatDate(request.updatedAt)}</dd></div></div><div><dt className="text-xs text-slate-500">Priority</dt><dd className="mt-0.5 font-semibold">{request.priority}</dd></div></dl></section></aside>
      </div>
    </div>
  );
}
