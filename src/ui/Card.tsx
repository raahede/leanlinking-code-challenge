import { ReactNode } from 'react';
import styles from './Card.module.css';

export const Card = ({
  children,
  style
}: {
  children: ReactNode | ReactNode[];
  style?: React.HTMLAttributes<HTMLElement>['style'];
}) => {
  return (
    <div style={style} className={styles.card}>
      {children}
    </div>
  );
};
