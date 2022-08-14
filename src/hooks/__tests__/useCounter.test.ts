import { act, renderHook } from '@testing-library/react';
import { useCounter } from '../useCounter';

describe('useCounter.state', () => {
  it('should increment counter', () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(1);
  });
});
