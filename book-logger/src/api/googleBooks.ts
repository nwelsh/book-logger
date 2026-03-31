import axios from 'axios';

const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

import { Book } from '../types/books';

export const searchBooks = async (query: string): Promise<Book[]> => {
  const response = await axios.get(BASE_URL, {
    params: { q: query, maxResults: 20 },
  });

  return response.data.items.map((item: any) => ({
    id: item.id,
    title: item.volumeInfo.title,
    authors: item.volumeInfo.authors || [],
    description: item.volumeInfo.description,
    pageCount: item.volumeInfo.pageCount,
    publishedDate: item.volumeInfo.publishedDate,
    thumbnail: item.volumeInfo.imageLinks?.thumbnail,
  }));
};