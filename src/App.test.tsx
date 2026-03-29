import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    URL.createObjectURL = vi.fn(() => 'blob:preview');
    URL.revokeObjectURL = vi.fn();
  });

  it('renders the editor and template options', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: /create a 4:5 post/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('combobox', { name: /choose a layout/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: /hero overlay/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: /glass card/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: /split promo/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: /bottom band/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: /top frame/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: /centered focus/i }),
    ).toBeInTheDocument();
  });

  it('updates the preview when the layout dropdown changes', () => {
    render(<App />);

    fireEvent.change(screen.getByRole('combobox', { name: /choose a layout/i }), {
      target: { value: 'centered-focus' },
    });

    expect(
      screen.getByRole('heading', { name: /centered focus/i }),
    ).toBeInTheDocument();
  });

  it('enables export when the required inputs are present', () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/background/i), {
      target: {
        files: [new File(['image'], 'background.png', { type: 'image/png' })],
      },
    });
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'Europe Travel eSIM' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: /price/i }), {
      target: { value: '$9.99' },
    });

    expect(
      screen.getByRole('button', { name: /download png/i }),
    ).toBeEnabled();
    expect(
      screen.getByRole('button', { name: /download jpg/i }),
    ).toBeEnabled();
  });
});
