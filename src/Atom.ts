import { atom } from 'recoil'

export const loginModal = atom({
  key: 'loginModal',
  default: false,
})

export const signupModal = atom({
  key: 'signupModal',
  default: false,
})
