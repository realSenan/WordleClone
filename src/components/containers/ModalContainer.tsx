import React, { ReactNode } from 'react'

interface ModalProps {
  children: ReactNode
}

const ModalContainer: React.FC<ModalProps> = ({ children }) => {
  return (
    <div className="fixed z-10 flex h-screen w-full items-center justify-center bg-black/50 p-4">
      <div className="modalFade max-w-[500px] rounded-lg bg-[#1a1a1a]  p-10 py-5 shadow-xl duration-200">
        {children}
      </div>
    </div>
  )
}

export default ModalContainer
