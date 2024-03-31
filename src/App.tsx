import { useCallback, useEffect, useState } from "react";
import PageContainer from "./components/containers/PageContainer";
import WordleBox from "./components/WordleBox";
import Celebrate from "./components/modals/Celebrate";
import Lose from "./components/modals/Lose";
import { words } from "./data/words";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [wordIndex, setWordIndex] = useState<number>(
    Math.floor(Math.random() * words.length)
  );
  const word: string = words[wordIndex];
  const [userWord, setUserWord] = useState<Array<string>>([]);
  const [allWord, setAllWord] = useState<Array<Array<string>>>([]);
  const [className, setClassName] = useState<Array<Array<number>>>([]);
  const [gameStatus, setGameStatus] = useState({
    win: false,
    lose: false,
  });

  const checkWordInList = useCallback(() => {
    return words.find((item) => item == userWord.join(""));
  }, [userWord]);

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
          if (checkWordInList() == undefined) {
            shakeScreen(e, "Not in word list! try another word");
          } else {
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
        } else {
          shakeScreen(e, "Not enough letters!");
        }
      } else if (e.key == "Backspace") {
        setUserWord((prev) =>
          prev.filter((word, i) => i != userWord.length - 1)
        );
      } else if (isCleanWord && userWord.length < 5) {
        setUserWord((prev) => [...prev, e.key.toLowerCase()]);
      }
    },
    [allWord.length, checkWordInList, classHandler, userWord, word]
  );

  const shakeScreen = (e: KeyboardEvent, errorText: string) => {
    const targetElement = e.target as HTMLElement;
    targetElement.classList.add("shakeScreen");

    toast.error(errorText, {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });

    setTimeout(() => {
      targetElement.classList.remove("shakeScreen");
    }, 200);
  };

  useEffect(() => {
    !gameStatus.lose &&
      !gameStatus.win &&
      window.addEventListener("keydown", keyDownHandler);
    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, [gameStatus.lose, gameStatus.win, keyDownHandler]);

  useEffect(() => {
    console.log(`if you didn't know word then you can see word :)) ${word}`)
  }, [word])
  
  
  const writeWordCol = useCallback(
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

  const changeTargetWord = () => {
    setWordIndex(Math.floor(Math.random() * words.length));
  };

  const resetHandler = () => {
    setGameStatus({
      win: false,
      lose: false,
    });
    setAllWord([]);
    setUserWord([]);
    setClassName([]);
    changeTargetWord();
  };

  
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <PageContainer>
        <div className="flex flex-col items-center gap-[10vh]">
          <header className="border-b  w-full p-2 border-neutral-700  text-center">
            <h1 className="text-4xl tracking-widest font-semibold text-[#d7dadc]">WORDLE</h1>
          </header>

          <div>
            {Array.from({ length: 6 }).map((_, i) => (
              <WordleBox
                key={i}
                index={i}
                word={writeWordCol(i)}
                className={className}
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
    </>
  );
}

export default App;
