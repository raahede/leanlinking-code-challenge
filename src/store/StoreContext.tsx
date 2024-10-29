import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { State, Action } from './store-types';
import { reducer, initialState } from './reducer';

type StoreContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
