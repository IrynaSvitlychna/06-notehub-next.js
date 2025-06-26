import css from '../SearchBox/SearchBox.module.css';

interface SearchBoxProps {
  value: string;
  onSearch: (search: string) => void;
  
}

export default function SearchBox({ value, onSearch }: SearchBoxProps) {
   
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={value}
      onChange={(e) => onSearch(e.target.value.trim())}
    />

  );
   
}