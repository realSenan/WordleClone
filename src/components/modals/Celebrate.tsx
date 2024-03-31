import React from "react";
import ModalContainer from "../containers/ModalContainer";

type Props = {
  onSubmit: () => void;
};

const Celebrate: React.FC<Props> = ({ onSubmit }) => {
  const handleRestart = () => {
    onSubmit();
  };

  return (
    <ModalContainer>
      <div className="p-10 py-5  w-[500px] shadow-xl bg-[#1a1a1a] rounded-lg">
        <p className="text-center">Congratulations! 🎉 You've completed the Wordle game!</p>
        <button
          onClick={handleRestart}
          className="mt-4 px-4 w-full py-2 rounded-md bg-green-500 text-white hover:bg-[#2f9282] transition duration-300"
        >
          Restart
        </button>
      </div>
    </ModalContainer>
  );
};

export default Celebrate;
