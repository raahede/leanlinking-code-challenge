import { useState } from 'react';
import { TIssueList, TIssueListItemParsed } from '../types';

const parseData = (data: TIssueList): TIssueListItemParsed[] => {
  return data.map((issue) => {
    return {
      ...issue,
      createdDate: Date.parse(issue.createdDate),
      closedDate: issue.closedDate ? Date.parse(issue.closedDate) : null
    } as TIssueListItemParsed;
  });
};

export const useIssues = (data: TIssueList) => {
  const [sort, setSort] = useState(false);
  const [issues, setIssues] = useState(parseData(data));

  const sortedIssues = sort
    ? issues.sort((a, b) => b.createdDate - a.createdDate)
    : issues.sort((a, b) => a.createdDate - b.createdDate);

  const updateIssue = (id: TIssueListItemParsed['id'], params: Partial<TIssueListItemParsed>) => {
    return setIssues((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, ...params } : item)));
  };

  const setIssueResolved = (id: number) => {
    updateIssue(id, {
      status: 'Resolved',
      closedDate: Date.now()
    });
  };

  return {
    sortedIssues,
    sort,
    setSort,
    setIssueResolved
  };
};
