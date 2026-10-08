import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { RequestsProvider } from '../context/RequestsContext';
import NewRequestPage from './NewRequestPage';
import RequestDetailPage from './RequestDetailPage';

beforeEach(() => localStorage.clear());

test('shows validation errors and creates a request when fields are valid', async () => {
  const user = userEvent.setup();
  render(<MemoryRouter initialEntries={['/requests/new']}><RequestsProvider><Routes><Route path="/requests/new" element={<NewRequestPage />} /><Route path="/requests/:id" element={<RequestDetailPage />} /></Routes></RequestsProvider></MemoryRouter>);

  await user.click(screen.getByRole('button', { name: 'Create request' }));
  expect(screen.getByText('Give this request a short title.')).toBeInTheDocument();
  expect(screen.getByText('Describe what needs attention.')).toBeInTheDocument();

  await user.type(screen.getByRole('textbox', { name: /Request title/ }), 'Broken water fountain');
  await user.type(screen.getByRole('textbox', { name: /Requested by/ }), 'Alex Lee');
  await user.selectOptions(screen.getByRole('combobox', { name: /Category/ }), 'Facilities');
  await user.selectOptions(screen.getByRole('combobox', { name: /Location/ }), 'north-wing');
  await user.selectOptions(screen.getByRole('combobox', { name: /Priority/ }), 'Medium');
  await user.type(screen.getByRole('textbox', { name: /Description/ }), 'The water fountain by the stairs has stopped working.');
  await user.click(screen.getByRole('button', { name: 'Create request' }));

  expect(screen.getByRole('heading', { name: 'Broken water fountain' })).toBeInTheDocument();
  expect(screen.getByText('Alex Lee')).toBeInTheDocument();
  expect(screen.getByRole('combobox', { name: 'Status' })).toHaveValue('Open');
});
