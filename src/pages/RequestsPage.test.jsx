import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { RequestsProvider } from '../context/RequestsContext';
import RequestsPage from './RequestsPage';

beforeEach(() => localStorage.clear());

test('searches and filters the request cards', async () => {
  const user = userEvent.setup();
  render(<MemoryRouter><RequestsProvider><RequestsPage /></RequestsProvider></MemoryRouter>);

  expect(screen.getByText('Projector not connecting in room N-204')).toBeInTheDocument();
  await user.type(screen.getByRole('searchbox', { name: 'Search requests' }), 'projector');
  expect(screen.getByText('Projector not connecting in room N-204')).toBeInTheDocument();
  expect(screen.queryByText('Air conditioning too warm in training room')).not.toBeInTheDocument();

  await user.selectOptions(screen.getByRole('combobox', { name: 'Filter by status' }), 'Resolved');
  expect(screen.getByText('No requests found')).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Clear filters' }));
  expect(screen.getByText('Air conditioning too warm in training room')).toBeInTheDocument();
});
