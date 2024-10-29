import { TIssueListItemParsed } from '../types';

export const IssueDetails = ({ issue }: { issue: TIssueListItemParsed }) => {
  return (
    <>
      <h1>{issue.title}</h1>
      <p>{issue.status}</p>
      <p>
        Agent:{' '}
        <a href={`mailto:${issue.assignedAgent.email}`}>
          {issue.assignedAgent.firstName} {issue.assignedAgent.lastName}
        </a>
      </p>
      <p>
        Supplier: {issue.supplier.name} ({issue.supplier.number})
      </p>
    </>
  );
};
