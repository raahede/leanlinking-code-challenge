import { TIssueListItemParsed } from '../types';

export type State = {
  issues: TIssueListItemParsed[];
};

export type Action =
  | { type: 'UPDATE_ISSUES'; payload: TIssueListItemParsed[] }
  | { type: 'UPDATE_ISSUE'; payload: Pick<TIssueListItemParsed, 'id'> & Partial<TIssueListItemParsed> };
