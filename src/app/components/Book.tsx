"use client";
import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BookType, User } from "@/types/types";
type Props = {
  book: BookType;
  isPurchased: boolean;
};

const Book = ({ book, isPurchased }: Props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user as User;
  const [showModal, setShowModal] = useState(false);
  const handleCancel = () => {
    setShowModal(false);
  };
  const handleShowModal = () => {
    if (isPurchased) {
      alert("この本は既に購入済みです。");
    } else {
      setShowModal(true);
    }
  };
  const startCheckout = async () => {
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
  const purchaseConfirm = () => {
    if (!user) {
      // ログインしていない場合の処理
      router.push("/api/auth/signin");
    } else {
      // 購入処理をここに追加
      startCheckout();
    }
  };
  return (
    <>
      {/* アニメーションスタイル */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .modal {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>

      <div className="flex flex-col items-center m-4">
        <a
          onClick={handleShowModal}
          className="cursor-pointer shadow-2xl duration-300 hover:translate-y-1 hover:shadow-none"
        >
          <Image
            priority
            src={book.thumbnail.url}
            alt={book.title}
            width={450}
            height={350}
            className="rounded-t-md"
          />
          <div className="px-4 py-4 bg-slate-100 rounded-b-md">
            <h2 className="text-lg font-semibold">{book.title}</h2>
            {/* <p className="mt-2 text-lg text-slate-600">この本は○○...</p> */}
            <p className="mt-2 text-md text-slate-700">値段：{book.price}円</p>
          </div>
        </a>

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm modal">
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-xl mb-4">本を購入しますか？</h3>
              <button
                onClick={purchaseConfirm}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
              >
                購入する
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                キャンセル
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Book;
