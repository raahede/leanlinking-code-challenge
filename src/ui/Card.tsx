import { ReactNode } from 'react';
import style from './Card.module.css';

export const Card = ({ children }: { children: ReactNode | ReactNode[] }) => {
  return <div className={style.card}>{children}</div>;
};
