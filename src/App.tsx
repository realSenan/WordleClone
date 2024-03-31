import { useCallback, useEffect, useState } from "react";
import PageContainer from "./components/containers/PageContainer";
import WordleBox from "./components/WordleBox";
import Celebrate from "./components/modals/Celebrate";
import Lose from "./components/modals/Lose";

function App() {
  const word: string = "senan";
  const [userWord, setUserWord] = useState<Array<string>>([]);
  const [allWord, setAllWord] = useState<Array<Array<string>>>([]);
  const [className, setClassName] = useState<Array<Array<number>>>([]);
  const [gameStatus, setGameStatus] = useState({
    win: false,
    lose: false,
  });

  const classHandler = useCallback(() => {
    const result: number[] = [];
    const wordCharCounts: { [key: string]: number } = {};

    for (const char of word) {
      if (wordCharCounts[char]) {
        wordCharCounts[char]++;
      } else {
        wordCharCounts[char] = 1;
      }
    }

    for (let i = 0; i < userWord.length; i++) {
      const userChar = userWord[i];
      const wordChar = word[i];

      if (userChar === wordChar && wordCharCounts[userChar] > 0) {
        result.push(1);
        wordCharCounts[userChar]--;
      } else if (word.includes(userChar) && wordCharCounts[userChar] > 0) {
        result.push(2);
        wordCharCounts[userChar]--;
      } else {
        result.push(0);
      }
    }

    setClassName((prev) => [...prev, result]);
  }, [userWord, word]);

  const keyDownHandler = useCallback(
    (e: KeyboardEvent) => {
      const isCleanWord = e.key.length === 1 && /^[a-zA-Z]+$/.test(e.key);

      if (e.key == "Enter" || e.key == " ") {
        if (userWord.length == 5) {
          setTimeout(() => {
            if (userWord.join("") == word) {
              setGameStatus((prev) => ({ ...prev, win: true }));
            }

            if (allWord.length == 5) {
              setGameStatus((prev) => ({ ...prev, lose: true }));
            }
          }, 200);

          classHandler();
          setAllWord((prev) => [...prev, userWord]);
          setUserWord([]);
        }
      } else if (e.key == "Backspace") {
        setUserWord((prev) =>
          prev.filter((word, i) => i != userWord.length - 1)
        );
      } else if (isCleanWord && userWord.length < 5) {
        setUserWord((prev) => [...prev, e.key.toLowerCase()]);
      }
    },
    [allWord.length, classHandler, userWord]
  );

  useEffect(() => {
    !gameStatus.lose &&
      !gameStatus.win &&
      window.addEventListener("keydown", keyDownHandler);
    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, [gameStatus.lose, gameStatus.win, keyDownHandler]);

  const filterWord = useCallback(
    (i: number) => {
      if (allWord.length == i) {
        return userWord;
      }
      if (allWord.length > i) {
        return allWord[i];
      }

      return [];
    },
    [allWord, userWord]
  );

  const resetHandler = () => {
    setGameStatus({
      win: false,
      lose: false,
    });
    setAllWord([]);
    setUserWord([]);
    setClassName([]);
  };

  return (
    <PageContainer>
      <div className="flex flex-col items-center gap-[10vh]">
        <header className="border-b-2 w-full p-2 border-neutral-700  text-center">
          <h1 className="text-5xl font-bold text-[#cecccc]">WORDLE</h1>
        </header>

        <div className="">
          <h1 className="text-center  text-2xl mb-4 font-bold uppercase">
            {word}
          </h1>

          {Array.from({ length: 6 }).map((_, i) => (
            <WordleBox
              key={i}
              word={filterWord(i)}
              className={className}
              index={i}
            />
          ))}
        </div>
      </div>
      {gameStatus.win ? (
        <Celebrate onSubmit={resetHandler} />
      ) : gameStatus.lose ? (
        <Lose onSubmit={resetHandler} word={word} />
      ) : null}
    </PageContainer>
  );
}

export default App;
