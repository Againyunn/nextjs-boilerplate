'use client';

import React from 'react';
import ReactDOM from 'react-dom';

// const ModalPortal = ({
//   children,
// }: {
//   children: React.ReactNode;
// }): React.ReactPortal | null => {
//   const el = document.getElementById('modal') || null;
//   if (el) return ReactDOM.createPortal(children, el);
//   else return null;
// };

const ModalPortal = ({ children }: { children: React.ReactNode }) => {
  return ReactDOM.createPortal(children, window.document?.body);
};

export default ModalPortal;
