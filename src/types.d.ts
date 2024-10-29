import data from './data/data.json';

export type TIssueList = typeof data;
export type TIssueListItem = (typeof data)[0];
export type TIssueStatus = 'Active' | 'Pending' | 'Resolved';
export type TIssueDetailStatus = 'Deviation' | 'Note' | 'Correction' | 'Update';
export type TIssueDetail = {
  id: number;
  comment: string;
  type: TIssueDetailStatus;
};

export type TIssueListItemParsed = {
  id: number;
  title: string;
  status: 'Active' | 'Pending' | 'Resolved';
  createdDate: number;
  closedDate: number | null;
  details: TIssueDetail[];
  assignedAgent: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    profilePictureUrl: string;
  };
  supplier: {
    id: number;
    name: string;
    number: string;
    logoUrl: string;
  };
};
