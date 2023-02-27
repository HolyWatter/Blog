interface Props {
  children: JSX.Element
}

export const ModalInside = ({ children }: Props) => {
  return (
    <div className="absolute top-1/2 left-1/2 w-[400px] translate-x-[-50%] translate-y-[-50%] rounded-md border bg-white text-center sm-m:max-w-[330px]">
      {children}
    </div>
  )
}
