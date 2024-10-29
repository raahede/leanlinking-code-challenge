import style from './App.module.css';
import { Card } from './ui/Card';
import data from '../public/data/data.json';
import { useState } from 'react';
import { IssueList } from './IssueList';
import { TIssueList, TIssueListItemParsed } from './types';
import { ArrowDown, ArrowUp } from 'react-feather';

const parseData = (data: TIssueList): TIssueListItemParsed[] => {
  return data.map((issue) => {
    return {
      ...issue,
      createdDate: Date.parse(issue.createdDate),
      closedDate: issue.closedDate ? Date.parse(issue.closedDate) : null
    } as TIssueListItemParsed;
  });
};

export const App = () => {
  const [sort, setSort] = useState(false);
  const [issues] = useState(parseData(data));

  const sortedIssues = sort
    ? issues.sort((a, b) => b.createdDate - a.createdDate)
    : issues.sort((a, b) => a.createdDate - b.createdDate);

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
