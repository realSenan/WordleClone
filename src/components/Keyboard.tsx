// Inside Keyboard.tsx

import React, { useEffect, useRef } from "react";
import { keyboard } from "../data/words";

type Props = {
  onClick: (letter: string) => void;
  words: Array<Array<string>>;
  word: string;
  className: Array<Array<number>>;
};

const Keyboard: React.FC<Props> = ({ onClick, words, word, className }) => {
  const handleClick = (letter: string) => {
    onClick(letter);
  };
  const container = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const buttons = container.current?.querySelectorAll("button");

    const classTwoIndices: number[][] = [];
    const classOneIndices: number[][] = [];

    className.forEach((row, rowIndex) => {
      row.forEach((num, columnIndex) => {
        if (num === 2) {
          classTwoIndices.push([rowIndex, columnIndex]);
        } else if (num === 1) {
          classOneIndices.push([rowIndex, columnIndex]);
        }
      });
    });
    buttons?.forEach((button) => {
      const buttonLetter: string | null = button.textContent;

      if (buttonLetter != null) {
        classTwoIndices.forEach(([rowIndex, columnIndex]) => {
          if (
            words &&
            words[rowIndex] &&
            words[rowIndex][columnIndex] === buttonLetter
          ) {
            button.classList.add("!bg-orange-300");
            button.classList.add("animateScale");
            console.log(button);
          }
        });

        classOneIndices.forEach(([rowIndex, columnIndex]) => {
          if (
            words &&
            words[rowIndex] &&
            words[rowIndex][columnIndex] === buttonLetter
          ) {
            button.classList.add("!bg-green-400");
            button.classList.remove("!bg-orange-300");
            button.classList.add("animateScale");
          }
        });

        if (
          words?.some((lett) => lett.includes(buttonLetter)) ||
          word.includes(buttonLetter)
        ) {
          button.classList.add("bg-neutral-800");
          button.classList.add("screenKeyboard");
        } else {
          button.classList.remove("bg-neutral-800");
          button.classList.remove("screenKeyboard");
        }
      }
    });
  }, [className, container, word, words]);

  return (
    <div ref={container}>
      {keyboard.map((letters, i) => (
        <div key={i} className="flex gap-3  mb-3 items-center justify-center">
          {letters.map((letter, k) => (
            <button
              key={k}
              onClick={() => handleClick(letter)}
              className="p-4 min-w-11 uppercase border rounded-md duration-300 active:bg-[#afafaf] lg:hover:bg-[#afafaf] active:scale-75 "
            >
              {letter}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
