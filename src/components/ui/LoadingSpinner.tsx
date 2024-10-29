import { Loader } from 'react-feather';
import styles from './LoadingSpinner.module.css';

export const LoadingSpinner = () => {
  return (
    <div className={styles['loading-spinner']}>
      <Loader size={30} />
    </div>
  );
};
