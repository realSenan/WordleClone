import React from 'react'
import ModalContainer from '../containers/ModalContainer'

type Props = {
  onSubmit: () => void
  word: string
}

const Lose: React.FC<Props> = ({ onSubmit, word }) => {
  const handleRestart = () => {
    onSubmit()
  }

  return (
    <ModalContainer>
      <p className="text-center">
        Oh no! 😢 You've lost the Wordle game! <br /> Word is{' '}
        <span className="font-bold text-red-500">{word.toUpperCase()}</span>
      </p>
      <button
        onClick={handleRestart}
        className="mt-4 w-full rounded-md bg-green-500 px-4 py-2 text-white transition duration-300 hover:bg-[#2f9282]"
      >
        Restart
      </button>
    </ModalContainer>
  )
}

export default Lose
