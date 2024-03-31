import React, { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
}

const ModalContainer: React.FC<ModalProps> = ({ children }) => {
  return (
    <div className="fixed w-full h-screen bg-black/50 z-10 items-center justify-center flex p-4">
      <div className="modalFade duration-300">{children}</div>
    </div>
  );
};

export default ModalContainer;
