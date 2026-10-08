import { ArrowUpRight, CalendarDays, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { locationName } from '../data/locations';
import { formatDate } from '../utils/requests';
import StatusBadge from './StatusBadge';

const priorityDot = { High: 'bg-rose-500', Medium: 'bg-amber-500', Low: 'bg-emerald-500' };

export default function RequestCard({ request }) {
  return (
    <article className="panel flex h-full flex-col p-5 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/60">
      <div className="flex items-center justify-between gap-3"><span className="text-xs font-bold tracking-wide text-slate-400">{request.id}</span><StatusBadge status={request.status} /></div>
      <Link to={`/requests/${request.id}`} className="group mt-5 flex items-start justify-between gap-3 text-lg font-bold leading-snug tracking-tight hover:text-emerald-800">
        <span>{request.title}</span><ArrowUpRight className="mt-0.5 shrink-0 text-slate-400 group-hover:text-emerald-700" size={18} />
      </Link>
      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">{request.description}</p>
      <div className="mt-auto flex flex-wrap gap-x-4 gap-y-2 border-t border-slate-100 pt-5 text-xs font-medium text-slate-500">
        <span className="flex items-center gap-1.5"><MapPin size={14} /> {locationName(request.locationId)}</span>
        <span className="flex items-center gap-1.5"><CalendarDays size={14} /> {formatDate(request.createdAt)}</span>
      </div>
      <div className="mt-3 flex items-center justify-between"><span className="text-xs font-medium text-slate-500">{request.category}</span><span className="flex items-center gap-1.5 text-xs font-bold text-slate-600"><i className={`h-2 w-2 rounded-full ${priorityDot[request.priority]}`} />{request.priority} priority</span></div>
    </article>
  );
}
