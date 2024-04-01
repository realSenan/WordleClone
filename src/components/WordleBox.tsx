import React from 'react'

interface Wordle {
  word: Array<string | null>
  index: number
  className?: Array<Array<number>>
}

const WordleBox: React.FC<Wordle> = ({ word, className, index }) => {
  return (
    <div className="mb-2 flex cursor-default gap-2">
      {Array.from({ length: 5 }).map((_, i) => {
        return (
          <div
            key={i}
            className={`grid h-14 w-14 place-content-center rounded-sm bg-[#242424] text-3xl font-bold uppercase duration-200 hover:bg-opacity-30 max-xs:h-12 max-xs:text-xl md:h-16  md:min-w-[70px] ${
              word[i] && 'animateScale border border-[#111010] bg-opacity-60'
            } ${
              className && className[index] && className[index][i] === 1
                ? '!bg-green-400'
                : className && className[index] && className[index][i] === 2
                  ? '!bg-orange-300'
                  : className && className[index] && className[index][i] === 0 && '!bg-neutral-900'
            }`}
          >
            <span> {word[i]}</span>
          </div>
        )
      })}
    </div>
  )
}

export default WordleBox
