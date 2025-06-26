export interface Note {
    id: number;
    title: string; // Заголовок нотатки
    content: string; // Текст нотатки
    createdAd: string; // Дата створення
    updatedAd: string; // Дата останнього оновлення 
    tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
  }