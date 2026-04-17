import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login screen heading', () => {
  render(<App />);
  const heading = screen.getByText(/proposal writer login/i);
  expect(heading).toBeInTheDocument();
});
