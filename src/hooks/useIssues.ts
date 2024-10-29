import { useCallback, useEffect, useMemo, useState } from 'react';
import { TIssueList, TIssueListItemParsed } from '../types';
import { useStore } from '../store/StoreContext';

export const parseData = (data: TIssueList): TIssueListItemParsed[] => {
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
  const { state, dispatch } = useStore();

  useEffect(() => {
    dispatch({ type: 'UPDATE_ISSUES', payload: parseData(data) });
  }, [dispatch, data]);

  const [sort, setSort] = useState(false);

  const sortedIssues = sort
    ? state.issues.sort((a, b) => b.createdDate - a.createdDate)
    : state.issues.sort((a, b) => a.createdDate - b.createdDate);

  const closedIssues = useMemo(() => {
    return state.issues.filter((item) => item.status === 'Resolved');
  }, [state.issues]);

  const openIssuesCount = useMemo(() => {
    return state.issues.length - closedIssues.length;
  }, [state.issues, closedIssues]);

  const averageResolutionTimeFormatted = useMemo(() => {
    // Calculate the difference in milliseconds
    const total = closedIssues.reduce(
      (sum, issue) => (issue.closedDate ? sum + Math.abs(issue.closedDate - issue.createdDate) : sum),
      0
    );
    const diff = total / closedIssues.length;

    return formatResolutionTime(diff);
  }, [closedIssues]);

  const setIssueResolved = useCallback(
    (id: number) => {
      dispatch({
        type: 'UPDATE_ISSUE',
        payload: {
          id,
          status: 'Resolved',
          closedDate: Date.now()
        }
      });
    },
    [dispatch]
  );

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
