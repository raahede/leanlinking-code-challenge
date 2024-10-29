import { createPortal } from 'react-dom';
import style from './Modal.module.css';
import { useScrollLock } from 'usehooks-ts';
import { useEffect, useState } from 'react';
import { X } from 'react-feather';

const ModalBody = ({
  children,
  showModal,
  onClose
}: {
  children: React.ReactNode | React.ReactNode[];
  showModal: boolean;
  onClose: () => void;
}) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(showModal);
  }, [showModal]);

  const handleClose = () => {
    setActive(false);
    // wait for css animations to finish before unmounting
    setTimeout(() => {
      onClose();
    }, 250);
  };

  return (
    <div className={`${style.modal} ${active ? style.active : ''}`}>
      <div className={style.overlay} onClick={handleClose}>
        {' '}
      </div>
      <div className={style['modal-body']}>
        <button className={style['modal-close']} onClick={handleClose}>
          <X />
        </button>
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
