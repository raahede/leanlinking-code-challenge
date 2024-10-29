import style from './App.module.css';
import { Card } from './components/ui/Card';
import data from '../public/data/data.json';
import { IssueList } from './components/IssueList';
import { ArrowDown, ArrowUp } from 'react-feather';
import { useIssues } from './hooks/useIssues';
import { Stat } from './components/ui/Stat';

export const App = () => {
  const {
    sort,
    setSort,
    sortedIssues,
    setIssueResolved,
    openIssuesCount,
    closedIssues,
    averageResolutionTimeFormatted
  } = useIssues(data);

  return (
    <div className={style.app}>
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
