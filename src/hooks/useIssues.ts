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
  const [issues] = useState(parseData(data));

  const sortedIssues = sort
    ? issues.sort((a, b) => b.createdDate - a.createdDate)
    : issues.sort((a, b) => a.createdDate - b.createdDate);

  return {
    sortedIssues,
    sort,
    setSort
  };
};
