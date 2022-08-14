import { renderHook, act } from '@testing-library/react';
import { useCounter } from '../counter.store';

test('useCount.store', () => {
  const { result } = renderHook(() => useCounter());

  act(() => result.current.inc());
  expect(result.current.count).toBe(1);

  act(() => result.current.dec());
  expect(result.current.count).toBe(0);
});
