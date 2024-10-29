import { memo } from 'react';
import { TIssueListItemParsed, TIssueStatus } from '../types';
import style from './IssueList.module.css';
import { Check, Pause, Play } from 'react-feather';
import { formatResolutionTime } from '../hooks/useIssues';

const StatusIcon = ({ status }: { status: TIssueStatus }) => {
  switch (status) {
    case 'Active':
      return <Play size={14} />;

    case 'Pending':
      return <Pause size={14} />;

    case 'Resolved':
      return <Check size={14} />;

    default:
      // Don't break the app
      console.warn(`Unknown issue status "${status}"`);
      return '';
  }
};

// Memoize component to avoid rerender when sorting list
const IssueListItem = memo(function Post({
  issue,
  resolveIssue
}: {
  issue: TIssueListItemParsed;
  resolveIssue: (id: number) => void;
}) {
  const getResolutionTime = () => {
    if (!issue.closedDate) return '-';

    // Calculate the difference in milliseconds
    const diff = Math.abs(issue.closedDate - issue.createdDate);

    return formatResolutionTime(diff);
  };

  return (
    <tr>
      <td>{issue.id}</td>
      <td>{issue.title}</td>
      <td>{`${issue.assignedAgent.firstName} ${issue.assignedAgent.lastName}`}</td>
      <td>
        <StatusIcon status={issue.status} />
        {issue.status !== 'Resolved' && (
          <button className={style['action-button']} onClick={() => resolveIssue(issue.id)}>
            resolve
          </button>
        )}
      </td>
      <td title={issue.supplier.name}>
        <img width="44" src={issue.supplier.logoUrl} alt={issue.supplier.name} />
      </td>
      <td>{new Date(issue.createdDate).toDateString()}</td>
      <td>{getResolutionTime()}</td>
    </tr>
  );
});

export const IssueList = ({
  issues,
  resolveIssue
}: {
  issues: TIssueListItemParsed[];
  resolveIssue: (id: number) => void;
}) => {
  return (
    <table className={style['issue-list']}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Agent</th>
          <th>Status</th>
          <th>Supplier</th>
          <th>Created</th>
          <th>Resolution time</th>
        </tr>
      </thead>
      <tbody>
        {issues.map((item) => {
          return <IssueListItem key={item.id} issue={item} resolveIssue={resolveIssue} />;
        })}
      </tbody>
    </table>
  );
};
