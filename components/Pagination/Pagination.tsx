import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (selected : number) => void;
}

export default function Pagination({ totalPages, currentPage, onPageChange,}: PaginationProps) {

  return (
    <ReactPaginate
      pageCount={totalPages} // Загальна кількість сторінок
      pageRangeDisplayed={5} // Кількість видимих номерів сторінок
      marginPagesDisplayed={1} // Кількість номерів сторінок по краях
      onPageChange={({ selected }) => onPageChange(selected+1)} // Обробник зміни сторінки
      forcePage={currentPage - 1} // Примусово встановлює активну сторінку (ReactPaginate використовує 0-індексацію)
      containerClassName={css.pagination} // Клас для контейнера пагінації
      activeClassName={css.active} // Клас для активної сторінки
      nextLabel="→" // Текст для кнопки "Наступна"
      previousLabel="←" // Текст для кнопки "Попередня"
    />
  );
}