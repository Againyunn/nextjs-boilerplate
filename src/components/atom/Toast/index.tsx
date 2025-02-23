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
          "z-50 display-none w-600px max-w-full mt-30px mb-30px mx-auto mb-0.5rem rounded-md":
            !open,
        },
        {
          "z-50 display-block animate-comeFromRight rounded-md": open,
        },

        {
          "bg-green-500": type === "success",
          "bg-yellow-500": type === "warning",
          "bg-red-500": type === "error",
          "bg-gray-500": type === "normal",
        }
      )}
    >
      <div className="flex justify-center items-center h-45px px-1 py-1 fw-700 text-14px  text-white rounded-md">
        <div className="w-80">{children || message}</div>
        {onClose && <XButton classes="w-10" onClick={onClose} />}
      </div>
    </div>
  );
};

export default Toast;
