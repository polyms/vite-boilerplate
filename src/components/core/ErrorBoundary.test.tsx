// import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

const ThrowError = () => {
  throw new Error('error', { cause: new Error('nested error') });
};

describe('Error Boundary', () => {
  test('has error', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    const el = screen.getByTestId('error-boundary');
    expect(el).toBeTruthy();
  });

  test("don't has error", () => {
    render(
      <ErrorBoundary>
        <h1>success</h1>
      </ErrorBoundary>
    );
    const el = screen.getByRole('heading');
    expect(el).toBeTruthy();
  });
});
