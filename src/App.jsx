import { Route, Routes } from 'react-router-dom';
import AppShell from './components/AppShell';
import Dashboard from './pages/Dashboard';
import RequestsPage from './pages/RequestsPage';
import NewRequestPage from './pages/NewRequestPage';
import RequestDetailPage from './pages/RequestDetailPage';
import LocationsPage from './pages/LocationsPage';

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/requests" element={<RequestsPage />} />
        <Route path="/requests/new" element={<NewRequestPage />} />
        <Route path="/requests/:id" element={<RequestDetailPage />} />
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="*" element={<div className="panel p-8"><h1 className="text-2xl font-bold">Page not found</h1><p className="mt-2 text-slate-500">Use the navigation to return to SiteDesk.</p></div>} />
      </Routes>
    </AppShell>
  );
}
