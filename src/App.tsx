import style from './App.module.css';
import { Card } from './ui/Card';
import data from '../public/data/data.json';
import { useState } from 'react';

function App() {
  const [issues] = useState(data);
  return (
    <div className={style.app}>
      <Card>Hello test</Card>
      <Card>
        <table>
          <thead>
            <tr>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((item) => {
              return (
                <tr>
                  <td>{item.title}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

export default App;
