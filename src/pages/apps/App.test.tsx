import { fireEvent, render, screen } from '@testing-library/react';

import { AppPage } from './App.page';

describe.concurrent('<AppPage />', () => {
  it('renders without errors', () => {
    render(<AppPage />);

    expect(screen.getByRole('heading')).toBeTruthy();
  });

  it('should change count on click', () => {
    render(<AppPage />);

    const btnIncrement = screen.getByTestId('increment');
    expect(btnIncrement).toBeInstanceOf(HTMLButtonElement);

    const btnReduce = screen.getByTestId('reduce');
    expect(btnReduce).toBeInstanceOf(HTMLButtonElement);

    fireEvent.click(btnIncrement);
    expect(screen.getByTestId('title').textContent).toBe('count is 1');
    fireEvent.click(btnReduce);
    expect(screen.getByTestId('title').textContent).toBe('count is 0');
  });
});
