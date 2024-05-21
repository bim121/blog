import { useState, useEffect, ReactNode, MouseEvent } from "react";
import ReactDOM from "react-dom";
import styles from "../src/styles/Modal.module.css";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export default function Modal({ show, onClose, children, title }: ModalProps) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleClose = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClose();
  };

  const modalContent: JSX.Element = show ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <a href="#" onClick={handleClose}>
            <button className="btn">Close</button>
          </a>
        </div>
        {title && <div>{title}</div>}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  ) : <></>;

  if (isBrowser) {
    const modalRoot = document.getElementById("modal-root");
    if (modalRoot) {
      return ReactDOM.createPortal(
        modalContent,
        modalRoot
      );
    } else {
      console.error("The element with id 'modal-root' was not found in the DOM.");
      return null;
    }
  } else {
    return null;
  }
}
