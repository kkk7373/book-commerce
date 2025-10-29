type BookType = {
  id: string;
  title: string;
  thumbnail: {
    url: string;
  };
  price: number;
  createdAt: string;
  updatedAt: string;
  content: string;
};
type User = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};
type Purchase = {
  id: string;
  userId: string;
  bookId: string;
  createdAt: string;
  user: User;
};
export type { BookType, User, Purchase };
