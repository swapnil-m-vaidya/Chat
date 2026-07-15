import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the empty-state hero and side panel', () => {
  render(<App />);
  expect(screen.getByText(/meet someone new/i)).toBeInTheDocument();
  expect(screen.getByText(/new random chat/i)).toBeInTheDocument();
  expect(screen.getByText(/feedback board/i)).toBeInTheDocument();
});
