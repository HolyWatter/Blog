interface Props {
  children: string
  onClick: () => void
}

export const GrayBtnWhite = ({ children, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="rounded-md bg-gray-500 px-5 py-1 text-white"
    >
      {children}
    </button>
  )
}
