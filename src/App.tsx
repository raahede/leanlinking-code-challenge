import style from './App.module.css';
import { Card } from './components/ui/Card';
import data from '../public/data/data.json';
import { IssueList } from './components/IssueList';
import { ArrowDown, ArrowUp } from 'react-feather';
import { useIssues } from './hooks/useIssues';

export const App = () => {
  const { sort, setSort, sortedIssues } = useIssues(data);

  return (
    <div className={style.app}>
      <Card>Hello test</Card>
      <Card>
        <button onClick={() => setSort((sort) => (sort = !sort))}>
          {sort ? <ArrowDown size={14} /> : <ArrowUp size={14} />} Sort {sort ? 'newest' : 'oldest'}
        </button>
        <IssueList issues={sortedIssues} />
      </Card>
    </div>
  );
};
