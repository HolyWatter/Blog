interface Props {
  children: string
  onClick: () => void
}

export const WhiteBtnOrigin = ({ children, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="rounded-md border bg-white py-2 px-3 text-origin"
    >
      {children}
    </button>
  )
}
