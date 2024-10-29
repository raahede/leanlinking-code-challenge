import { useMemo, useState } from 'react';
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

export const formatResolutionTime = (diff: number) => {
  // Calculate days, hours, minutes
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days === 0 && hours === 0) return `${minutes} minutes`;
  if (days === 0) return `${hours} hours`;
  return `${days} days`;
};

export const useIssues = (data: TIssueList) => {
  const [sort, setSort] = useState(false);
  const [issues, setIssues] = useState(parseData(data));

  const sortedIssues = sort
    ? issues.sort((a, b) => b.createdDate - a.createdDate)
    : issues.sort((a, b) => a.createdDate - b.createdDate);

  const closedIssues = useMemo(() => {
    return issues.filter((item) => item.status === 'Resolved');
  }, [issues]);

  const openIssuesCount = useMemo(() => {
    return issues.length - closedIssues.length;
  }, [issues, closedIssues]);

  const averageResolutionTimeFormatted = useMemo(() => {
    // Calculate the difference in milliseconds
    const total = closedIssues.reduce(
      (sum, issue) => (issue.closedDate ? sum + Math.abs(issue.closedDate - issue.createdDate) : sum),
      0
    );
    const diff = total / closedIssues.length;

    return formatResolutionTime(diff);
  }, [closedIssues]);

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
    setIssueResolved,
    openIssuesCount,
    averageResolutionTimeFormatted,
    closedIssues
  };
};
