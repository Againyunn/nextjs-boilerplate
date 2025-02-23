import "./index.scss";

import React from "react";
import XButton from "../Xbutton";
import classNames from "classnames";

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
      className={classNames(
        "toast toast-root",
        {
          on: open,
        },
        `toast_type-${type}`
      )}
    >
      <div className="toast-inner">
        <p>{children || message}</p>
        {onClose && <XButton onClick={onClose} />}
      </div>
    </div>
  );
};

export default Toast;
