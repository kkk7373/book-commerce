import Image from "next/image";
import Book from "./components/Book";
import { get } from "http";
import { getAllBooks } from "./lib/microCMS/client";
import { BookType } from "@/types/types";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "./lib/next-auth/option";
import { User, Purchase } from "@/types/types";
export default async function Home() {
  const { contents } = await getAllBooks();
  const books = contents as unknown as BookType[];
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user as User;
  let purchasedBookIds: string[];
  if (user) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/purchases/${user.id}/`
    );
    const purchasedBooks = await response.json();
    purchasedBookIds = purchasedBooks.map((purchaseBook: Purchase) => {
      return purchaseBook.bookId;
    });
    console.log(purchasedBookIds, "purchased book ids here");
  }
  return (
    <div>
      <main className="flex flex-wrap justify-center items-center md:mt-20 mt-20">
        <h2 className="text-center w-full font-bold text-3xl mb-2">
          Book Commerce
        </h2>
        {books.map((book: BookType) => (
          <Book
            key={book.id}
            book={book}
            isPurchased={purchasedBookIds?.includes(book.id)}
          />
        ))}
      </main>
    </div>
  );
}
