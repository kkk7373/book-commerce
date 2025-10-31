import { useModal } from "@/app/hooks/useMordal";
import { BookType, User } from "@/types/types";
import { useCheckout } from "@/app/hooks/useCheckout";
import { useRouter } from "next/navigation";

export const useBookPurchase = ({
  book,
  user,
  isPurchased,
}: {
  book: BookType;
  user: User;
  isPurchased: boolean;
}) => {
  const router = useRouter();

  const modal = useModal(() => {
    if (isPurchased) {
      alert("この本は既に購入済みです。");
      return false; // モーダルを開かない
    }
    return true; // モーダルを開く
  });

  const { createCheckoutSession } = useCheckout();

  // 購入処理
  const handlePurchase = () => {
    if (!user) {
      // ログインしていない場合はログインページへ
      router.push("/api/auth/signin");
    } else {
      // Stripeチェックアウトを開始
      createCheckoutSession({ book, user });
    }
  };

  return {
    ...modal, // isOpen, open, close を展開
    handlePurchase, // 購入処理
  };
};
