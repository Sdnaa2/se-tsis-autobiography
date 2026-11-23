import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '../App';

describe('App editorial UI & trust boundaries (TC-02, TC-05, TC-13)', () => {
  it('renders Bekzat’s profile, quote, and all timeline chapters (TC-02)', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: 'Kalenuly Bekzat' }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/Kyzylorda/i).length).toBeGreaterThan(0);
    expect(
      screen.getByText(/First Spark at the Keyboard/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: /Nazarbayev Intellectual School \(NIS\)/i,
      }),
    ).toBeInTheDocument();
  });

  it('toggles Light and Dark theme and persists to localStorage (TC-05)', () => {
    render(<App />);
    const toggleBtn = screen.getByRole('button', { name: /switch to dark theme/i });
    fireEvent.click(toggleBtn);

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(window.localStorage.getItem('bekzat-bio-theme')).toBe('dark');
  });

  it('filters timeline categories interactively', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Technical' }));
    expect(
      screen.getByText(/Software Engineering & Linux Systems Practice/i),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/First Spark at the Keyboard/i),
    ).not.toBeInTheDocument();
  });

  it('renders distinct Advisory vs Deterministic Fallback badges in Q&A (TC-13)', () => {
    render(<App />);
    const input = screen.getByLabelText(/ask a question about bekzat/i);
    const submit = screen.getByRole('button', { name: /^ask$/i });

    fireEvent.change(input, { target: { value: 'Tell me about NIS Kyzylorda' } });
    fireEvent.click(submit);
    expect(screen.getByTestId('qa-provenance-badge')).toHaveTextContent(
      /Advisory — Mock Grounded/i,
    );

    fireEvent.change(screen.getByLabelText(/defense simulation mode/i), {
      target: { value: 'hallucinate' },
    });
    fireEvent.click(submit);
    expect(screen.getByTestId('qa-provenance-badge')).toHaveTextContent(
      /Safe Deterministic Fallback/i,
    );
  });
});
