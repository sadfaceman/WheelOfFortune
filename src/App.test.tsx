import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Wheel of Fortune app', () => {
  it('renders initial state and opens puzzle modal', async () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /Wheel of Fortune/i })).toBeInTheDocument();
    expect(screen.getByText(/No letters chosen yet/i)).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /Enter new phrase/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('submits a new puzzle phrase and updates the display', async () => {
    render(<App />);

    await userEvent.click(screen.getByRole('button', { name: /Enter new phrase/i }));
    await userEvent.type(screen.getByRole('textbox', { name: /Phrase/i }), 'HI');
    await userEvent.click(screen.getByRole('button', { name: /Save phrase/i }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getAllByText('_').length).toBe(2);

    await userEvent.click(screen.getByRole('button', { name: 'H' }));
    await userEvent.click(screen.getByRole('button', { name: 'I' }));

    expect(screen.getByText(/Congratulations! You solved the puzzle!/i)).toBeInTheDocument();
  });
});
