export interface Book {
  id: string;
  title: string;
  authors: string[];
  description?: string;
  pageCount?: number;
  publishedDate?: string;
  thumbnail?: string;
}