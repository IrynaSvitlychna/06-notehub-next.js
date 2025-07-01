
import NotesClient from "./Notes.client";
import { fetchNotes } from '@/lib/api';


const NotesPage = async () => {
  const notes = await fetchNotes("", 1);
  return (
    <div>
      <h1>Notes</h1>
      <br />
      <NotesClient initialData={notes} />
    </div>
  )
}

export default NotesPage