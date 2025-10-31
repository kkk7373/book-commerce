import { createClient } from "microcms-js-sdk";
import { BookType } from "@/types/types";
export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_SERVICE_DOMAIN!,
  apiKey: process.env.NEXT_PUBLIC_API_KEY!,
});

export const getAllBooks = async () => {
  const allBooks = await client.getList<BookType[]>({
    endpoint: "book-commerce",
    customRequestInit: {
      next: {
        revalidate: 3600, // 1時間ごとに再検証
      },
    },
  });

  return allBooks;
};

export const getDetailedBook = async (contentId: string) => {
  const detailBook = await client.getListDetail<BookType>({
    endpoint: "book-commerce",
    contentId: contentId,
    customRequestInit: {
      cache: "no-cache",
    },
  });
  return detailBook;
};
