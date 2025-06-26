import axios from "axios";
import { Note } from "../types/note";


  export interface PaginatedNotesResponse {
    notes: Note[];
    totalPages: number;
  }  
 

const request = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export const fetchNotes = async (
  search: string,
  page: number
): Promise<PaginatedNotesResponse> => {
 
  const params: {
    search?: string;
    page: number;
    perPage: number; 
  } = {
    ...(search !== "" && { search: search }),
    page,
    perPage: 12, 
  }
 
    const response = await request.get("/notes", {
      params
    });

  return {
    notes: response.data.notes,
    totalPages: response.data.totalPages,
  };
   
};

export const createNote = async (note: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> => {

  const response = await request.post<Note>("/notes", note);
  
  return response.data;
  
};

export const deleteNote = async (id: number): Promise<Note> => {
 
    const response = await request.delete<Note>(`/notes/${id}`);

    return response.data;
  
};