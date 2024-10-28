import { TIssueList } from './types';

export const IssueList = ({ issues }: { issues: TIssueList }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        {issues.map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.title}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
