import { useEffect } from 'react'

interface Props {
  children: JSX.Element
}

export const ModalBg = ({ children }: Props) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])
  return (
    <div className="fixed top-0 right-0 z-20 h-screen w-full bg-black/70">
      {children}
    </div>
  )
}
