export const pressTab = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  if (e.nativeEvent.isComposing) {
    return
  }
  if (e.key === 'Tab') {
    e.preventDefault()
    const start: number | null = e.currentTarget.selectionStart
    const end: number | null = e.currentTarget.selectionEnd
    const value = e.currentTarget.value
    e.currentTarget.value =
      value.substring(0, start!) + '\t' + value.substring(end!)
    e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start! + 1
    return false
  }
}
export const pressEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  if (e.nativeEvent.isComposing) {
    return
  }
  if (e.key === 'Enter') {
    e.preventDefault()
    const start: number | null = e.currentTarget.selectionStart
    const end: number | null = e.currentTarget.selectionEnd
    const value = e.currentTarget.value
    e.currentTarget.value =
      value.substring(0, start!) + '\n' + value.substring(end!)
    e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start! + 1
    return false
  }
}
