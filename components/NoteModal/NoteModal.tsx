import { useEffect, type MouseEvent } from "react";
import {createPortal} from "react-dom";
import css from "./NoteModal.module.css";
import NoteForm from "../NoteForm/NoteForm";

interface NoteModalProps {
  onClose: () => void;
}

export default function NoteModal({ onClose }: NoteModalProps) {
   
    useEffect(() => {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }, []);
  
   
    useEffect(() => {
      const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onClose();
        }
      };
  
      window.addEventListener("keydown", handleEscapeKey);
  
      return () => {
        window.removeEventListener("keydown", handleEscapeKey);
      };
    }, [onClose]);
  

    const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    };
  
    return createPortal(
      <div
        className={css.backdrop}
        role="dialog"
        aria-modal="true"
        onClick={handleBackdropClick}
      >
        <div className={css.modal}>
          <NoteForm onClose={onClose} />
        </div>
      </div>,
      document.body
    );
  }