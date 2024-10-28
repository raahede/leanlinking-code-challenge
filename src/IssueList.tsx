import { memo } from 'react';
import { TIssueListItemParsed } from './types';

// Memoize component to avoid rerender when sorting list
const IssueListItem = memo(function Post({ issue }: { issue: TIssueListItemParsed }) {
  return (
    <tr>
      <td>{issue.title}</td>
    </tr>
  );
});

export const IssueList = ({ issues }: { issues: TIssueListItemParsed[] }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
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
