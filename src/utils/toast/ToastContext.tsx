"use client";

import React, {
  JSX,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

import Toast from "components/atom/Toast";
import dynamic from "next/dynamic";

// import ModalPortal from 'utils/modal/ModalPortal';

/** https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr */
const ModalPortal = dynamic(() => import("utils/modal/ModalPortal"), {
  ssr: false,
});

export interface ToastContextResult {
  toastMsg: (
    /**`import { v4 as uuidv4 } from 'uuid';`를 이용하여서 사용시 마다 uuid를 생성하여서 넣어준다 */
    uid: string,

    /**toast로 보여줄 내용 */
    message: string,

    /**`type`에 따라서 색상이 달라진다 */
    type: "success" | "warning" | "error" | "normal"
  ) => void;
}

export interface ToastProps {
  index?: number;
  uid: string;
  message: string;
  type: "success" | "warning" | "error" | "normal";
}

const ToastContext = createContext<ToastContextResult>({
  toastMsg: (
    uid: string,
    message: string,
    type: "success" | "warning" | "error" | "normal"
  ) => {
    console.log(uid, message, type);
  },
});

const ToastProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);
  const [toastId, setToastId] = useState<string>("");

  const unSetToast = useCallback(
    (uid?: string) => {
      setToasts(toasts.filter((toast) => toast.uid !== uid));
    },
    // toastId는 불필요한 deps로 판단되지만 기존 코드에 대해 변경이 아닌 린트 무시 처리로 결정
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [toastId, toasts]
  );

  const toastMsg = useCallback(
    (
      uid: string,
      message: string,
      type: "success" | "warning" | "error" | "normal"
    ) => {
      setToasts((toasts) => [
        ...toasts,
        {
          uid: uid,
          type: type || "success",
          message: message,
        },
      ]);
      setToastId(uid);
    },
    []
  );

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(
        () => setToasts((toasts) => toasts.slice(1)),
        2000000
      );

      if (toasts.length >= 6) {
        setToasts(toasts.filter((toast, index) => index !== 0));
      }
      return () => clearTimeout(timer);
    } else {
      setToastId("1");
    }
  }, [toasts]);

  // const { type, open, message } = state;

  return (
    <ToastContext.Provider value={{ toastMsg }}>
      {children}

      <ModalPortal>
        <div
          className="z-50"
          style={{ position: "fixed", top: "10%", left: "15%", right: "15%" }}
        >
          {toasts.map((toast, tIdx) => {
            return (
              <Toast
                type={toast.type}
                key={`toast-${tIdx}`}
                message={toast.message}
                onClose={() => unSetToast(toast.uid)}
                open={true}
              >
                {toast.message}
              </Toast>
            );
          })}
        </div>
      </ModalPortal>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextResult => {
  const context = React.useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
};

export default ToastProvider;
