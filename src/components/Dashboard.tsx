import style from './Dashboard.module.css';
import { Card } from './ui/Card';
import { IssueList } from './IssueList';
import { ArrowDown, ArrowUp } from 'react-feather';
import { parseData, useIssues } from '../hooks/useIssues';
import { Stat } from './ui/Stat';
import { dashboardRoute } from '../main';
import { Outlet } from '@tanstack/react-router';
import { useStore } from '../store/StoreContext';
import { useEffect } from 'react';

export const Dashboard = () => {
  const { dispatch } = useStore();
  const issuesData = dashboardRoute.useLoaderData();

  useEffect(() => {
    dispatch({ type: 'UPDATE_ISSUES', payload: parseData(issuesData) });
  }, [dispatch, issuesData]);

  const {
    sort,
    setSort,
    sortedIssues,
    setIssueResolved,
    openIssuesCount,
    closedIssues,
    averageResolutionTimeFormatted
  } = useIssues(issuesData);

  return (
    <div className={style.dashboard}>
      <Outlet />
      <Card>
        <h2>Stats</h2>
        <div className={style.stats}>
          <Card>
            <Stat header="Open issues" text={openIssuesCount.toString()} />
          </Card>
          <Card>
            <Stat header="Closed issues" text={closedIssues.length.toString()} />
          </Card>
          <Card>
            <Stat header="Average resolution time" text={averageResolutionTimeFormatted} />
          </Card>
        </div>
      </Card>
      <Card>
        <button onClick={() => setSort((sort) => (sort = !sort))}>
          {sort ? <ArrowDown size={14} /> : <ArrowUp size={14} />} Sort {sort ? 'newest' : 'oldest'}
        </button>
        <IssueList issues={sortedIssues} resolveIssue={setIssueResolved} />
      </Card>
    </div>
  );
};
