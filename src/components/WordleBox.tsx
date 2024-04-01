import React from "react";

interface Wordle {
  word: Array<string | null>;
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
            className={`hover:bg-opacity-30 rounded-sm duration-200 grid place-content-center min-w-[70px] h-16 text-3xl font-bold uppercase  bg-[#242424] ${
              word[i] && "bg-opacity-60 animateScale border border-[#111010]"
            } ${
              className && className[index] && className[index][i] === 1
                ? "!bg-green-400"
                : className && className[index] && className[index][i] === 2
                ? "!bg-orange-300"
                : className &&
                  className[index] &&
                  className[index][i] === 0 &&
                  "!bg-neutral-900"
            }`}
          >
            <span> {word[i]}</span>
          </div>
        );
      })}
    </div>
  );
};

export default WordleBox;
