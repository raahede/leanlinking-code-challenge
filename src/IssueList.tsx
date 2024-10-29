import { memo } from 'react';
import { TIssueListItemParsed, TIssueStatus } from './types';
import style from './IssueList.module.css';
import { Check, Pause, Play } from 'react-feather';

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
const IssueListItem = memo(function Post({ issue }: { issue: TIssueListItemParsed }) {
  const getResolutionTime = () => {
    if (!issue.closedDate) return '-';

    // Calculate the difference in milliseconds
    const diff = Math.abs(issue.closedDate - issue.createdDate);

    // Calculate days, hours, minutes
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days === 0 && hours === 0) return `${minutes} minutes`;
    if (days === 0) return `${hours} hours`;
    return `${days} days`;
  };

  return (
    <tr>
      <td>{issue.title}</td>
      <td>{issue.closedDate ? 'Closed' : 'Open'}</td>
      <td>{`${issue.assignedAgent.firstName} ${issue.assignedAgent.lastName}`}</td>
      <td>
        <StatusIcon status={issue.status} />
      </td>
      <td title={issue.supplier.name}>
        <img width="44" src={issue.supplier.logoUrl} alt={issue.supplier.name} />
      </td>
      <td>{new Date(issue.createdDate).toDateString()}</td>
      <td>{getResolutionTime()}</td>
    </tr>
  );
});

export const IssueList = ({ issues }: { issues: TIssueListItemParsed[] }) => {
  return (
    <table className={style['issue-list']}>
      <thead>
        <tr>
          <th>Title</th>
          <th>State</th>
          <th>Agent</th>
          <th>Status</th>
          <th>Supplier</th>
          <th>Created</th>
          <th>Resolution time</th>
        </tr>
      </thead>
      <tbody>
        {issues.map((item) => {
          return <IssueListItem key={item.id} issue={item} />;
        })}
      </tbody>
    </table>
  );
};
