const styles = {
  Open: 'bg-amber-50 text-amber-800 ring-amber-200',
  'In progress': 'bg-blue-50 text-blue-800 ring-blue-200',
  Resolved: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
};

export default function StatusBadge({ status }) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ring-inset ${styles[status] ?? styles.Open}`}>{status}</span>;
}
