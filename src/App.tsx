import style from './App.module.css';
import { Card } from './ui/Card';
import data from '../public/data/data.json';
import { useState } from 'react';
import { IssueList } from './IssueList';

function App() {
  const [issues] = useState(data);
  return (
    <div className={style.app}>
      <Card>Hello test</Card>
      <Card>
        <IssueList issues={issues} />
      </Card>
    </div>
  );
}

export default App;
