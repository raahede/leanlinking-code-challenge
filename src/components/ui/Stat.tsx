import { memo } from 'react';
import styles from './Stat.module.css';

// Memoize component to avoid unnecessary rerender
export const Stat = memo(({ header, text }: { header: string; text: string }) => {
  return (
    <div className={styles.stat}>
      <h2 className={styles.header}>{header}</h2>
      <p className={styles.text}>{text}</p>
    </div>
  );
});
