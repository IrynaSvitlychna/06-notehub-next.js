import css from './NoteForm.module.css';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Formik,
  Field,
  Form,
  ErrorMessage,
} from "formik";
import * as Yup from "yup";
import toast from 'react-hot-toast';
import { createNote } from "../../lib/api";

interface NoteFormProps {
  onClose: () => void; 
}

// Схема валідації за допомогою Yup
const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be at most 50 characters")
    .required("Title is required"),
  content: Yup.string().max(500, "Content must be at most 500 characters"),
  tag: Yup.string()
    .oneOf(
      ["Todo", "Work", "Personal", "Meeting", "Shopping"],
      "Invalid tag selected"
    )
    .required("Tag is required"),
});

export default function NoteForm({ onClose } : NoteFormProps){
   
  const queryClient = useQueryClient(); // Ініціалізуємо queryClient

 
  const {mutate, isPending} = useMutation({
    mutationFn: createNote, // Функція з noteService, яка виконує POST-запит
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] }); // Інвалідуємо кеш запитів "notes"
      onClose(); // Закриваємо модалку після успішного створення
    },
    onError: (error) => {
      console.error("Error creating note:", error); // Повідомлення про помилку
      // <ErrorMessage name="" component="span" className={css.error} />
      toast.error("Failed to create note. Please try again.")
    },
  });

  interface FieldsValues {
    title: string,
    content: string,
    tag: string,
  }

  const initialValues: FieldsValues = {
    title: "",
    content: "",
    tag: "Todo"
  }

  return (
    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={(values: FieldsValues) => {
      mutate(values);
    }}
    >
      {() => (
        <Form className={css.form}>
  <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
           <ErrorMessage name="title" component="span" className={css.error} />
  </div>

  <div className={css.formGroup}>
    <label htmlFor="content">Content</label>
    <Field
      as="textarea"
      id="content"
      name="content"
      rows={8}
      className={css.textarea}
    />
    <ErrorMessage
              name="content"
              component="span"
              className={css.error}
            />
  </div>

  <div className={css.formGroup}>
    <label htmlFor="tag">Tag</label>
    <Field as="select" id="tag" name="tag" className={css.select}>
      <option value="Todo">Todo</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Meeting">Meeting</option>
      <option value="Shopping">Shopping</option>
    </Field>
    <ErrorMessage
              name="tag"
              component="span"
              className={css.error}
            />
  </div>

  <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
      Cancel
    </button>
    <button
      type="submit"
      className={css.submitButton}
      disabled={isPending}
    >
      Create note
    </button>
        </div>
      </Form>
      )}
</Formik>

    );
}