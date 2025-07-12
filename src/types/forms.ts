
export interface FormValues {
  quantity: number;
  dueDate: Date | undefined;
}

export interface BookFormValues {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
}