import { useEffect } from "react";

export const useKeyEscClose = (onCloseObj: () => void) => {
  useEffect(() => {
    const escKeyModalClose = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCloseObj();
      }
    };
    window.addEventListener("keydown", escKeyModalClose);
    return () => window.removeEventListener("keydown", escKeyModalClose);
  }, []);
};
