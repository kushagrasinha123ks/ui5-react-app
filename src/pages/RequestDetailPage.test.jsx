import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { RequestsProvider } from '../context/RequestsContext';
import RequestDetailPage from './RequestDetailPage';

beforeEach(() => localStorage.clear());

test('updates request status and persists it in browser storage', async () => {
  const user = userEvent.setup();
  render(<MemoryRouter initialEntries={['/requests/SD-1042']}><RequestsProvider><Routes><Route path="/requests/:id" element={<RequestDetailPage />} /></Routes></RequestsProvider></MemoryRouter>);

  await user.selectOptions(screen.getByRole('combobox', { name: 'Status' }), 'In progress');
  expect(screen.getByRole('combobox', { name: 'Status' })).toHaveValue('In progress');
  await waitFor(() => expect(JSON.parse(localStorage.getItem('sitedesk.requests.v1')).find((request) => request.id === 'SD-1042').status).toBe('In progress'));
});
