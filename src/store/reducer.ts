import { Action, State } from './store-types';

export const initialState: State = {
  issues: []
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'UPDATE_ISSUES':
      return { ...state, issues: action.payload };
    case 'UPDATE_ISSUE':
      return {
        ...state,
        issues: state.issues.map((issue) =>
          issue.id === action.payload.id
            ? { ...issue, ...action.payload } // Update only provided fields
            : issue
        )
      };
    default:
      return state;
  }
};
