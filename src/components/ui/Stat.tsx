import styles from './Stat.module.css';

export const Stat = ({ header, text }: { header: string; text: string }) => {
  return (
    <div className={styles.stat}>
      <h2 className={styles.header}>{header}</h2>
      <p className={styles.text}>{text}</p>
    </div>
  );
};
