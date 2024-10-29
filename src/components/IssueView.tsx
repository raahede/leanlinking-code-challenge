import { issueRoute } from '../main';
import { useStore } from '../store/StoreContext';

export const IssueView = () => {
  const { issueId } = issueRoute.useParams();
  const { state } = useStore();
  return (
    <div>
      IssueView {issueId} {state.issues.find((issue) => issue.id === parseInt(issueId))?.status}
    </div>
  );
};

export default IssueView;
