const Header = () => {
  return (
    <header className="w-full  border-b border-neutral-700 p-2  ">
      <h1 className="flex text-xl font-semibold tracking-widest text-[#d7dadc] md:text-4xl">
        <a target="_blank" href="https://github.com/realSenan" className="inline-block flex-1">
          <span className="!-rotate-6">S</span>
          <span className="text-green-300">A</span>
          <span className="rotate-12">N</span>
          <span className="text-stone-600">A</span>
          <span className="!-rotate-45 text-neutral-600">N</span>
        </a>
        <span className="-rotate-6">W</span>
        <span className="text-green-300 ">O</span>
        <span>R</span>
        <span className="text-green-300 ">D</span>
        <span>L</span>
        <span className="text-green-300 ">E</span>
        <span className="text-orange-300 "> </span>
        <span className="-rotate-45">G</span>
        <span>A</span>
        <span className="text-green-300 ">M</span>
        <span className="rotate-45 text-orange-300">E</span>
      </h1>
    </header>
  )
}

export default Header
