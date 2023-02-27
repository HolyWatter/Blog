interface Props {
  children: string
  onClick: () => void
}

export const BlueBtnWhite = ({ children, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="h-full rounded-md bg-origin px-5 py-1 text-white"
    >
      {children}
    </button>
  )
}
