import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type State = {
  count: number;
};

type Action = {
  inc: () => void;
  dec: () => void;
};

export const useCounter = create(
  devtools<State & Action>((set) => ({
    count: 0,
    inc() {
      set((val) => ({ count: val.count + 1 }), false, 'inc');
    },
    dec() {
      set((val) => ({ count: val.count - 1 }), false, 'dec');
    },
  })),
);
