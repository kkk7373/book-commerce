import { useState } from "react";

export const useModal = (onOpen?: () => boolean) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    if (onOpen && !onOpen()) return;
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  return { isOpen, open, close };
};
