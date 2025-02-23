"use client";

import React from "react";
import ReactDOM from "react-dom";

const ModalPortal = ({ children }: { children: React.ReactNode }) => {
  return ReactDOM.createPortal(children, window.document?.body);
};

export default ModalPortal;
