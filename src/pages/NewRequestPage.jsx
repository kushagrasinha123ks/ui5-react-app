import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, ClipboardPlus, Info } from 'lucide-react';
import { useRequests } from '../context/RequestsContext';
import { locations } from '../data/locations';
import { CATEGORIES, PRIORITIES, validateRequest } from '../utils/requests';

const initialValues = { title: '', requester: '', category: '', locationId: '', priority: '', description: '' };

export default function NewRequestPage() {
  const { addRequest } = useRequests();
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  function change(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateRequest(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      if (nextErrors.title) titleRef.current?.focus();
      return;
    }
    const id = addRequest(values);
    navigate(`/requests/${id}`);
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Link to="/requests" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900"><ArrowLeft size={16} /> Back to requests</Link>
      <div className="mt-6"><p className="eyebrow">REQUESTS / CREATE</p><h1 className="page-title">New request</h1><p className="page-subtitle">Tell the team what needs attention. Fields marked * are required.</p></div>
      <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_260px]">
        <form className="panel p-6 sm:p-8" onSubmit={handleSubmit} noValidate>
          <div className="flex items-center gap-3 border-b border-slate-100 pb-5"><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#e9f7c4] text-[#315d32]"><ClipboardPlus size={22} /></span><div><h2 className="text-lg font-bold">Request details</h2><p className="text-xs text-slate-500">A clear description helps the team respond.</p></div></div>
          <div className="mt-6 space-y-5">
            <Field label="Request title" name="title" error={errors.title}><input ref={titleRef} id="title" className="field-input" value={values.title} onChange={(event) => change('title', event.target.value)} placeholder="e.g. Projector not connecting in room N-204" aria-invalid={Boolean(errors.title)} aria-describedby={errors.title ? 'title-error' : undefined} /></Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Requested by" name="requester" error={errors.requester}><input id="requester" className="field-input" value={values.requester} onChange={(event) => change('requester', event.target.value)} placeholder="Your name" aria-invalid={Boolean(errors.requester)} aria-describedby={errors.requester ? 'requester-error' : undefined} /></Field>
              <Field label="Category" name="category" error={errors.category}><select id="category" className="field-input" value={values.category} onChange={(event) => change('category', event.target.value)} aria-invalid={Boolean(errors.category)} aria-describedby={errors.category ? 'category-error' : undefined}><option value="">Select category</option>{CATEGORIES.map((category) => <option key={category}>{category}</option>)}</select></Field>
              <Field label="Location" name="locationId" error={errors.locationId}><select id="locationId" className="field-input" value={values.locationId} onChange={(event) => change('locationId', event.target.value)} aria-invalid={Boolean(errors.locationId)} aria-describedby={errors.locationId ? 'locationId-error' : undefined}><option value="">Select location</option>{locations.map((location) => <option key={location.id} value={location.id}>{location.name}</option>)}</select></Field>
              <Field label="Priority" name="priority" error={errors.priority}><select id="priority" className="field-input" value={values.priority} onChange={(event) => change('priority', event.target.value)} aria-invalid={Boolean(errors.priority)} aria-describedby={errors.priority ? 'priority-error' : undefined}><option value="">Select priority</option>{PRIORITIES.map((priority) => <option key={priority}>{priority}</option>)}</select></Field>
            </div>
            <Field label="Description" name="description" error={errors.description}><textarea id="description" className="field-input min-h-32 resize-y" value={values.description} onChange={(event) => change('description', event.target.value)} placeholder="What happened, and where? Add any detail that will help." aria-invalid={Boolean(errors.description)} aria-describedby={errors.description ? 'description-error' : undefined} /></Field>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-end gap-3 border-t border-slate-100 pt-6"><Link to="/requests" className="btn-secondary">Cancel</Link><button type="submit" className="btn-primary"><Check size={17} /> Create request</button></div>
        </form>
        <aside className="self-start rounded-2xl border border-emerald-100 bg-[#eaf3eb] p-5"><div className="flex items-center gap-2 font-bold text-emerald-900"><Info size={18} /> Good to know</div><p className="mt-3 text-sm leading-6 text-emerald-900/80">New requests start with an <strong>Open</strong> status. You can update the status on the request detail page.</p><p className="mt-4 border-t border-emerald-200 pt-4 text-xs leading-5 text-emerald-900/70">This is a local demo. Your entries are saved in this browser only.</p></aside>
      </div>
    </div>
  );
}

function Field({ label, name, error, children }) {
  return <div><label htmlFor={name} className="mb-2 block text-sm font-bold text-slate-700">{label} <span className="text-rose-500">*</span></label>{children}{error && <p id={`${name}-error`} role="alert" className="mt-1.5 text-xs font-semibold text-rose-600">{error}</p>}</div>;
}
