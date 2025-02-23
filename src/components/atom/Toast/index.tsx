// import "./index.scss";

import React from "react";
import XButton from "../Xbutton";
import clsx from "clsx";

export interface ToastProps {
  type?: "success" | "warning" | "error" | "normal";
  message: string;
  open: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

const Toast: React.FC<ToastProps> = ({
  open,
  onClose,
  type = "success",
  message,
  children,
}) => {
  return (
    <div
      className={clsx(
        {
          "z-50 display-none w-600px max-w-full mt-30px mb-30px mx-auto mb-0.5rem rounded-5px":
            !open,
        },
        {
          "z-50 display-block animate-comeFromRight": open,
        },

        {
          "bg-blue-500": type === "success",
          "bg-yellow-500": type === "warning",
          "bg-red-500": type === "error",
          "bg-gray-500": type === "normal",
        }
      )}
    >
      <div className="flex-row items-center h-45px pl-12px pr-12px fw-700 text-14px  text-white">
        <p className="pl-8px pr-8px">{children || message}</p>
        {onClose && <XButton onClick={onClose} />}
      </div>
    </div>
  );
};

export default Toast;
