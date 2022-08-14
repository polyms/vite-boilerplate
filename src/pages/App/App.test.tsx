import { fireEvent, render, screen } from '@testing-library/react';

import { AppPage } from './App.page';

describe.concurrent('<AppPage />', () => {
  it('renders without errors', () => {
    render(<AppPage />);

    expect(screen.getByRole('heading')).toBeTruthy();
  });

  it('should increment count on click', () => {
    render(<AppPage />);

    const btnCount = screen.getByTestId('btnCount');
    expect(btnCount).toBeInstanceOf(HTMLButtonElement);
    fireEvent.click(btnCount);
    expect(btnCount.textContent).toBe('count is 1');
  });
});
