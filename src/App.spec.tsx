import { fireEvent, render, screen } from '@testing-library/react';

import App from './App';

describe('<App />', () => {
  it('renders without errors', () => {
    render(<App />);

    expect(screen.getByRole('heading')).toBeInstanceOf(HTMLHeadingElement);

    const btnCount = screen.getByTestId('btnCount');
    expect(btnCount).toBeInstanceOf(HTMLButtonElement);
    fireEvent.click(btnCount);
    expect(btnCount.textContent).toBe('count is 1');
  });
});
