import { createContext, useContext, useEffect, useState } from 'react';
import { seedRequests } from '../data/seedRequests';
import { STATUSES } from '../utils/requests';

const STORAGE_KEY = 'sitedesk.requests.v1';
const RequestsContext = createContext(null);

function loadRequests() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : seedRequests;
  } catch {
    return seedRequests;
  }
}

export function RequestsProvider({ children }) {
  // One shared state is enough for this small app. Every route reads the same requests.
  const [requests, setRequests] = useState(loadRequests);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
  }, [requests]);

  function addRequest(values) {
    const now = new Date().toISOString();
    const request = {
      ...values,
      title: values.title.trim(),
      requester: values.requester.trim(),
      description: values.description.trim(),
      id: `SD-${Date.now().toString().slice(-6)}`,
      status: 'Open',
      createdAt: now,
      updatedAt: now,
    };
    setRequests((current) => [request, ...current]);
    return request.id;
  }

  function updateStatus(id, status) {
    if (!STATUSES.includes(status)) return;
    setRequests((current) => current.map((request) => (
      request.id === id ? { ...request, status, updatedAt: new Date().toISOString() } : request
    )));
  }

  return (
    <RequestsContext.Provider value={{ requests, addRequest, updateStatus }}>
      {children}
    </RequestsContext.Provider>
  );
}

export function useRequests() {
  const context = useContext(RequestsContext);
  if (!context) throw new Error('useRequests must be used inside RequestsProvider');
  return context;
}
