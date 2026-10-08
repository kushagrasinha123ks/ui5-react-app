export const STATUSES = ['Open', 'In progress', 'Resolved'];
export const PRIORITIES = ['Low', 'Medium', 'High'];
export const CATEGORIES = ['Facilities', 'IT support', 'Safety'];

export function summarizeRequests(requests) {
  // reduce turns an array into the four numbers displayed on the dashboard.
  return requests.reduce((summary, request) => {
    summary.total += 1;
    if (request.status === 'Open') summary.open += 1;
    if (request.status === 'In progress') summary.inProgress += 1;
    if (request.status === 'Resolved') summary.resolved += 1;
    if (request.priority === 'High' && request.status !== 'Resolved') summary.urgent += 1;
    return summary;
  }, { total: 0, open: 0, inProgress: 0, resolved: 0, urgent: 0 });
}

export function validateRequest(values) {
  const errors = {};
  if (!values.title.trim()) errors.title = 'Give this request a short title.';
  else if (values.title.trim().length < 8) errors.title = 'Use at least 8 characters.';
  if (!values.requester.trim()) errors.requester = 'Enter the requester name.';
  if (!values.category) errors.category = 'Choose a category.';
  if (!values.locationId) errors.locationId = 'Choose a location.';
  if (!values.priority) errors.priority = 'Choose a priority.';
  if (!values.description.trim()) errors.description = 'Describe what needs attention.';
  else if (values.description.trim().length < 20) errors.description = 'Use at least 20 characters.';
  return errors;
}

export function formatDate(value) {
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(value));
}

export function sortNewest(requests) {
  // Copy before sorting so React state is never mutated in place.
  return [...requests].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}
