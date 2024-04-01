import React, { useEffect, useRef } from 'react'
import { keyboard } from '../data/words'

type Props = {
  onClick: (letter: string) => void
  words: Array<Array<string>>
  word: string
  className: Array<Array<number>>
}

const Keyboard: React.FC<Props> = ({ onClick, words, word, className }) => {
  const handleClick = (letter: string) => {
    onClick(letter)
  }
  const container = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    const buttons = container.current?.querySelectorAll('button')

    const classTwoIndices: number[][] = []
    const classOneIndices: number[][] = []

    className.forEach((row, rowIndex) => {
      row.forEach((num, columnIndex) => {
        if (num === 2) {
          classTwoIndices.push([rowIndex, columnIndex])
        } else if (num === 1) {
          classOneIndices.push([rowIndex, columnIndex])
        }
      })
    })
    buttons?.forEach((button) => {
      const buttonLetter: string | null = button.textContent

      if (buttonLetter != null) {
        classTwoIndices.forEach(([rowIndex, columnIndex]) => {
          if (words && words[rowIndex] && words[rowIndex][columnIndex] === buttonLetter) {
            button.classList.add('!bg-orange-300')
            button.classList.add('animateScale')
          }
        })

        classOneIndices.forEach(([rowIndex, columnIndex]) => {
          if (words && words[rowIndex] && words[rowIndex][columnIndex] === buttonLetter) {
            button.classList.add('!bg-green-400')
            button.classList.remove('!bg-orange-300')
            button.classList.add('animateScale')
          }
        })

        if (words?.some((lett) => lett.includes(buttonLetter)) || word.includes(buttonLetter)) {
          button.classList.add('bg-neutral-800')
          button.classList.add('screenKeyboard')
        } else {
          button.classList.remove('bg-neutral-800')
          button.classList.remove('screenKeyboard')
          button.classList.remove('!bg-orange-300')
          button.classList.remove('!bg-green-400')
        }
      }
    })
  }, [className, container, word, words])

  return (
    <div ref={container}>
      {keyboard.map((letters, i) => (
        <div key={i} className="mb-3 flex items-center justify-center gap-1 rounded-md md:gap-3">
          {letters.map((letter, k) => (
            <button key={k} onClick={() => handleClick(letter)}>
              <div className="h-full scale-100 rounded-md border p-[2.4vw] uppercase duration-300 active:scale-75 active:bg-[#afafaf] max-xx:p-1 max-xx:px-2 xs:p-3 md:min-w-11 md:p-4 lg:hover:bg-[#afafaf]">
                {letter}
              </div>
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Keyboard
