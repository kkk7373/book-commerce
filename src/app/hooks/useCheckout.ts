import { useRouter } from "next/navigation";
import { BookType, User } from "@/types/types";

export const useCheckout = () => {
  const router = useRouter();
  const startCheckout = async ({
    book,
    user,
  }: {
    book: BookType;
    user: User;
  }) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/checkout_sessions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: book.title,
            price: book.price,
            bookId: book.id,
            userId: user.id!,
          }),
        }
      );
      const responseData = await res.json();
      if (responseData) {
        router.push(responseData.checkoutURL);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return { createCheckoutSession: startCheckout };
};
