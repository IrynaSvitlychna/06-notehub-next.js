'use client';
import css from '../page.module.css';
import SearchBox from '../../components/SearchBox/SearchBox';
import NoteList from '../../components/NoteList/NoteList';
import Pagination from '../../components/Pagination/Pagination';
import NoteModal from '../../components/NoteModal/NoteModal';
// import Loader from '../../components/';
// import ErrorMessage from "../ErrorMessage/ErrorMessage.tsx";
import { type PaginatedNotesResponse } from "@/lib/api";
import { fetchNotes } from "@/lib/api";
import { useDebounce } from "use-debounce";
import { useState } from "react";
  import {
    useQuery,
    keepPreviousData,
  } from "@tanstack/react-query";

const Notes = () => {
    const [currentQuery, setCurrentQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [debouncedSearchQuery] = useDebounce(currentQuery, 500);
    const [isModalOpen, setIsModalOpen] = useState(false); 
   
  
    const { data, isLoading, isError } = useQuery<
      PaginatedNotesResponse>({
        queryKey: ["notes", currentPage, debouncedSearchQuery],
        queryFn: () => fetchNotes(debouncedSearchQuery, currentPage),
        placeholderData: keepPreviousData,
      });
  
  
    const handleSearch = (value: string) => {
      setCurrentQuery(value);
      setCurrentPage(1); 
    };
  
    return (
  
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox value={currentQuery} onSearch={handleSearch} />
          
          {data && data.totalPages > 1 && (
            <Pagination
            totalPages={data.totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}
  
          <button
            className={css.button}
            onClick={() => setIsModalOpen(true)}>
            Create note +
          </button>
        </header>
        
        {isModalOpen && <NoteModal onClose={() => setIsModalOpen(false)} />}
        
        {/* {isLoading && <Loader />} */}
        {/* {isError && <ErrorMessage />} */}
        
        {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
        
      </div>
    );
  }
  
  export default Notes;