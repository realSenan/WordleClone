import React from "react";

interface Wordle {
  word: Array<string>;
  index: number;
  className?: Array<Array<number>>;
}

const WordleBox: React.FC<Wordle> = ({ word, className, index }) => {
  return (
    <div className="flex gap-2 mb-2 cursor-default">
      {Array.from({ length: 5 }).map((_, i) => {
        return (
          <div
            key={i}
            className={`hover:bg-opacity-30  duration-200 grid place-content-center min-w-[70px] h-16 text-3xl font-bold uppercase  bg-[#3a3a3c] ${
              word[i] && "bg-opacity-60 animateScale"
            } ${
              className && className[index] && className[index][i] === 1
                ? "bg-green-400"
                : className && className[index] && className[index][i] === 2
                ? "bg-orange-300"
                : className &&
                  className[index] &&
                  className[index][i] === 0 &&
                  "bg-neutral-800"
            }`}
          >
            {word[i]}
          </div>
        );
      })}
    </div>
  );
};

export default WordleBox;
