import { createPortal } from 'react-dom';
import style from './Modal.module.css';
import { useScrollLock } from 'usehooks-ts';
import { useEffect } from 'react';

const ModalBody = ({
  children,
  showModal,
  onClose
}: {
  children: React.ReactNode | React.ReactNode[];
  showModal: boolean;
  onClose: () => void;
}) => {
  return (
    <div className={`${style.modal} ${showModal ? style.active : ''}`}>
      <div className={style.overlay}> </div>
      <div className={style['modal-body']}>
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </div>
  );
};

export const Modal = ({
  children,
  showModal,
  onClose
}: {
  children: React.ReactNode | React.ReactNode[];
  showModal: boolean;
  onClose: () => void;
}) => {
  const { lock, unlock } = useScrollLock({
    autoLock: false,
    lockTarget: '#root'
  });

  useEffect(() => {
    if (showModal) lock();
    else unlock();

    return unlock();
  }, [showModal, lock, unlock]);

  return (
    <>
      {showModal &&
        createPortal(
          <ModalBody showModal={showModal} onClose={onClose}>
            {children}
          </ModalBody>,
          document.body
        )}
    </>
  );
};
