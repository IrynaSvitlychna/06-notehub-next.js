import css from "./NoteList.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query"; 
import toast from "react-hot-toast"; 
import { type Note } from "../../types/note";
import { deleteNote } from "../../lib/api";
import { useState } from "react";
import Link from "next/link";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {

  const [deletingNoteId, setDeletingNoteId] = useState<number | null>(null);

  const queryClient = useQueryClient(); 


  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] }); 
      toast.success("Note deleted successfully!");
    },
    onError: (error) => {
      toast.error(`Error deleting note: ${error.message}`);
    },
  });

  
  const handleDeleteNote = (id: number) => {
    setDeletingNoteId(id); // Запам’ятовуємо, яку саме видаляємо
    deleteNoteMutation.mutate(id, {
      onSettled: () => {
        setDeletingNoteId(null); // Очистити стан після завершення
      },
    }); 
  };

  if (notes.length === 0) {
    return <p className={css.noNotesMessage}>No notes found.</p>;
  }

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id}  className={css.listItem}>
        <h2 className={css.title}>{note.title}</h2>
        <p className={css.content}>{note.content}</p>
        <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link href={`/notes/${note.id}`}>{note.title}
              View details
            </Link>
          
            <button
              className={css.button}
              onClick={() => handleDeleteNote(note.id)}
              disabled={deleteNoteMutation.isPending}
            >
              {deletingNoteId === note.id ? 'Deleting...' : 'Delete'}
            </button>
        </div>
      </li>
      ))}
    </ul>
  );
}